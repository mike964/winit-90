
// Admin Match Reducer
export const adminReducer = ( state = {
  // Initial State
  // matches: [],  // All Matches

  loading: false
}, action ) => {

  switch ( action.type ) {

    // case 'SET_MATCHES':
    //   return {
    //     ...state,
    //     matches: action.payload,
    //   }

    // case 'ADD_MATCH':
    //   return {
    //     ...state,
    //     matches: [ action.payload, ...state.matches ]
    //   }
    // case 'UPDATE_MATCH':
    //   return {
    //     ...state,
    //     matches: state.matches.map( mch =>
    //       mch._id === action.payload.id ? { ...mch, ...action.payload } : mch
    //     )
    //   }
    // case 'DELETE_MATCH':
    //   return {
    //     ...state,
    //     matches: state.matches.filter( mch => mch._id !== action.payload )
    //   }
    case 'CLEAR_MATCHES':
      return {
        // delete all MATCHEs
      }

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter( ( todo ) => todo._id !== action.payload )
      }
    default:
      return state
  }
}