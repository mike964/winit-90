import React, { useState, useEffect } from 'react'


// * this checkbox works fine. Build by @moslm
const Checkbox = ( {
  label,
  name,
  checked,
  onChange,
  onclick,
  disabled,
  labelRight,
  className
} ) => {

  // Default Props
  const labelRight_ = ( labelRight ? labelRight : false )
  const name_ = ( name ? name : 'no-name' )
  const [ isChecked, stIsChecked ] = useState( checked ? checked : false )

  const handleChange_ = ( e ) => {
    // console.log( e.target )  // <input ... >
    // console.log( e.target.value )   // on
    // console.log( e.target.cheked )   // undefined
    // const value = e.target.checked
    // const name = e.target.name;

    // setChecked(event.target.checked); 
    // stIsChecked( e.target.checked )

    onChange( e )

    // console.log( e.target.checked )   // FOR TEST

    if ( e.target.checked && onclick ) {
      onclick()
    }
  }

  // useEffect( () => {
  //   // console.log( 'checked changed' ) // Works fine
  //   stIsChecked( checked )
  // }, [ checked ] )

  return <span className={ className }>
    { !labelRight_ && <span className='align-top'>{ label }</span> }
    { ' ' }
    <label className='checkbox-w3' >
      <input
        name={ name_ }
        id={ `${ name }-id` }
        type="checkbox"
        // checked={ isChecked }
        checked={ checked }
        onChange={ handleChange_ }
      // disabled={ disabled }
      />
      <span className="checkmark"></span>
    </label>

    { labelRight_ && <span className='align-top'>{ label }</span> }
  </span>
}

export default Checkbox
