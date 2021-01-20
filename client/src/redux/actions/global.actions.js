import store from '../store'
const { dispatch, getState } = store



export const setClickedWeek = ( x ) => dispatch( {
  type: 'SET_SELECTED_WEEK',
  payload: x
} )

export const setSidebar = ( x ) => {

  console.log( x )

  dispatch( {
    type: 'SET_SIDEBAR',
    payload: x
  } )
}

export const setNavbar = ( x ) => dispatch( {
  type: 'SET_NAVBAR',
  payload: x
} )


// export const getTime = () => {
//   dispatch( { type: 'GET_TIME' } )
// }

export const getTime = ( timee ) => {
  dispatch( { type: 'GET_TIME', payload: timee } )
}

let time
function startTime () {
  var today = new Date()
  var h = today.getHours()
  var m = today.getMinutes()
  var session = "AM"

  if ( h === 0 ) h = 12

  if ( h > 12 ) {
    h = h - 12;
    session = "PM"
  }

  h = ( h < 10 ) ? "0" + h : h
  m = ( m < 10 ) ? "0" + m : m

  // document.getElementById( 'txt' ).innerHTML = h + ":" + m + ":" + s;
  // time = h + ":" + m + ":" + s + " " + session;
  time = h + ":" + m + " " + session;   // Without seconds


  // var t = setTimeout( startTime, 3000 )
  // console.log( text )
  getTime( time )
  setTimeout( startTime, 20000 )
}
startTime()

// getTime()



export const toggleAuthModal = ( x ) => {
  dispatch( { type: 'TOGGLE_AUTH_MODAL', payload: x } )
}

export const stClickedLig = ( x ) => {
  dispatch( {
    type: 'SET_SELECTED_LIG',
    payload: x
  } )
}


export const hideFinishedMatches = ( x ) => {   // x : boolean
  // In order to filter prediction inside Dashboard
  dispatch( {
    type: 'SET_HIDE_FINISHED_MATCHES',
    payload: x
  } )
}

// Expand or collapse all admin match table rows
export const toggleAllRows = () => {
  dispatch( {
    type: 'TOGGLE_ALL_TABLE_ROWS'
  } )
}

// Expand or Collapse all matche ligs for user
export const toggleAllLigs = () => {
  dispatch( {
    type: 'TOGGLE_ALL_LIGS'
  } )
}
