import store from '../store'
import { axos } from '../../utils'
const { dispatch } = store



// Update User Balance in Front-end 
export const updateUserBalanceRedux = ( x ) => {
  // If +x means add, If -x means subtract 

  dispatch( {
    type: 'UPDATE_USER_BALANCE',
    payload: parseInt( x )  // payment amount
  } )
}




// charge user.balance in DB
export const chargeUserBalance_DB = async ( paymentResponse ) => {
  // type : ['paypal', 'stripe']
  // First Save Payment to DB. Then update user balance in backend , then update user balance in frontend
  // Then Show success msg. Then Redirect to matches pg
  // Also Add security
  // PaymentResponse could be Paypal Or Stripe Response after successfull payment

  let req_body = { paymentResponse }

  try {
    const { data } = await axos.post( `/api/payment/charge-my-balance/stripe`, req_body )
    console.log( data )   // for test 

    // ** Update user balance in frontend => currentUser.balance - $1
    updateUserBalanceRedux( data.amount )  // amount should come from response

    return true   // In order to handle error in frontend  

  } catch ( error ) {
    // console.log( error )
    return false
  }

}