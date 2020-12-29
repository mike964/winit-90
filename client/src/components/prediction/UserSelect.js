import React from 'react'
// import { useSelector } from 'react-redux'
import { useState } from 'react';
import store from '../../redux/store';

const UserSelect = ( { options, name, value, onChange } ) => {

  const [ user, setUser ] = useState()

  const handleChange = ( e ) => setUser( e.target.value )

  const settUser = () => {
    store.dispatch( {
      type: 'SET_CURRENT_USER',
      payload: user
    } )
  }


  console.log( options )




  return <>
  </>
}

export default UserSelect



// <select id="cars">
//   <option value="volvo">Volvo</option>
//    <option value="saab">Saab</option>
//    <option value="opel">Opel</option>
//    <option value="audi">Audi</option>
//  </select>