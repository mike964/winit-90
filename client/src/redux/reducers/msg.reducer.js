

// my predictions, array of objects

// {
//   "match": "5ef7cfe2a0606a4b742fe28d",
//   "answerKey":3
// }

const initState = {
  // isEditing: null, 
  loading: false,
  messages: [], // All my messages
  unreadMsgsCount: null      // Unread Messages Count  
}


export default ( state = initState, action ) => {
  switch ( action.type ) {



    // check msg as read


    case 'SET_MSG_LOADING':
      return {
        ...state,
        loading: action.payload
      }

    case 'SET_MSGS':
      return {
        ...state,
        messages: action.payload
      }
    case 'SET_UNREAD_MSG_COUNT':
      return {
        ...state,
        unreadMsgsCount: action.payload
      }

    case 'UPDATE_MSG':  // for ex set msg.read to true
      return {
        ...state,
        messages: action.payload
      }
    // After user log out
    case 'CLEAR_ALL_MSGS':
      return {
        messages: []
      }


    default:
      return state
  }
}


