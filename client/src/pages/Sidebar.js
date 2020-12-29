/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useSelector } from 'react-redux'
// import { setSidebar } from '../redux/actions/global.actions'
import { Link, useRouteMatch } from "react-router-dom";

const Sidebar = () => {
  const { unreadMsgsCount } = useSelector( state => state.msg )
  let { url } = useRouteMatch()
  // console.log( url )

  // const handleClick = ( x ) =>  setSidebar( x )   // Not used anymore

  return <div className="sidebar">

    <Link to={ `${ url }/my-prds` }>
      <i className="fas fa-flag-checkered" /> توقعاتي
    </Link>

    <Link to={ `${ url }/my-goldprds` }>
      <i className="fas fa-gem" /> { ' ' } توقعاتي الذهبیة
    </Link>

    <Link to={ `${ url }/messages` }>
      <i className="fas fa-envelope" />  الرسائل { ' ' }
      { unreadMsgsCount > 0 &&
        <span className="badge badge-danger"> { unreadMsgsCount } </span> }
    </Link>

    {/*( Trophies - Honours - Awards )*/ }
    <Link to={ `${ url }/honours` }>
      <i className="fas fa-trophy" />{ ' ' } الالقاب
    </Link>

    <Link to='/cashout' >
      <i className="fas fa-hand-holding-usd" /> { ' ' } سحب الاموال
    </Link>

    <Link to='/charge-balance' >
      <i className="fas fa-donate" /> { ' ' } شحن الرصید
    </Link>

    <Link to={ `${ url }/settings` }>
      <i className="fas fa-cog" /> { ' ' } الاعدادات
    </Link>


  </div>
}

export default Sidebar 