import moment from 'moment'
// import store from '../store'
// const { dispatch, getState } = store

const initState = {
  currentTime: null,   // match bar default selected item
  currentTimeUnix: null   // match bar default selected item
}


export default ( state = initState, action ) => {
  switch ( action.type ) {

    case 'GET_TIME':
      return {
        ...state,
        currentTime: action.payload,
        currentTimeUnix: moment().format( 'X' )
      }
    default:
      return state
  }
} 