import React from 'react'
import { Link } from 'react-router-dom';

// ** W3 Sidebar **
///////////////////
const Sidebar3 = () => {


  // const { unreadMsgsCount } = useSelector( state => state.msg )

  function w3_open () {
    document.getElementById( "sidebari" ).style.display = "block";
  }
  function w3_close () {
    document.getElementById( "sidebari" ).style.display = "none";
  }

  // ** Sticky Sidebar 
  // <script>
  window.onscroll = function () { myFunction() };



  function myFunction () {
    const sidebar = document.getElementById( "sidebari" );
    const openbtn = document.getElementById( "sidebar-open-btn" )

    const sticky = sidebar.offsetTop ? sidebar.offsetTop : 0

    // console.log( 'sidebar offset top:' )
    // console.log( sticky )
    // console.log( window.pageYOffset )

    if ( window.pageYOffset > sticky ) {
      sidebar.classList.add( "sticky" )
      openbtn.classList.add( "sticky" )
    } else {
      sidebar.classList.remove( "sticky" );
      openbtn.classList.remove( "sticky" );
    }
  }
  //</script>

  //============================================================================
  return <>
    <div className="w3-sidebar sidebar w3-bar-block w3-dark-grey w3-animate-left" id="sidebari" style={ { "display": "none" } }  >
      <button className="w3-bar-item w3-button sidebar-close-btn" id="sidebar-close-btn"
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

    <div id="sidebar-open-btn" style={ { maxHeight: '43px', border: 'none', overflow: 'hidden', background: 'orange' } }>
      <button className="w3-buttonn sidebar-open-btn py-1 px-3"
        //onclick="w3_open()"
        onClick={ w3_open }
        style={ { border: 'none' } }
      > <span className="fs-22">&#9776;</span>
      </button>
    </div>
  </>
}

export default Sidebar3
