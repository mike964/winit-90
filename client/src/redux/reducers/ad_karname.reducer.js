import moment from 'moment'
// import store from '../store'
// const { dispatch, getState } = store

const initState = {
  karnames: [],   // All karnames of some weekId
  // thisWeek: [],
  // nextWeek: [],
  // lastWeek: []
}


export default ( state = initState, action ) => {
  switch ( action.type ) {

    case 'SET_KARNAMES':
      return {
        ...state,
        karnames: action.payload,

      }
    default:
      return state
  }
} 