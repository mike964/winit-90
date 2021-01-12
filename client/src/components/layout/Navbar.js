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

      <div className="col-auto pt-2 px-1">
        <span className="mx-3">
          <span className="fw-400"> مرحباً </span> { ' ' }
          <span className="bold white">
            {/* { getFirstName( currentUser.name ) } */ }
            { currentUser.name }
          </span>
        </span>
        <span className="mx-3">
          <NotificationBell />
        </span>
      </div>

      <div className="col-auto py-1 px-2">
        <div class="dropdown">
          <button class="btn white" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-ellipsis-v" />
          </button>
          <div class="dropdown-menu dropdown-menu-right text-r" aria-labelledby="dropdownMenu1">
            <a className="dropdown-item" href="#!"> حسابي </a>
            <a className="dropdown-item" href="#!"
              onClick={ () => handleLogout() }
            > <i className="fas fa-sign-out-alt" /> خروج
            </a>
          </div>
        </div>
      </div>
    </> }
  </>

  const guestLinks = <>
    {showAuthBtns
      ? <div className="col text-r p-1">
        <AuthBtnsModal />
      </div>
      : <div className='p-1' style={ { color: '#2b005c' } }>.</div>
      // Line above in order to prevent navbar collpase when no btns
    }
  </>
  //====================================================================================
  return <div className={ hideNavbar ? "hidden" : "navbar-main" }  >

    {/* <div className="lion-logo">
      <Link to="/" className="x" > <WinitLogo />  </Link>
    </div> */}



    <div className="first-row row">

      <div className="col"></div>

      { isAuthenticated && <div className="col-auto pt-2 px-2 gold">
        <i className="fas fa-coins mr-1" />
        <span className="credit"> رصیدک : </span> { ' ' }

        { currentUser.balance || currentUser.balance === 0
          ? <span> ${ currentUser.balance }</span>
          : <span>$33</span> }

      </div> }

      { isAuthenticated ? authLinks : guestLinks }
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