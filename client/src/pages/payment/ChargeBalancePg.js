import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { PayPalButton } from 'react-paypal-button-v2'
import SpinnersBox from '../../components-common/SpinnersBox'
import { Button, InputGroup, Spinner } from 'react-bootstrap'
import InputGrup from '../../components-common/InputGrup'
import { chargeUserBalance_DB } from '../../redux/actions/payment.actions'
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from 'react-router-dom'
import PaypalGate from './PaypalGate'
import { axos } from '../../utils';




// ** Charge balance page
// * This component created according to: https://stripe.com/docs/checkout/integration-builder
const ChargeBalancePg = () => {

  const stripePromise = loadStripe( "pk_test_51IEbbnGzatCdT94fo7IL7HBi5ABAM3UTtWg1oSbCtCK6H8mCHDm8LJyTWPiFLlAqVXyfYBSMwfGCDN4YlAWQPEHa00ohjBfp0a" );

  // FOR TEST
  const product = {
    name: "Some package",
    description: "Hello description",
    price: 65.00
  }

  const paymentOptions = [
    { amount: 10, gift: null, color: 'tomato' },
    { amount: 25, gift: '2', color: 'green' },
    { amount: 50, gift: '5', color: 'orange' },
    { amount: 100, gift: '10', color: 'blue' },
  ]

  const location = useLocation()
  // Paypal SDK is Ready
  const [ sdkReady, setsdkReady ] = useState( false )
  const [ showSpinner, setShowSpinner ] = useState( false )
  const [ chargeAmount, setChargeAmount ] = useState( '' )
  const [ showScndStep, setShowScndStep ] = useState( false )
  const [ showPaymentSuccessBox, setShowPaymentSuccessBox ] = useState( false )
  const [ message, setMessage ] = useState( "" )    // Payment Success or fail message
  // const [ showPaypalGate, setShowPaypalGate ] = useState( false )
  const [ showPaywithcardBtn, setShowPaywithcardBtn ] = useState( false )  // when some packaged gets clicked (for stripe)
  // After successful stripe payment redirect
  // NOTE: location.search() Return the querystring part of a URL (whaterver comes after ? in url) 
  // console.log( location.search )   // ?session_id=cs_test_a1r...
  const sessionId = location.search.replace( '?session_id=', '' )   // Getting the querystring from the url & removing first few characters 
  const [ session, setSession ] = useState( {} )
  console.log( session )


  // Handle Strupe SUccesss 
  useEffect( () => {
    // Get session from server after payment success - if url ?session_id changes
    const fetchSession = async () => {
      // const session = await fetch( '/checkout-session?sessionId=' + sessionId ).then( ( res ) => res.json() ) 
      // const { data } = await axios.get( process.env.REACT_APP_API + `/api/payment/checkout-session?sessionId=${ sessionId }` )
      const { data } = await axos.get( `/api/payment/checkout-session?sessionId=${ sessionId }` )
      console.log( data )
      // setSession( data )
      chargeUserBalance_DB( sessionId, 'stripe' )
    }

    if ( sessionId )
      fetchSession()
  }, [ sessionId ] )


  useEffect( () => {
    // console.log( 'charge amount changed!' )   // Good
    if ( chargeAmount ) {
      setShowScndStep( true )
      setShowPaywithcardBtn( true )
      // setShowSpinner( true )
      // setTimeout( () => setShowPaypalGate( true ), 900 )
    }
  }, [ chargeAmount ] )


  // *** Stripe ***
  const handleStripeBtnClick = async () => {

    const stripe = await stripePromise;

    let product = { price: chargeAmount, name: 'Some Package' }  // Send along product to server as req.bldy

    // First Get created stripe checkout sesion from the server
    const { data } = await axos.post( process.env.REACT_APP_API + '/api/payment/create-checkout-session', { product } )
    console.log( data )

    const sessionId = data.session.id

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout( {
      sessionId
    } )

    // Send along product with req body

    // * If Payment Successfull, Stripe will redirect to : http://localhost:3000/checkout?session_id={CHECKOUT_SESSION_ID}`,
    // Which means location.search will be changed automatically (will include ?session_id)

    // let success = await chargeUserBalance_DB( chargeAmount, result )


    if ( result.error ) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    } else {

    }
  }


  const GiftBadge = ( { gift, className } ) =>
    <span className={ "badg-pill-lg bg-w fs-16 " + className }> + ${ gift } Gift </span>



  // useEffect( () => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams( window.location.search );
  //   console.log( query )
  //   if ( query.get( "success" ) ) {
  //     setMessage( "Order placed! You will receive an email confirmation." );
  //   }
  //   if ( query.get( "canceled" ) ) {
  //     setMessage(
  //       "Order canceled -- continue to shop around and checkout when you're ready."
  //     );
  //   }
  // }, [] );



  //===============================================================================================
  return <div className="bg-none white">
    <div className="container">

      <div className="py-3 center curved-4">

        <div className="p-1 m-2 em-11 center">
          {/* Payment Success Box */ }
          <div className="p-2 ib">
            <div className="w-100px ib mx-2">
              <InputGrup value={ chargeAmount } onChange={ setChargeAmount } />
            </div>
            <span className="bold">اختر الباقة المناسبة</span>
          </div>
        </div>

        <div className="mx-auto w-400px bg-w c-222 px-3 curved-8 borderr-888">
          { paymentOptions.map( item =>
            <div key={ item.amount } className={ `row py-3 my-3 clickable-btn curved-8 bg-${ item.color } white` }
              onClick={ () => setChargeAmount( item.amount ) } >
              <div className="col" />
              <div className="col center em-18 fw-600"> ${ item.amount } </div>
              <div className="col pt-1">{ item.gift && <GiftBadge gift={ item.gift } className={ item.color } /> }</div>
            </div> ) }

          { showPaywithcardBtn && <div className="p-3 text-r" dir="rtl" style={ { color: "#2c3ada" } }>
            <span className='bold clickable ulineonhover' onClick={ handleStripeBtnClick }
            >  <i className="far fa-hand-point-left" /> { ' ' }
            ادفع باستخدام بطاقة <span className="boldd"> MasterCard / VISA </span> { ' ' }
              <i className="far fa-credit-card" />
            </span>
          </div> }
        </div>

      </div>

      { showPaymentSuccessBox &&
        <div className="bg-w p-3 green bold center">
          تم تعبئة الرصید بنجاح <i className="fas fa-check-circle" />
        </div> }


      { message && <p className="orange">{ message }</p> }

    </div>
  </div>
}

export default ChargeBalancePg
