const express = require( 'express' )
const { createCheckoutSession, fetchCheckoutSession } = require( '../controllers/payment.cont' )
const {
  chargeMyBalance_paypal, chargeMyBalance_stripe
} = require( '../controllers/payment.cont' )
const { protect } = require( '../middleware/auth.mdlwr' )

// app.use( '/api/payment' )
//====================================================================
const router = express.Router()


// router.use( protect )
// All routes below will use the two middlewares above
// * According to: https://stripe.com/docs/checkout/integration-builder

router
  .route( '/' )
  .get()

// router.route( '/charge-my-balance/paypal' ).post( protect, chargeMyBalance_paypal )
router.route( '/charge-my-balance/stripe' ).post( protect, chargeMyBalance_stripe )

// Create a checkout session (stripe)
router.post( '/create-checkout-session', protect, createCheckoutSession )
// Fetch the Checkout Session to display the JSON result on the success page
router.get( '/checkout-session', fetchCheckoutSession )

module.exports = router


// *** FROM STRIPE EXAMPLE ***
// const YOUR_DOMAIN = 'http://localhost:3000/checkout';

// app.post('/create-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'Stubborn Attachments',
//             images: ['https://i.imgur.com/EHyR2nP.png'],
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });
//   res.json({ id: session.id });
// });


