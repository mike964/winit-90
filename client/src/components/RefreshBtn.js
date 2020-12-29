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


  //==========================================================================
  return <button className={ className + ' bg-none border-none white ulineonhover' } onClick={ handleClick } >
    <i className="fas fa-redo" /> Refresh
    </button>

}

export default RefreshBtn
