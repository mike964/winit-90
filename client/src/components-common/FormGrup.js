import React, { useEffect } from 'react'

// form grup must have a label
//
const FormGrup = ( {
  className,
  type,
  placeholder,
  label,
  labelTop, // place label top
  name,
  value,
  onChange,
  disabled
} ) => {

  // Default props value
  // if ( !type ) { type = 'text' }
  // if ( !placeholder ) { placeholder = 'x' }

  return <div className={ className ? "form-group row" + className : " form-group row" }>
    { label && <label htmlFor={ name } className={ !labelTop ? "col-auto col-form-label label" : "label" }>
      { label }
    </label> }
    { labelTop && <div class="w-100"></div> }
    <div className={ !labelTop ? "col" : "x" }>
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
