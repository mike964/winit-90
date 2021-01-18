import store from '../store'
import axios from 'axios'
import { setReqHeaders } from './auth.actions'
import { axos } from '../../utils'
const { dispatch, getState } = store


// Pay Winners by adming - Update to 10 users balances 
export const payWeeklyWinners = async ( weekId, rewards ) => {
  // {{URL}}/api/v1/ad/pay-weekly-winners/5f4b77b0d8ee3563f442ac1e
  // Get all weeks of this year and set them to Redux store

  const reqBody = { rewards }

  try {
    const response = await axos.post( `/api/ad/pay-weekly-winners/${ weekId }`, reqBody )
    console.log( response )  // Good 
    return true
  } catch ( error ) {
    return false
  }

  // dispatch( {
  //   type: 'SET_WEEKS',
  //   payload: response.data.weeks
  // } )
}

// Make Top Users - update week.topUsers by Admin
export const updateWeekTopUsers = async ( weekId ) => {
  // {{URL}}/api/v1/ad/make-top-users-of-week/5f4b77a4d8ee3563f442ac1d?updateWeek=true

  // ** NOT COMPLETED YET **  

  try {
    const response = await axos.get( `/api/ad/make-top-users-of-week/${ weekId }?updateWeek=true` )
    console.log( response )  // Good 
    return true
  } catch ( error ) {
    return false
  }

  // dispatch( {
  //   type: 'SET_WEEKS',
  //   payload: response.data.weeks
  // } )
}

// ad : means=> admin
// Action Only Admin Cand DO 
export const getAllUsers = async () => {  // x : boolean 

  setReqHeaders()   // SET TOKEN

  const response = await axos.get( `/api/users` )

  // console.log( response )

  return response.data.data   // usersArray
  // dispatch( {
  //   type: 'SET_MATCH_LOADING',
  //   payload: x
  // } )
}

