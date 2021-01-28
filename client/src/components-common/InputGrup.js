import React, { useState } from 'react'

// Input + append Btn (custom)  - Works fine
// ** Fix needed - only use this when u have append
const InputGrup = ( {
  placeholder,
  label,
  // variant, // append-btn color
  onsubmit,
  append,
  appendText,  // Submit
  //value,
  onChange,
  className
} ) => {

  const [ value, setValue ] = useState( '' )

  // If append btn exist
  const handleSubmit = () => {
    if ( onsubmit ) {
      onsubmit( value )
    } else {
      console.log( 'onsubmit not defined!' )
    }
  }


  //=======================================================================
  return <div className={ "input-group " + className } style={ { verticalAlign: 'top' } }>
    { label && <span className="pt-2  mr-3" style={ { fontWeight: '500' } }>
      { label }
    </span> }
    <input
      type="text"
      className="form-control"
      placeholder={ placeholder }
      value={ value }
      onChange={ e => setValue( e.target.value ) }
    //onChange={ e => onChange( e.target.value ) }   // Error
    />
    { append && <div className="input-group-append">
      <button
        className="btn btn-success"
        type="button"
        onClick={ handleSubmit }
      > { appendText ? appendText : 'Submit' }
      </button>
    </div> }
  </div>

}

export default InputGrup