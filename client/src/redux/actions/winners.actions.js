import store from '../store'
import axios from 'axios'
const { dispatch, getState } = store



export const getWeekWinners = async ( weekNumb ) => {

  stWinnersLoading( true )


  try {
    const response = await axios.get( `/api/weeks/2020/${ weekNumb }` )
    // const response = await axios.get( ` / api / winners / 2020 - ${ weekNumb }` ) 
    console.log( response )

    stWinners( response.data.week.topUsers.g1.topUsers )
    stWinnersLoading( false )
    return true
  } catch ( error ) {
    console.log( error )
    stWinners( [] )
    stWinnersLoading( false )
    return false
  }
}



export const stWinners = ( winnersArr ) => {
  dispatch( {
    type: 'ST_WINNERS',
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
