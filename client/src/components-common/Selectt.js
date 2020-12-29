import React from 'react'

const Selectt = ( { items } ) => {

  const [ value, setValue ] = React.useState();

  return <select class="custom-select"
    value={ value }
    onChange={ e => setValue( e.target.value ) }
  >
    { items && items.map( ( opt =>
      <option value={ opt.value } key={ opt.value } >
        { opt.label }
      </option>
    ) ) }
  </select>
}

export default Selectt


  // < select class="custom-select" > */}
//<option selected>Open this select menu</option> */}
// <option value="1">One</option> */}
