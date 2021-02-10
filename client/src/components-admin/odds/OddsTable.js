import React from 'react'
import moment from 'moment'
import { Table } from 'react-bootstrap'

const OddsTable = ( { odds } ) => {
  return <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>home</th>
        <th>away</th>
        <th>draw</th>
        <th>updated</th>
      </tr>
    </thead>
    <tbody>
      { odds && odds.length && odds.map( ( item ) => {
        return <tr>
          <td>{ item.sport }</td>
          <td>{ item.team_home }  { ' ' }   { item.odds ? item.odds[ 0 ] : '' }</td>
          <td>{ item.team_away } { ' ' } { item.odds ? item.odds[ 1 ] : '' }</td>
          <td>  { item.odds ? item.odds[ 2 ] : '' }</td>
          <td>  { moment( item.last_update * 1000 ).format( 'MMM Do YYYY, HH:mm' ) } </td>
        </tr>
      } )
      }
    </tbody>
  </Table>
}

export default OddsTable
