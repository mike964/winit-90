import React, { useState, useEffect } from 'react'

const Checkbox = ( {
  label,
  name,
  checked,
  onclick,
  disabled,
  labelRight
} ) => {

  // Default Props
  const labelRightt = ( labelRight ? labelRight : true )
  const [ isChecked, stIsChecked ] = useState( checked ? checked : false )

  const handleChange = ( e ) => {
    // console.log( e.target )  // <input ... >
    // console.log( e.target.value )   // on
    // console.log( e.target.cheked )   // undefined
    // const value = e.target.checked
    // const name = e.target.name;

    stIsChecked( e.target.checked )

    // if ( !isChecked && onClick ) { onClick() }
    if ( onclick ) { onclick() }
  }

  useEffect( () => {
    // console.log( 'checked changed' ) // Works fine
    stIsChecked( checked )
  }, [ checked ] )

  return <label className='checkbox-w3'>
    { !labelRightt && <> { label } </> } { ' ' }

    <input
      name={ name }
      type="checkbox"
      checked={ isChecked }
      onChange={ handleChange }
      disabled={ disabled }
    />
    <span className="checkmark"></span>

    { labelRightt && <> { label }  </> }
  </label>
}

export default Checkbox
