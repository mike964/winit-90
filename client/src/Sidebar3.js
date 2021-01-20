import React from 'react'
import { Link } from 'react-router-dom';

// ** W3 Sidebar **
///////////////////
const Sidebar3 = () => {


  // const { unreadMsgsCount } = useSelector( state => state.msg )

  function w3_open () {
    document.getElementById( "mySidebar" ).style.display = "block";
  }
  function w3_close () {
    document.getElementById( "mySidebar" ).style.display = "none";
  }

  return <>
    <div className="w3-sidebar sidebar w3-bar-block w3-dark-grey w3-animate-left" style={ { "display": "none" } } id="mySidebar">
      <button className="w3-bar-item w3-button w3-sdiebar-close-btn"
        //onclick="w3_close()"
        onClick={ w3_close }
      > <i className="fas fa-reply" />
      </button>

      <Link to="/predictions"><i className="fas fa-flag-checkered " /> توقعاتي </Link>

      <Link to="/predictions-gold"><i className="fas fa-gem " /> توقعاتي الذهبیة </Link>

      <Link to="/messages"><i className="fas fa-envelope " /> الرسائل </Link>
      {/* { unreadMsgsCount > 0 && <span className="badge badge-danger"> { unreadMsgsCount } </span> } */ }
      {/*( Trophies - Honours - Awards )*/ }
      <Link to="#"><i className="fas fa-trophy " /> الالقاب </Link>

      <Link to="/cashout"><i className="fas fa-hand-holding-usd" /> سحب الجوائز </Link>

      <Link to="/charge-balance"><i className="fas fa-donate " /> شحن الرصید </Link>

    </div>

    <div>
      <button className="w3-button w3-sdiebar-open-btn"
        //onclick="w3_open()"
        onClick={ w3_open }
      > <span className="fs-18">&#9776;</span>    <span className=" d-none d-sm-inline-block">القائمة </span>
      </button>
    </div>
  </>
}

export default Sidebar3
