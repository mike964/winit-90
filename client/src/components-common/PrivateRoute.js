import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'

const PrivateRoute = ( { component: Component, admin, ...rest } ) => {

  const { isAuthenticated, currentUser } = useSelector( state => state.auth )
  const isAdmin = ( currentUser ? ( currentUser.isAdmin ? true : false ) : false )
  const token = Cookies.get( 'wntkn' )
  // console.log( token )  // output: token string

  console.log( '--- PrivateRoute ---' )
  console.log( 'props.admin: ' + admin )
  console.log( 'isAuthenticated: ' + isAuthenticated )

  return <Route { ...rest }
    render={ props => {
      // If user is logged in or cookie token exist
      if ( isAuthenticated || token ) {
        // If Route is restricted to only Admin
        //  if ( admin ) {
        //   if ( isAdmin === true ) {
        //     return <Component { ...rest } { ...props } />

        //  } else {
        //     return <Redirect to={
        //      {
        //        pathname: '/unauthorized',
        //       state: { from: props.location }
        //     }
        //   }
        //    />
        //  }
        // If Route is restricted to Logged in Users
        //  } else {
        return <Component { ...rest } { ...props } />
      }

      //} else {
      //  return <Redirect to={
      //   {
      //     pathname: '/weeklycontest',  // matches pg // Or u can redirect to Login page
      //     state: { from: props.location }
      //   }
      //  } />
      //  }
    } }
  />
}

export default PrivateRoute 