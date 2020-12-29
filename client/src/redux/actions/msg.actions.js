import store from '../store'
// import axios from 'axios'
import { updateUserBalance } from './auth.actions'
import { axos } from '../../utils'
const { dispatch } = store

export const getMyMessages = async () => {
  console.log( '--- getMyMessages() ---' )
  // 1.First Get all my messages from DB. In order to display them in Dashboard

  setMsgLoading( true )  // Redux Store

  const response = await axos.get( `/api/messages/me` )

  console.log( response )

  // Count unread messages



  if ( response.data.success ) {
    const msgs = response.data.data
    let counter = 0

    for ( let i = 0; i < msgs.length; i++ ) {
      if ( msgs[ i ].read === false ) counter++
    }

    // console.log( 'counterr: ' + counter )   // Good
    dispatch( {
      type: 'SET_UNREAD_MSG_COUNT',
      payload: counter
    } )

    dispatch( {
      type: 'SET_MSGS',
      payload: msgs   // Boolean
    } )
  }

  setMsgLoading( false )  // Redux Store 
}

// SET MSGS LOADING IN REDUX STORE
export const setMsgLoading = ( x ) => {
  dispatch( {
    type: 'SET_MSG_LOADING',
    payload: x   // Boolean
  } )
}