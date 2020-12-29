import React, { useState, useEffect } from 'react'

const Switch = ( {
  label,
  checked,
  onClick
} ) => {

  const [ isChecked, st_isChecked ] = useState( checked ? checked : false )

  const handleChange = ( e ) => {
    st_isChecked( e.target.checked )
    onClick()
  }

  // If checked change, toggle (animate) switch 
  useEffect( () => {
    // console.log( 'checked changed' ) // Works fine
    st_isChecked( checked )
  }, [ checked ] )

  return <div className="custom-control custom-switch" >
    <input
      //name={ name }
      name={ label }
      type="checkbox"
      className="custom-control-input"
      id="customSwitch1"
      //onClick={ handleToggle } 
      checked={ isChecked }
      onChange={ handleChange }
    />
    <label className="custom-control-label" htmlFor="customSwitch1">
      { label }
    </label>
  </div>
}

export default Switch
