import moment from 'moment'
// import store from '../store'
// const { dispatch, getState } = store

const initState = {
  weeks: [],
  thisWeek: {},
  nextWeek: {},
  lastWeek: {}
}


export default ( state = initState, action ) => {
  switch ( action.type ) {

    case 'SET_WEEKS':
      return {
        ...state,
        weeks: action.payload,
        thisWeek: action.payload.filter( week => week.startUnix === parseInt( moment.utc().startOf( 'week' ).format( 'X' ) ) )[ 0 ],
        nextWeek: action.payload.filter( week => week.startUnix === parseInt( moment.utc().endOf( 'week' ).format( 'X' ) ) + 1 )[ 0 ],
        lastWeek: action.payload.filter( week => week.endUnix === parseInt( moment.utc().startOf( 'week' ).format( 'X' ) ) - 1 )[ 0 ],
        // thisWeek: action.payload.filter( week => week.startUnix === 1596326400 )[ 0 ]  // Works
      }
    default:
      return state
  }
} 