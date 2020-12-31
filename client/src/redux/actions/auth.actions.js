
import axios from 'axios'
import Cookies from 'js-cookie'
import { axos } from '../../utils'
import store from '../store'
// import { getProjectsOfUserFromDB } from './project.actions'
// import { getStepsOfUserFromDB } from './step.actions'
const { dispatch } = store


// If google login success: set token google : 'true'


// Register new User - JWT
export const signupUser = async user => {
  // setLoading()

  try {
    // const response = await axios.post( /auth/signup`, user )
    const res = await axos.post( `/auth/signup`, user )
    console.log( res )

    Cookies.set( 'wntkn', res.data.token, { expires: 7 } )

    setReqHeaders()     // Set req.header token

    dispatch( {
      type: 'SET_USER',
      payload: res.data.user
    } )

    // loadUser()      // *** Then Load User data
    return true
    // }
  } catch ( error ) {
    console.log( 'Sign up faill.' )

    // if ( response.data.err_code === 11000 ) {
    //   if ( response.data.err_keyvalue.email ) {
    //     err_msg = 'This Email already exists.'
    //   } else if ( response.data.err_keyvalue.username ) {
    //     err_msg = 'This Username already taken. Try Another One.'
    //   } else {
    //     err_msg = 'Sign up fail. Try again.'
    //   }
    // }
    return false
  }
}


// Login User - JWT
export const loginUser = async ( user ) => {

  try {
    const res = await axos.post( `/auth/login`, user )
    console.log( res )    // res.data => {success: true, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC..."}

    // Save cookie to browser  
    Cookies.set( 'wntkn', res.data.token, { expires: 7 } )   // 7 days
    // Cookies.set( 'logintokin', 'loginnnn', { expires: 7 } )   // 7 days 

    setReqHeaders()   // SET TOKEN 

    dispatch( {
      type: 'SET_USER',
      payload: res.data.user
    } )

    return true

  } catch ( error ) {
    console.log( 'Login fail!' )
    console.log( error )
    return false
  }
}


// ** When browser reload 
export const loadUser = async () => {
  console.log( '--- loadUser()  :auth actions' )

  // console.log( Cookies.get() )
  // console.log( document.cookies )   // undefined

  let cookies = Cookies.get()
  // console.log( cookies )

  console.log( 'token: ' + cookies.wntkn )

  cookies.wntkn ? console.log( '--- Jwt exist in client' )
    : console.log( '--- Jwt not exist in client!' )


  let success = false   // false by default
  // if ( cookies.wntkn ) success = await loadUser_jwt()   // FOR TEST
  // success = token ? await loadUser_jwt() : await loadUser_google()

  // if ( cookies.passportlogin === 'true' )
  //   success = await loadUser_google()

  if ( cookies.passportlogin === 'true' || cookies.wntkn )
    success = await loadUserr()

  console.log( 'success: ' + success )   // Good  success: true

  return success
}


const loadUserr = async () => {
  console.log( '--- loadUserr ()' )
  // console.log( Cookies.get() ) 
  setReqHeaders()   // Set token 

  try {
    // const res = await axos.get( `/auth/me` )
    const res = await axos.get( `/auth` )

    console.log( res.data )

    // if ( res.data.success ) {
    dispatch( {
      type: 'SET_USER',
      payload: res.data.user
    } )

    // let xx = document.cookie  
    // console.log( xx )   // doesn't include passportJs cookies, only jwt

    return true

  } catch ( error ) {
    console.log( error )
    return false
  }
}

// Logout
export const logout = async () => {
  // *** This logout() works both for 'jwt' , 'passport-google'
  // First Clear Cookie
  // Then Clear Redux Store
  // localStorage.removeItem( 'token' )
  Cookies.remove( 'wntkn' )
  Cookies.remove( 'passportlogin' )

  // Cookies.set( 'session.sig', 'null' )   // Doesn't work!

  // console.log(document.cookies)  // works fine but doesn't show passportJs cookies

  dispatch( { type: 'CLEAR_PRDS' } )
  // Then clear user token from 'localStorage / browser cookie' and logout
  dispatch( { type: 'LOGOUT' } )

  // await axios.get( /auth/logout` )   // Doesn't work

  // The line below works :solved the problem.
  let base_url = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_SERVER : ''
  window.open( `${ base_url }/auth/logout`, "_self" );

  // Reaload page in order to clear Redux store
  // window.location.reload()
}


export const setReqHeaders = () => {
  console.log( '--- setReqHeaders()' )
  // const token = Cookies.get( 'wntkn' )
  // console.log( Cookies.get() )

  let cookies = Cookies.get()
  console.log( cookies )

  let token = cookies.wntkn


  if ( token ) {
    // Apply to every request
    // axios.defaults.headers.common[ 'Authorization' ] = token
    axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${ token }`
    axos.defaults.headers.common[ 'Authorization' ] = `Bearer ${ token }`
  } else {
    // Delete auth header
    delete axios.defaults.headers.common[ 'Authorization' ];
    delete axos.defaults.headers.common[ 'Authorization' ];
  }
};


// Clear Errors
export const clearErrors = () => dispatch( { type: 'CLEAR_ERRORS' } )

export const loginWithPassport = ( x ) => {   // x: ['google','facebook']


  // window.open( `/ auth / ${ x }`, "_self" )   // This line works inside client server (3000 for ex)
  // window.open( /auth/${ x }`, "_self" )   // This line works inside client server (3000 for ex)

  Cookies.set( 'passportlogin', 'true' )

  // window.open( `/auth/${ x }`, "_self" )   // This line works inside client server (3000 for ex)

  let base_url = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_SERVER : ''
  window.open( `${ base_url }/auth/${ x }`, "_self" )
  // const res = await axos.get( '/auth/google' )  // Doesn't work
  // console.log( res )
} 