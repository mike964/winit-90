import React from 'react'
import { Table } from 'react-bootstrap'
import WeekTR from './WeekTR'


// Admin Week Table
const WeekTable = ( { weeks } ) => {

  return <Table striped bordered hover size="sm" className="bg-fff curved-5">
    <thead>
      <tr className="center bg-blue white">
        <th> Week ID </th>
        <th> Number </th>
        <th> Start date </th>
        <th> Start Unix </th>
        <th> End date </th>
        <th> Actions</th>
      </tr>
    </thead>

    <tbody>
      { weeks && weeks.map( ( week, index ) =>
        <WeekTR week={ week } key={ index } />
      ) }
    </tbody>
  </Table>

}

export default WeekTable
