import React from 'react'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import SingupBtnModal from '../auth/SignupBtnModal'
import LoginBtnModal from '../auth/LoginBtnModal'
import { logout } from '../../redux/actions/auth.actions'
import WinitLogo from './WinitLogo'
import Clock from './Clock'

const Navbar = () => {

  const { isAuthenticated, currentUser } = useSelector( state => state.auth )

  const handleLogout = () => {
    logout()
    // Redirect to hamepage after logout
  }

  const togglerStyle = {
    'font-size': '20px',
    'color': 'aqua',
  }



  const authLinks = <>
    { currentUser && <>
      {/* <div className="text-light inline-block mr-3"> Hi { currentUser.username }  </div> */ }
      <div className="text-light inline-block mr-3"> { currentUser.username } مرحبا </div>
      <button
        className="btn btn-outline-danger "
        onClick={ () => handleLogout() }
      > Logout
      </button>
    </> }
  </>

  const guestLinks = <>
    <LoginBtnModal /> { ' ' } <SingupBtnModal />
  </>
  //==============================================================================
  return <>
    <div className="navbar-main">

      <div className="lion-logo">
        <WinitLogo />
      </div>

      <div className="navbarr">
        <div className="d-flex">
          <div className="d-flex flex-grow-1 justify-content-center">
            <Link to="/" className="navitem" >
              <i className="fas fa-home"></i> </Link>
            <Link to="/weekly" className="navitem" >
              <i className="fas fa-volleyball-ball" /> <span> Matches </span>
            </Link>
            {/* <Link to="/news" className="x" ><i className="fas fa-rss" /> News </Link> */ }
            <Link to="/winners" className="navitem" >
              <i className="fas fa-trophy" /><span> Winners </span>
            </Link>
            <Link to="/rules" className="navitem" >
              <i className="fas fa-balance-scale" /><span> Rules </span>
            </Link>

            { isAuthenticated && <>
              <Link to="/rules" className="navitem" >
                <i className="fas fa-cog" /><span> Setting </span></Link>
              <Link to="/dashboard" className="navitem" >
                <i className="fas fa-tasks" /><span> Dashboard </span></Link>
            </> }
          </div>

          { isAuthenticated && <div className="gold inline-block p-2">
            <i className="fas fa-coins mr-1" /> <span className="credit"> Credit: </span> $250 </div> }

          <div className="p-1 text-center auth-btns mr-2">
            { isAuthenticated ? authLinks : guestLinks }
          </div>

        </div>
      </div>

      {/* Second Row */ }
      {/* <div className="w-100"></div>    */ }
      <div className="scnd-row d-flex justify-content-center">
        <Link to="/golden" className="navitem2" >
          <i className="fas fa-gem" /> Golden Contest
        </Link>
        <Link to="/weekly" className="navitem2" >
          <i className="fas fa-futbol" /> Weekly Contest
        </Link>
      </div>
    </div>

    {/* <div className="float-left ml-2 white boldd">
        Winit96.com
      </div>
      <div className="float-right mr-2">
        <Clock />
      </div> */}
  </>
}

export default Navbar





