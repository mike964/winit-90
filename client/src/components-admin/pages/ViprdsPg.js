import React from 'react'
import { useEffect } from 'react';
import { getAllVipredictions } from '../../redux/actions/vip.actions';
import { useSelector } from 'react-redux';
import ViprdItem from '../prd/ViprdItem';
import { Table } from 'react-bootstrap';


// ** Admin
const ViprdsPg = () => {

  const prds = useSelector( state => state.vip.allVipredictions )


  useEffect( () => {
    getAllVipredictions()
  }, [] )


  return <div className="container center">
    <h5>VIP Prds Page</h5>

    <div className="mb-2 text-r">
      <button className="btn btn-outline-success" onClick={ () => getAllVipredictions() }>
        Refresh
        </button>
    </div>

    <div className="curved">
      <Table striped bordered hover size="sm" className="bg-fff">
        <thead>
          <tr className="center">
            {/* <div className="header p-2 row bg-blue-2 white"> */ }
            <th> # </th>
            <th> Prd ID </th>
            <th> User </th>
            <th> Match </th>
            <th> Stake </th>
            <th> Pos win </th>
            <th> Correct</th>
            <th> Paid </th>
          </tr>
        </thead>

        <tbody>
          { prds && prds.map( ( prd, index ) =>
            <ViprdItem prd={ prd } key={ index } index={ index } />
          ) }
        </tbody>
      </Table>
    </div>

  </div>
}

export default ViprdsPg
