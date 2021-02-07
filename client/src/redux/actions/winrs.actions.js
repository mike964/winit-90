import store from '../store'
import axios from 'axios'
const { dispatch, getState } = store


// Function in this file, not used anymore
export const getWeekWinners = async ( weekId ) => {
  console.log( '---- getWeekWinners() ----' )

  stWinnersLoading( true )


  try {
    const response = await axios.get( `/api/weeks/${ weekId }` )
    console.log( response.data )

    if ( response.data.data.topUsers ) {
      console.log( '---- set winners' )
      setWinners( response.data.data.topUsers.g1.topUsers )
    } else {
      setWinners( [] )
    }

  } catch ( error ) {
    console.log( error )
    setWinners( [] )
  }

  stWinnersLoading( false )
}



export const setWinners = ( winnersArr ) => {
  dispatch( {
    type: 'SET_WINNERS',
    payload: winnersArr
  } )
}

export const stWinnersLoading = ( x ) => {
  dispatch( {
    type: 'ST_WINNERS_LOADING',
    payload: x
  } )
}

export const stWinnersSelectedWeek = ( x ) => {
  dispatch( {
    type: 'ST_WINNERS_SELECTED_WEEK',
    payload: x
  } )
}
