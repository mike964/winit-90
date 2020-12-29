

// my predictions, array of objects

// {
//   "match": "5ef7cfe2a0606a4b742fe28d",
//   "answerKey":3
// }

const initState = {
  predictions: [],   // This week & next week predictions of mine 
  allPredictions: []  // All my preidctions (Dashboard)
  // thisWeekPrds: [],
  // nextWeekPrds: [],
}


export default ( state = initState, action ) => {
  switch ( action.type ) {
    case 'ADD_PREDICTION':
      return {
        ...state,
        // This week & next week predictions of mine
        predictions: [
          ...state.predictions,
          action.payload
        ]
      }

    case 'UPDATE_PREDICTION_BY_MATCH':
      // console.log( action.payload )
      return {
        ...state,
        predictions: state.predictions.map( prd => {
          if ( prd.match === action.matchId ) {
            return {
              ...prd,
              ...action._prd
            }
          }   // else
          return prd
        } )
      }
    case 'UPDATE_PREDICTION_BY_ID':
      console.log( action )   // { Prediction }
      return {
        ...state,
        predictions: state.predictions.map( prd => {
          if ( prd._id === action.payload._id ) {
            return action.payload
          }   // else
          return prd
        } )
      }

    case 'DELETE_PREDICTION':
      return {
        ...state,
        predictions: state.predictions.filter( ( prd ) => prd.match !== action.matchId )
      }

    case 'SET_PREDICTIONS':
      return {
        ...state,
        predictions: action.payload
      }
    case 'RESET_PRDS':
      // Remove new prds which are not submitted to DB n Keep Submitted prds only
      // console.log( state.predictions )
      return {
        ...state,
        // predictions: action.payload
        predictions: state.predictions.filter( prd => prd._id )   // prd => prd._id => means prd exist in DB
      }
    case 'SET_ALL_PREDICTIONS':
      return {
        ...state,
        allPredictions: action.payload
      }
    // WHEN USER LOGOUT
    case 'CLEAR_PRDS':
      return {
        predictions: [],
        allPredictions: []
      }


    default:
      return state
  }
}


