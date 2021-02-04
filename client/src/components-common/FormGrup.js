import React, { useEffect } from 'react'

// form grup must have a label
//
const FormGrup = ( {
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

  return <div className={ className ? "form-group row" + className : " form-group row" }>
    { label && <label htmlFor={ name } className="col-auto col-form-label label">
      { label }
    </label> }
    <div className="col">
      <input
        className="form-control"
        type={ type ? type : 'text' }
        name={ name }
        id={ name }
        placeholder={ value ? value : placeholder }
        disabled={ disabled }
        value={ value }
        onChange={ onChange }   // Make sure onchange works fine
      />
    </div>
  </div>
}

export default FormGrup
