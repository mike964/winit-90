import store from '../store'
import axios from 'axios'
import { setReqHeaders } from './auth.actions'
import { axos } from '../../utils'
const { dispatch } = store

export const getAllWeeks = async () => {
  console.log( '--- getAllWeeks() ---' )

  // Get all weeks of this year and set them to Redux store

  const response = await axos.get( `/api/weeks?sort=start` )
  // console.log( response )  // Good

  dispatch( {
    type: 'SET_WEEKS',
    payload: response.data.weeks
  } )
}


// GET My Karnames From DB and set the to Redux Store
export const getMyKarnames_DB = async () => {
  console.log( '--- getMyKarnames_DB() ---' )

  setReqHeaders()

  const response = await axios.get( `/api/karnames/me` )


  console.log( response.data )

  dispatch( {
    type: 'SET_KARNAMES',
    payload: response.data.data
  } )
}


// export const setCurrentKarname = ( weekId ) => {
export const setSelectedKarname_forPrds = ( weekId ) => {
  // set selected karname
  dispatch( {
    type: 'SET_CURRENT_KARNAME',
    weekId
  } )
}

////////////////////
// *** Admin *** //
//////////////////                
// ===============================================================================================
// GET all Karnames of week from DB  
export const getKarnames = async ( weekId ) => {

  // {{URL}}/api/v1/matches?sort=date&year=2020
  const response = await axios.get( `/api/karnames?week=${ weekId }` )

  console.log( response )

  dispatch( {
    type: 'SET_KARNAMES',
    payload: response.data.data
  } )
}

// ** Update karname points of week ID
export const updateKarnamesOfWeek_stats = async ( weekId ) => {
  console.log( '---- updateKarnamesOfWeek_stats() ----' )
  // console.log( weekId )  
  try {
    const response = await axios.get( `/api/ad/update-all-karnames/${ weekId }` )
    console.log( response )

    return true
  } catch ( error ) {
    console.log( error )
    return false
  }
}


