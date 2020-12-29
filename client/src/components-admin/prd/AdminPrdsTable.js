import React from 'react'
import { Table } from 'react-bootstrap'
import PrdsOfMatchTR from './PrdsofMatchTR'

const AdminPrdsTable = ( { prds, vip } ) => {
  // vip means this table is for vip predictions or not

  return <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th> Prd ID </th>
        <th> User </th>
        <th> AnsKey </th>
        <th> Correct </th>
        { !vip && <>
          <th> AnsKey2 </th>
          <th> Cor GD </th>
        </> }

        { vip ? <th> PosWin </th> : <th> Points </th> }

        { vip && <>
          <th> Stake </th>
          <th> GotPaid </th>
        </> }
      </tr>
    </thead>

    <tbody>
      { prds && prds.map( ( prd, index ) =>
        <PrdsOfMatchTR prd={ prd } key={ index } />
      ) }
    </tbody>
  </Table>
}

export default AdminPrdsTable
