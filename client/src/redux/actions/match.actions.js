import axios from 'axios'
import moment from 'moment'
import { axos } from '../../utils'
import store from '../store'
const { dispatch, getState } = store


export const setMatchesLoading = ( x ) => {  // x : boolean
  dispatch( {
    type: 'SET_MATCH_LOADING',
    payload: x
  } )
}

// Load Matches for User & Admin  (
export const getMatches_DB = async ( weekId ) => {
  console.log( '--- getMatches_DB() ---' )
  // Get matches of the,next,last week and set them in Redux when MatchesPg is Mounted

  // const startDate = '2020-09-26'   // FOR TEST
  const startDate = moment().subtract( 10, 'days' )   // Get Last 20 days matches

  // setMatchesLoading( true ) // set matches loading to true

  try {
    let response

    response = await axos.get( `/api/matches?from=${ startDate }` )    // Fukk Yess :)

    console.log( response )   // for test 

    dispatch( {
      type: 'SET_MATCHES',
      payload: response.data.matches
    } )

  } catch ( error ) {
    console.log( 'Error: Load matches fail!' )
    console.log( error )
  }
  setMatchesLoading( false ) // set matches loding back to false
}



////////////////////////
//===================//
// *** FOR ADMIN *** //
//===================//
//======================================================================
// export const getAllMatches = async () => {
//   console.log( '--- getAllMatches() ---' )
//   // Load All Matches of this year
//   // Get matches of the,next,last week and set them in Redux when MatchesPg is Mounted

//   // dispatch( { type: 'SET_PROJECT_LOADING' } )
//   // First set req.headers . auth in order to pass protected route
//   // setReqHeaders() 

//   const response =await axos.get( `${ process.env.REACT_APP_SERVER}/api/matches?sort=date` )
//   // console.log( response.data )   // {success: true, nResults: 60, matches: Array(60)}

//   dispatch( {
//     type: 'SET_MATCHES',
//     payload: response.data.matches
//   } )
// }

// Add Match to DB By Admin
export const addMatch_DB = async ( newMatch ) => {

  // console.log( step )
  // setReqHeaders()


  try {
    // const response =await axos.post( `${ process.env.REACT_APP_SERVER}/api/matches`, newMatch )
    const response = await axos.post( `/api/matches`, newMatch )

    console.log( response.data )
    // Then Add to redux state

    dispatch( {
      type: 'ADD_MATCH',
      // payload: step
      payload: {
        ...response.data.data,
        team1_shortName: newMatch.team1,
        team2_shortName: newMatch.team2
      }
    } )

    return true

  } catch ( error ) {
    console.log( error )
    return false
  }
}

// Update Match Detials by Admin (time,vip,odds,...)
export const updateMatch_DB = async ( matchId, _match ) => {
  try {
    const response = await axos.patch( `/api/matches/${ matchId }`, _match )
    console.log( response )

    // Then Add to redux state 
    dispatch( {
      type: 'UPDATE_MATCH',
      payload: response.data.data
    } )

    return true
  } catch ( err ) {
    console.log( err )
    return false
  }
}

export const updateMatchResult = async ( matchId, _match ) => {
  // Update Match Result, Then Mark Predictions as Correct or Not

  console.log( _match )

  // console.log( response.data )   
  try {
    const response = await axos.post( `/api/matches/update-result/${ matchId }`, _match )

    // console.log( 'Try 1' )  // If Error doesn't reach here, goes to catch
    console.log( response.data )

    // Then Add to redux state
    dispatch( {
      type: 'UPDATE_MATCH',
      payload: response.data.updatedMatch,
      id: matchId
    } )

    return true  // In order to display in frontend

  } catch ( error ) {
    console.log( 'Error: ' + error )      // Good
    // console.log( 'After Catch 1' )     // Good
    return false   // In order to display in frontend
  }
}

export const setCurrentMatch = ( match ) => {
  dispatch( {
    type: 'SET_CURRENT_MATCH',
    payload: match
  } )
}

export const completematch = ( matchId ) =>
  dispatch( {
    type: 'COMPLETE_match',
    payload: matchId
  } )

export const deleteMatch_DB = async ( matchId ) => {
  // First delete from DB, Then delete from redux 
  // api/v1/matches/5f0b586ee236e03d7c8e2553
  const id = matchId

  await axos.delete( `/api/matches/${ id }` )

  dispatch( {
    type: 'DELETE_MATCH',
    payload: id
  } )
}


// Calculate Points for Predictions of matchId
export const calculatePointsForPredictions = async ( matchId ) => {
  // `{{URL}}/api/v1/ad/calculate-points/5f25976be6b0da6448a5ee5d`

  try {
    const response = await axos.get( `/api/ad/calculate-points/${ matchId }` )
    // console.log( response )
    console.log( response.data )

    return true
  } catch ( error ) {
    return false
  }

}