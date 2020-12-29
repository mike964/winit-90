import store from '../store'
import axios from 'axios'
import moment from 'moment'
import { updateUserBalanceRedux } from './payment.actions';
import { axos } from '../../utils';
const { dispatch, getState } = store



export const addVipPrediction_DB = async ( prd ) => {
  console.log( 'addVipPrediction_DB()' )

  console.log( prd )

  let success = false   // FOR TEST


  // try { 

  const response = await axos.post( `/api/vip`, prd )
  console.log( response.data )

  if ( response.data.success ) {
    success = true

    // dispatch( {
    //   type: 'ADD_VIP_PREDICTION',
    //   // payload: prd
    //   payload: response.data.viPrediction
    // } )
    // if success, update user balance in frontend
    updateUserBalanceRedux( prd.stake )
    return success
  }

  // } catch ( error ) {
  // console.log( error )
  // }

  return success
}


// Add VIP Prediction to Redux Store
export const addVipPrediction = ( prd ) => {
  console.log( 'addVipPrediction()' )

  dispatch( {
    type: 'ADD_VIP_PREDICTION',
    // payload: response.data.viPrediction
    payload: prd
  } )
}




export const getMyVipredictions = async () => {

  const response = await axios.get( `/api/vip/me` )

  console.log( 'getMyVipredictions()' )
  console.log( response.data )

  dispatch( {
    type: 'SET_MY_VIP_PREDICTIONS',
    payload: response.data.data
  } )
}
//======================================================================================
////////////////////////
// *** FOR ADMIN *** //
////////////////////// 
export const getAllVipredictions = async () => {

  // const startDate = '2020-09-26'
  const startDate = moment().subtract( 25, 'days' )

  const response = await axios.get( `/api/vip?from=${ startDate }&populate=true` )

  console.log( 'getAllViPredictions()' )
  console.log( response.data )

  if ( response.data.success ) {
    dispatch( {
      type: 'SET_ALL_VIP_PREDICTIONS',
      payload: response.data.data
    } )
  }

}
