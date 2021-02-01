const ErrorResponse = require( '../utils/errorResponse' )
const Payment = require( '../models/Payment' )
const crud = require( '../utils/crudHandler' )
const asyncHandler = require( '../utils/asyncHandler' )
const { updateUserBalance } = require( './user.cont' )
const stripe = require( 'stripe' )( process.env.STRIPE_SECRET_KEY )
const getClientUrl = require( '../utils/get-client-url' )

//==========================================================
// @route     GET /api/ ...

// *** STRIPE *** // 
//=================================================================================
// * Create Stripe checkout session  
exports.createCheckoutSession = asyncHandler( async ( req, res, next ) => {
  console.log( '--- createCheckoutSession()---'.yellow )
  // 1) Get the currently booked tour
  // const tour = await Tour.findById(req.params.tourId);
  // console.log(tour);

  console.log( req.body )   // { chargeAmount: 10 }
  const { product } = req.body

  // const product = {
  //   name: 'Mike Tour',
  //   price: 20   // USD
  // }

  // const YOUR_DOMAIN = 'http://localhost:3000/checkout'
  // const clientURL = 'http://localhost:3000/charge-balance'
  const clientURL = getClientUrl()
  console.log( 'client URL: ' + clientURL )   // FOR TEST
  console.log( 'req.user: ' + req.user )   // FOR TEST

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create( {
    payment_method_types: [ 'card' ],
    // success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`, 
    // customer_email: req.user.email,
    // client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: [ 'https://i.imgur.com/EHyR2nP.png' ],
          },
          unit_amount: product.price * 100   // Convert cent to dollar
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    // success_url: `${ clientURL }?success=true`,
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${ clientURL }?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${ clientURL }?canceled=true`,
    customer_email: req.user.email   // works fine. user comes from protect() mdlwr
  } );

  // console.log( 'session_id before payment: ' )
  // console.log( session.id )   // Good

  // 3) Send the session as response back to the client
  res.status( 200 ).json( {
    success: true,
    session
    // id: session.id
  } )
  // * If success: It will add incomplete payment in: https://dashboard.stripe.com/test/payments
} );


exports.fetchCheckoutSession = asyncHandler( async ( req, res, next ) => {
  console.log( '--- fetch checkout session () ---'.yellow )
  const { sessionId } = req.query;
  console.log( sessionId )
  const session = await stripe.checkout.sessions.retrieve( sessionId )
  res.send( session )
} )

// FOR ADMIN
exports.getAllPayments = crud.getAll( Payment )

// exports.getTeam = crud.getOne( Team )

// exports.createPayment = crud.createOne( Payment )

// Charge Current Logged in Use Balance
exports.chargeMyBalance_paypal = asyncHandler( async ( req, res, next ) => {
  console.log( '--- charge my balance paypal() ---'.yellow )
  // If PayPal payment successful

  // console.log( req.user )

  const { amount, paymentResponse } = req.body

  const newPayment = {
    user: req.user._id,
    amount,          // @toFix: amount should come from paymentResponse not req.body
    paymentResponse  // Could be PayPal or Stripe Response
  }


  // let payment = await Payment.create( newPayment )
  let payment

  let user_balance_updated   // Check if user.balance updated successfully

  // IF PAYMENT OBJ CREATED SUCCESSFULL, UPDATE user.balance
  if ( payment ) {
    user_balance_updated = await updateUserBalance( req.user._id, amount )
  }

  if ( user_balance_updated )
    console.log( 'User balance updated successfully'.green )
  else
    // Return Error
    console.log( 'User balance not updated!'.red )

  res.status( 200 ).json( {
    success: true,
    payment
    // nResults: docs.length,
    // data: docs
  } )
} )


// Charge Current Logged in Use Balance
exports.chargeMyBalance_stripe = asyncHandler( async ( req, res, next ) => {
  console.log( '--- charge my balance stripe() ---'.yellow )
  // If PayPal payment successful

  // console.log( req.user )

  // *** TEMPORARY - later will use stripe webhooks
  //  First fetch the created chekcout session by stripe
  // Then make sure session.paid = true
  // Then update user.balance in DB 

  // console.log( req.body )
  // {
  //   paymentResponse: 'cs_test_a1rcH2E8kAm5H4tifAUB7YFl5iH2V5j7ljNrSejwFFnoTkplTGSygiZ5sX',
  //   type: 'stripe',
  //   user: 5f833aa6d7f95b4fd0ff9acf       
  // }

  // amount_total: 1000,
  // payment_status: 'paid',


  const sessionId = req.body.paymentResponse
  let amount_ = 0    // payment amount from stripe session

  const session = await stripe.checkout.sessions.retrieve( sessionId )
  // console.log( session )

  if ( session.payment_status === 'paid' ) {

    amount_ = session.amount_total / 100  // Convert cent to dollar
    console.log( 'amount_: ' + amount_ )

    const newPayment = {
      user: req.user._id,
      amount: amount_,
      type: 'stripe',
      sessionId: sessionId,
      paymentResponse: session  // Could be PayPal or Stripe Response 
    }


    let payment = await Payment.create( newPayment )

    let userBalanceUpdated   // Check if user.balance updated successfully 

    // IF PAYMENT OBJ CREATED SUCCESSFULL, UPDATE user.balance
    if ( payment ) {
      userBalanceUpdated = await updateUserBalance( req.user._id, payment.amount )

      if ( userBalanceUpdated )
        console.log( 'User balance updated successfully'.green )
      else console.log( 'User balance not updated!'.red )
    }

  } else {
    console.log( 'stripe session error!' )
  }


  res.status( 200 ).json( {
    success: true,
    amount: amount_
    // nResults: docs.length,
    // data: docs
  } )
} )

