import React, { useState, useEffect } from 'react'
import Logo from '../../components-common/Logo'

// League Logo box for week selector
const LigLogoBox = ( {
  name,
  label,  // In order to diplay at bottom of the logo
  onclick,
  clicked,
  size,
} ) => {

  const [ clickedd, st_clickedd ] = useState( clicked ? clicked : false )
  const [ classname, st_classname ] = useState( "lig-logo-box" )



  const handleClick = () => {
    if ( onclick ) {
      onclick()
      st_clickedd( true )
    }
  }

  useEffect( () => {
    st_clickedd( clicked )
  }, [ clicked ] )

  useEffect( () => {
    if ( clickedd === true )
      st_classname( "lig-logo-box clicked" )
    if ( clickedd === false )
      st_classname( "lig-logo-box" )
  }, [ clickedd ] )

  // http://localhost:5000/api/logos/_ligs/prlig.png
  //=============================================================
  return <div className={ classname } onClick={ handleClick }  >

    <Logo
      size={ size }
      src={ `/api/logos/_ligs/${ name }.png` }
      style
    />
    {/* { label && <div className="center">
      { label }
    </div> } */}

  </div>
}

export default LigLogoBox
