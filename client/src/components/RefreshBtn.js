import React from 'react'

const RefreshBtn = ( {
  onclick,
  color,    // white - green
  className,   //  boolean 
  style
} ) => {

  const handleClick = () => {
    console.log( '--- refreshBtn ---' )

    if ( onclick ) {
      onclick()
    } else {
      console.log( 'Error: onclick not defined!' )
    }


  }

  const btnStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    ...style
  }

  //==========================================================================
  return <span className={ className ? className : '' }
    onClick={ handleClick }
    style={ btnStyle }
  >
    <i className="fas fa-redo" /> Refresh
    </span>

}

export default RefreshBtn
