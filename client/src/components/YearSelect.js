import React from 'react'

const YearSelect = () => {

  return <div className="d-inline-block w-50">
    <form className="form-inline">
      <label for="cars">Year:</label>
      <select className="custom-select">
        <option selected>2020</option>
        <option value={ 1 }>One</option>
        <option value={ 2 }>Two</option>
        <option value={ 3 }>Three</option>
      </select>

      <input type="submit" className="form-control" value="Submit" />
    </form>
  </div>

}

export default YearSelect
