// import { matches } from '../../mock-data/data'

// const initState = matches
const initState = {
  myVipredictions: [],  // my vip predictions (for user)
  // allVipredictions: []   // For Admin
}


export default ( state = initState, action ) => {
  switch ( action.type ) {
    case 'SET_MY_VIP_PREDICTIONS':
      return {
        ...state,
        myVipredictions: action.payload
      }
    case 'ADD_VIP_PREDICTION':
      return {
        ...state,
        myVipredictions: [ ...state.myVipredictions,
        action.payload ]
      }
    case 'SET_ALL_VIP_PREDICTIONS':
      // For Admin
      return {
        ...state,
        allVipredictions: action.payload
      }
    case 'CLEAR_ALL_PREDICTIONS':
      // For Admin
      return {}

    default:
      return state
  }
}