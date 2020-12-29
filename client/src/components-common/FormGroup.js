import React, { useEffect } from 'react'

const FormGroup = ( {
  className,
  type,
  placeholder,
  label,
  name,
  value,
  onChange,
  disabled
} ) => {

  // Default props value
  // if ( !type ) { type = 'text' }
  // if ( !placeholder ) { placeholder = 'x' }

  return <div className={ className ? "form-group " + className : " form-group" }>
    { label && <label for={ name } className="ib w-150">{ label }</label> }

    <input
      className="form-control"
      type={ type ? type : 'text' }
      name={ name }
      id={ name }
      placeholder={ placeholder ? placeholder : ( value ? value : '' ) }
      disabled={ disabled }
      value={ value }
      onChange={ onChange }   // Make sure onchange works fine
    />
  </div>
}

export default FormGroup
