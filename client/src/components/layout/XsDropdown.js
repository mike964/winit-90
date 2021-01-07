import React from 'react'

const XsDropdown = () => {



  return <div className="dropdown">
    <button
      className="btn "
      style={ { background: '#30006e', color: 'white' } }
      type="button"
      id="dropdownMenu1"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false">
      <i className="fas fa-bars"
        style={ { fontSize: '18px' } }></i>
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
      <a className="dropdown-item" href="#!">Action</a>
      <a className="dropdown-item" href="#!">Another action action</a>
    </div>
  </div>
}

export default XsDropdown
