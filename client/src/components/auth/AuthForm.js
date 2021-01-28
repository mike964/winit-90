import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'
import { loginUser, clearErrors, signupUser, loginWithPassport } from '../../redux/actions/auth.actions'
import { Button, Alert, Spinner } from 'react-bootstrap'
import GoogleSvg from '../../svg/GoogleSvg'
import { loadPredictions } from '../../redux/actions/prediction.actions'
import { axos, signupValidation } from '../../utils'

//=========================================================================
const AuthForm = ( { signup, submitBtnTitle, handleModalShow, homepage } ) => {
  // if signup = true means form type is signup, not login
  // "AuthForm" is used both for login and signup users
  // handleModalShow if form used inside modal
  // style = ['homepg' , '']


  const history = useHistory()

  const [ state, setState ] = useState( {
    name: '',
    email: '',
    password: '',
    password2: ''
  } )

  // ** Style 1 for homepg , Style 2 for other pages
  const style1 = {
    textColor: 'gold'
  }

  // const { name, email, password, password2 } = state

  const onChange = e => setState( { ...state, [ e.target.name ]: e.target.value } )

  // Alert is when form gets submitted or user login. It could be error msg or success
  // const [ showAlert, st_showAlert ] = useState( false )
  const [ errorMsg, setErrorMsg ] = useState( '' )
  const [ showSpinner, setShowSpinner ] = useState( false )


  const loadUser_ = () => {   // Load user data: msgs, prds, karnames, ... 
    // *** Load prediction of this and next week of current user to Redux
    loadPredictions()
    // getMyMessages()
  }


  const handleLogin = ( e ) => {
    e.preventDefault()
    setShowSpinner( true )

    const { email, password } = state

    setTimeout( async () => {
      if ( email === '' || password === '' ) {
        // setAlert( 'Please fill in all fields', 'danger' ) 
        // No nedd - Each field has individual required=true
      } else {
        // console.log( user )

        let success = await loginUser( { email, password } )

        if ( success ) {
          // If Login Successful
          setShowSpinner( false )   // disappear spinner
          if ( handleModalShow )
            handleModalShow()   // Hide modal - if Modal Exist 

          loadUser_()   // load user prds, msgs, ...

          history.push( '/matches' )    // Redirect to /matches page  

        } else {
          // If Login Fail
          setShowSpinner( false )
          // st_showAlert( true )
          setErrorMsg( 'Login failed! Wrong email or password.' )
          setTimeout( () => setErrorMsg( '' ), 3000 )   // Disapper after 3 seconds
        }
      }
    }, 900 )
  }


  // Handle Login with Google/Facebook
  const handleLoginWith = async ( x ) => {
    // e.preventDefault()
    loginWithPassport( x )   // x : ['google', 'pssport']
  }


  const handlesignup = async ( e ) => {
    e.preventDefault()
    console.log( "-- handlesignup() --" )

    const newUser = state


    let validationError = signupValidation( newUser )

    // For test
    // let possibleError = null
    // let possibleServerError = null

    // First CHECK FOR front-end error  
    if ( validationError ) {
      setErrorMsg( validationError )

    } else {   // If frontend error doesn't exist - check for server error
      setShowSpinner( true )
      setTimeout( async () => {

        let success = await signupUser( newUser )

        if ( !success ) {
          setShowSpinner( false )
          setErrorMsg( 'Sign up failed!' )
          setTimeout( () => setErrorMsg( '' ), 3000 )   // Disapper after 3 scnds

        } else {     // IF NO ERROR
          console.log( 'No error --' )
          setShowSpinner( false )
          // console.log( handleModalShow )   // () => setShow(!show)
          if ( handleModalShow )
            handleModalShow()
          history.push( '/matches' )         // Redirect to matchesPg if successfull signup 
        }
      }, 900 )
    }
  }

  const FormLabel = ( { text } ) => <div style={ { textAlign: 'right', padding: '2px', color: '#007bff' } }>{ text }</div>

  ///////////////////////////////////////////////////////////////////////////////////////
  return <form onSubmit={ signup ? handlesignup : handleLogin }
    className={ homepage ? 'auth-form ' + style1.textColor : 'auth-form' }
  >

    { signup && <div className="form-group">
      <FormLabel text='الاسم' />
      <input
        className="form-control"
        type="text"
        name="name"
        placeholder="Name"
        value={ state.name }
        onChange={ onChange }
        required
      />
      <div className="small text-muted textr">بالعربیة او الإنجليزية</div>
    </div> }

    {/* user name should not contain with number */ }
    {/* name should at least has 6 characters */ }

    <div className={ `form-group ${ !signup ? "mb3" : "" }` } >
      <FormLabel text='الایمیل' />
      <input
        type="email"
        className="form-control"
        placeholder={ signup ? "example@mail.com" : "Email" }
        name='email'
        value={ state.email }
        onChange={ onChange }
        required
      />
      {/* <span id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</span> */ }
    </div>

    <div className="form-group">
      <FormLabel text='کلمة المرور' />
      <input
        className="form-control"
        type="password"
        placeholder="Password"
        name='password'
        value={ state.password }
        onChange={ onChange }
        required
      />
      { signup && <div className="small text-muted textr"> یکون 8 احرف او عدد علی الاقل</div> }
    </div>

    { signup && <div className="form-group">
      <FormLabel text='تأكيد كلمة المرور' />
      <input
        className="form-control"
        type="password"
        placeholder="Confirm password"
        name='password2'
        value={ state.password2 }
        onChange={ onChange }
        required
      />
      <div className="small text-muted textr">ادخل کلمة المرور مرة ثانیة</div>
    </div> }

    <div className="my-3">
      <button className={ `btn ${ !errorMsg ? 'login-btn' : 'login-btn__red' }` } type="submit">
        { showSpinner && <Spinner animation="border" size="sm" variant="warning" /> }  { ' ' }
        {/* { signup ? 'Sign up' : 'Log in' } */ }
        { !errorMsg ? signup ? 'تسجیل' : 'دخول'
          : <span className='arial'>{ errorMsg }</span> }
      </button>
    </div>

    <div className='center bold'>
      <span className='clickable ulineonhover mx-1 c-666' onClick={ () => handleLoginWith( 'google' ) } >
        <GoogleSvg /> Google
        </span> { ' ' }
      <span className='facebook clickable ulineonhover mx-1' onClick={ () => handleLoginWith( 'facebook' ) } >
        <i className="fab fa-facebook em-12 bg-w" /> Facebook
      </span>
      <span className='mx-1 c-666'>  { signup ? <>تسجیل عبر</> : <>دخول عبر</> }</span>


    </div>

  </form>
}

export default AuthForm 