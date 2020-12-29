import React, { useEffect, useState } from 'react'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';




const Sidebare = () => {

  const location = useLocation()
  const history = useHistory()

  const [ hideSidebar, setHideSidebar ] = useState( true )
  console.log( location.pathname )   //  output: /   /matches  

  const { isAuthenticated } = useSelector( state => state.auth )

  useEffect( () => {
    location.pathname === '/' ? setHideSidebar( true ) : setHideSidebar( false )
    // Hide sidebar in Amin Page
    let location_pathname = location.pathname
    let x = location_pathname.startsWith( '/admin' )
    if ( x ) setHideSidebar( true )

  }, [ location ] )




  // only show sidebar if user is logged in    


  //=====================================================================
  return <>
    { !hideSidebar && isAuthenticated && <div className="sidebar-container">

      <SideNav className='em-16 bold'
        onSelect={ ( selected ) => {
          const to = `/${ selected }`
          if ( location.pathname !== to ) history.push( to )
        } }
      >

        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          {/* <NavItem eventKey="">
            <NavIcon><i className="fa fa-fw fa-home em-16" /></NavIcon>
            <NavText> Home </NavText>
          </NavItem> */}

          <NavItem eventKey="predictions">
            <NavIcon><i className="fas fa-flag-checkered em-16" /></NavIcon>
            <NavText> توقعاتي </NavText>
          </NavItem>

          <NavItem eventKey="predictions-gold">
            <NavIcon><i className="fas fa-gem em-16" /></NavIcon>
            <NavText>توقعاتي الذهبیة </NavText>
          </NavItem>

          <NavItem eventKey="messages">
            <NavIcon><i className="fas fa-envelope em-16" /></NavIcon>
            <NavText> الرسائل </NavText>
          </NavItem>

          <NavItem eventKey="honours">
            <NavIcon><i className="fas fa-trophy em-16" /></NavIcon>
            <NavText> الالقاب </NavText>
          </NavItem>

          <NavItem eventKey="cashout">
            <NavIcon><i className="fas fa-hand-holding-usd em-16" /></NavIcon>
            <NavText> سحب الجوائز </NavText>
          </NavItem>

          <NavItem eventKey="charge-balance">
            <NavIcon><i className="fas fa-donate em-16" /></NavIcon>
            <NavText> شحن الرصید </NavText>
          </NavItem>

          <NavItem eventKey="settings">
            <NavIcon><i className="fas fa-cog em-16" /></NavIcon>
            <NavText> الاعدادات </NavText>
          </NavItem>

        </SideNav.Nav>
      </SideNav>
    </div> }
  </>
}

export default Sidebare
