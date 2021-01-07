// import { matches } from '../../mock-data/data'

// const initState = matches
// const initState = {
//   loading: false,
//   thisWeek: null,
//   nextWeek: null,
//   lastWeek: null,
//   allMatches: []
// }


export const matchReducer = ( state = {
  // Initial State
  loading: true,   // For spinner :tru by default
  matches: [],      // Both for User & Admin
  currentMatch: null,   // For Admin when Editing
}, action ) => {

  switch ( action.type ) {
    case 'SET_MATCH_LOADING':
      return {
        ...state,
        // loading: !state.loading
        loading: action.payload   // boolean
      }
    case 'SET_MATCHES':   // Set Matches for User
      return {
        ...state,
        matches: action.payload
      }
    case 'SET_CURRENT_MATCH':
      return {
        ...state,
        currentMatch: action.payload
      }
    // Action Below For Admin
    case 'ADD_MATCH':
      return {
        ...state,
        matches: [ action.payload, ...state.matches ]
      }
    case 'UPDATE_MATCH':
      return {
        ...state,
        matches: state.matches.map( mch =>
          mch._id === action.id ? { ...mch, ...action.payload } : mch
        )
      }
    case 'DELETE_MATCH':
      return {
        ...state,
        matches: state.matches.filter( mch => mch._id !== action.payload )
      }
    default:
      return state
  }
}


