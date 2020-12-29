import React, { useState } from 'react'

// Input + append Btn (custom)  - Works fine
const InputGroupe = ( {
  placeholder,
  //label,
  // variant, // append-btn color
  onsubmit,
  append,
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
  return <div className={ "input-group " + className }>
    <input type="text"
      className="form-control"
      placeholder={ placeholder } aria-label="" aria-describedby="basic-addon1"
      value={ value }
      onChange={ e => setValue( e.target.value ) }
    //onChange={ e => onChange( e.target.value ) }   // Error
    />
    { append && <div className="input-group-append">
      <button
        className="btn btn-success"
        type="button"
        onClick={ handleSubmit }
      > Go
      </button>
    </div> }
  </div>

}

export default InputGroupe