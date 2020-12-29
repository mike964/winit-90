import React from 'react'

const TopUsersTable = ( {
  simple
} ) => {
  return <div className='top-users'>
    <div className="header">
      <span><i className="fas fa-star" /> Winners of Last Week </span>
    </div>
    <table id="topusers">
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>3200</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jacob</td>
        <td>3100</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Scott</td>
        <td>2925</td>
      </tr>
      <tr>
        <td>4</td>
        <td>John</td>
        <td>Soren</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Brad</td>
        <td>Jinus</td>
      </tr>
    </table>
    <div className="text-center">
      show more ...
        </div>
  </div>
}

export default TopUsersTable
