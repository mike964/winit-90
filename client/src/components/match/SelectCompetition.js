import React from 'react'

const SelectCompetition = ( {
  label,
  options,
  onChange,
  value,
} ) => {

  console.log( options )
  const optionss = options.map( option =>
    <option value={ option.id }>
      { option.name }
    </option>
  )


  return <div className="form-group d-flex align-items-center">
    <label>{ label }: </label>
    <select
      name="competition"
      className="custom-select w-50 ml-2"
      value={ value }
      onChange={ onChange }
    >
      { optionss }
    </select>
  </div>



}

export default SelectCompetition
