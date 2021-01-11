import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from "react-router-dom"
import { useSelector } from 'react-redux'
import AuthBtnsModal from '../auth/AuthBtnsModal'
// import LoginBtnModal from '../auth/LoginBtnModal'
import { logout } from '../../redux/actions/auth.actions'
import { setNavbar } from '../../redux/actions/global.actions'
import WinitLogo from './WinitLogo'
import NotificationBell from './NotificationBell'
import { Spinner } from 'react-bootstrap'
import SpinnersBox from '../../components-common/SpinnersBox'
// import Clock from './Clock'


// Arabic Navbar
const Navbar = () => {

  const location = useLocation()
  const history = useHistory()

  const [ hideNavbar, sethideNavbar ] = useState( false )
  const [ showAuthBtns, setShowAuthBtns ] = useState( false )
  // console.log( location.pathname )   //  output: /   /weeklycontest   

  const { isAuthenticated, currentUser, loading: userLoading } = useSelector( state => state.auth )
  // Check if Current Loggedin User is Admin or not
  const isAdmin = ( currentUser ? ( currentUser.isAdmin ? true : false ) : false )
  const { navbar } = useSelector( state => state.global )

  // console.log( navbar )
  // ** No need right now. For the moment keep it simple
  // useEffect( () => {
  //   location.pathname === '/' ? sethideNavbar( true ) : sethideNavbar( false )
  // }, [ location ] )

  useEffect( () => {
    if ( !userLoading && !isAuthenticated ) {
      setShowAuthBtns( true )
    }
  }, [ userLoading, isAuthenticated ] )

  const handleLogout = () => {
    logout()
    // Redirect to matches after logout 
    // history.push( '/matches' )
  }



  const getFirstName = ( name ) => {
    if ( name ) {
      let nameArr = name.split( ' ' )
      return nameArr[ 0 ]
    } else {
      return 'null'
    }
  }

  // const firstName = ( currentUser ? getFirstName( currentUser.name ) : 'nulll' )




  const authLinks = <>
    { currentUser && <>

      <div className="ib mr-3">
        {/* <div className="ib ">Hello</div>  { ' ' } */ }
        <span className="ib bold white">
          {/* { getFirstName( currentUser.name ) } */ }
          { currentUser.name }
        </span> { ' ' }
        <span className="ib fw-400">مرحباً</span> { ' ' }

        <span className="mx-3">
          <NotificationBell />
        </span>
      </div>

      <button
        //className="btn btn-outline-danger "
        className="auth logout"
        onClick={ () => handleLogout() }
      > <i className="fas fa-sign-out-alt" /> خروج
      </button>
    </> }
  </>

  const guestLinks = <>
    {showAuthBtns
      ? <AuthBtnsModal type="signup" />
      : <div className='py-1' style={ { color: '#2b005c' } }>.</div>
      // Line above in order to prevent navbar collpase when no btns
    }
  </>
  //====================================================================================
  return <div className={ hideNavbar ? "hidden" : "navbar-main" }  >

    <div className="lion-logo">
      <Link to="/" className="x" > <WinitLogo />  </Link>
    </div>



    <div className="first-row d-flex">

      <div className="flex-grow-1"></div>
      { isAuthenticated && <span className="gold p-2 mr-3">
        <i className="fas fa-coins mr-1" />
        <span className="credit">رصیدک:</span> { ' ' }

        { currentUser.balance || currentUser.balance === 0
          ? <span> ${ currentUser.balance }</span>
          : <span>$33</span> }

      </span> }

      <div className="p-1 text-center auth-btns mr-2">
        { isAuthenticated ? authLinks : guestLinks }
      </div>
    </div>

    {/* Second Row */ }

    <div className="scnd-row d-flex">
      <div className="flex-grow-1 d-flex justify-content-center bg-white">

        <Link to="/"
          className={ navbar === 'home' ? 'navitem selected home' : 'navitem home' }
          onClick={ () => setNavbar( 'home' ) }
        >  <i className="fas fa-home" />
        </Link>



        {/* Will Be Added Very Soon  */ }
        { isAuthenticated && <Link to="/goldencontest"
          className={ ( navbar === 'goldencontest' ? 'navitem__selected' : 'navitem' ) }
          onClick={ () => setNavbar( 'goldencontest' ) }
        > <i className="fas fa-gem" /> <span> المسابقة الذهبیة </span>
        </Link> }


        <Link to="/matches"
          className={ ( navbar === 'matches' ? 'navitem__selected' : 'navitem' ) }
          onClick={ () => setNavbar( 'matches' ) }
        > <i className="fas fa-futbol" /> <span> المباریات </span>
        </Link>

        <Link to="/winners"
          className={ ( navbar === 'winners' ? 'navitem__selected' : 'navitem' ) }
          onClick={ () => setNavbar( 'winners' ) }
        >  <i className="fas fa-trophy" /><span> الفائزون </span>
        </Link>

        {/* Line below not added yet */ }
        {/* <Link to="/"
          className={ navbar === 'home' ? 'navitem selected home' : 'navitem home' }
          onClick={ () => setNavbar( 'home' ) }
        >   <i className="fas fa-list-ol" /> <span>الترتیب</span>
        </Link> */}

        {/* Rules & Instructions */ }
        <Link to="/rules"
          className={ ( navbar === 'rules' ? 'navitem__selected' : 'navitem' ) }
          onClick={ () => setNavbar( 'rules' ) }
        > <i className="fas fa-list-ul" /><span> التعلیمات </span>
        </Link>




        {/* { isAuthenticated &&
          <Link to="/dashboard"
            className={ ( navbar === 'dashboard' ? 'navitem__selected' : 'navitem' ) }
            onClick={ () => setNavbar( 'dashboard' ) }
          >  <i className="fas fa-tachometer-alt" /> 
            <span> لوحة التحکم </span>
          </Link> } */}
      </div>

      { isAdmin &&
        <div className="admin bg-w p-1">
          <Link to="/admin"
            className={ ( navbar === 'admin' ? 'navitem__selected' : 'navitem' ) }
            onClick={ () => setNavbar( 'admin' ) }
          > <i className="fas fa-user-lock" />
          </Link>
        </div> }

    </div>

  </div>
}

export default Navbar


//<div className="float-left ml-2 white boldd">
//Winit96
  //    </div>
  //  <div className="float-right mr-2">
  //    <Clock />
 //   </div>    