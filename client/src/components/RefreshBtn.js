import React from 'react'

const RefreshBtn = ( {
  onclick,
  color,    // white - green
  className    //  boolean 
} ) => {

  const handleClick = () => {
    console.log( '--- refreshBtn ---' )

    if ( onclick ) {
      onclick()
    } else {
      console.log( 'Error: onclick not defined!' )
    }


  }


  const classname = className ? className : ''
  //==========================================================================
  return <button className={ classname + ' bg-none border-none' } onClick={ handleClick } >
    <i className="fas fa-redo" /> Refresh
    </button>

}

export default RefreshBtn
