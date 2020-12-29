import React, { useEffect } from 'react'
import axios from 'axios'
// import { PayPalButton } from 'react-paypal-button-v2'
import { chargeUserBalance_DB } from '../../redux/actions/payment.actions'


// NOT IN USE YET
const PaypalGate = ( { chargeAmount } ) => {

  // PAYPAL
  const successfulPaymentHandler = async ( paymentResult ) => {
    console.log( paymentResult )
    // dispatch(payOrder(orderId, paymentResult))
    // SAVE PAYMENT DETAILS   (Tomorrow: work on this shit)
    let success = await chargeUserBalance_DB( chargeAmount, paymentResult )
    if ( success ) {
      // setShowPaymentSuccessBox( true )
      // Then Redirect to matches page
    }
  }

  // from Brad Ecommerce MERN
  // Dynamically Adding paypal script to DOM (index.html)
  const addPaypalScript = async () => {
    // Fetch PayPal Client ID from server (backend)
    // http://localhost:3500/api/config/paypal
    // const { data: clientId } = await axios.get( process.env.URL + '/api/config/paypal' )
    const { data: clientId } = await axios.get( process.env.REACT_APP_API + '/api/config/paypal' )
    // console.log( 'clientId: ' +  clientId )   // Good
    // CREATE THE SCRIPT
    const script = document.createElement( 'script' )
    script.src = `https://www.paypal.com/sdk/js?client-id=${ clientId }`
    script.async = true
    // Once SDK is ready
    // script.onload = () => { setTimeout( () => setsdkReady( true ), 600 ) }
    document.body.appendChild( script )
  }

  // Brad
  useEffect( () => {
    // Create n add paypal script to DOM
    addPaypalScript()
  }, [] )


  return <>
    {/* <PayPalButton amount={ chargeAmount } onSuccess={ successfulPaymentHandler } onError={ () => { } } /> */ }
    {/* PayPalButton amount={ 5.00 } onSuccess={ successPaymentHandler } /> */ }
    <div dir='rtl' className="text-r c-666 p-2">
      <span> لدفع باستخدام بطاقات  MasterCard / VisaCard اختر Debit or Credit Card </span>
    </div>
  </>
}

export default PaypalGate
