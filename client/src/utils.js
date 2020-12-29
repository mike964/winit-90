import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get( 'wntkn' )
console.log( 'token: ' + token )   // Undefined
// console.log( document.cookies )  // This shit doesn't work at all

export const axos = axios.create( {
  withCredentials: true,   // Send Cookie to server to retrieve user when login with Passport js
  // *** 'https://some-domain.com/api/',
  // baseURL: process.env.REACT_APP_SERVER    // http://localhost:5000
  // baseURL: '/'    // FOR PRODUCTION
  // headers: {'X-Custom-Header': 'foobar'}

  // `headers` are custom headers to be sent
  // headers: {'X-Requested-With': 'XMLHttpRequest'},
  // headers: { 'Authorization': ( token ? `Bearer ${ token }` : '' ) }   // *** FOR JWT
  // headers: { 'Authorization': `Bearer ${ token }` }   // *** FOR JWT
  // For Bearer tokens and such, use `Authorization` custom headers.
} )


// Continue with axos

export const signupValidation = ( user ) => {

  const { email, name, password, password2 } = user

  let err_msg = null

  if ( email === '' || password === '' ) {
    // console.log( 'Please enter all fields.' )
    err_msg = ( 'Please enter all fields.' )
    // st_alertMsg( "Password don't match!" ) 
    // st_alertVariant( 'danger' )
    // st_showAlert( true )
    // Disapper Auth Error after 3 seconds
    // setTimeout( () => st_showAlert( false ), 3000 )

  } else if ( password !== password2 ) {
    err_msg = ( "Passwords don't match!" )
    // st_alertMsg( "Password don't match!" )
    // st_alertVariant( 'danger' )
    // st_showAlert( true )
    // setTimeout( () => st_showAlert( false ), 3000 ) 
  } else if ( name.length < 3 ) {
    err_msg = ( "Name should be 3 characters minimum!" )
  }

  return err_msg
}

