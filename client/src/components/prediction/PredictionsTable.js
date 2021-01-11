import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import PredictionTableRow from './PredictionTR'


const PredictionsTable = ( { prds, vip, loading } ) => {
  // If (vip = true) means this table is for vip predictions
  // If loading == true => Show spinner

  const Spiner = () => <tr>
    <td className='p-5 center' colspan="8">
      <Spinner animation="border" variant="warning" />
    </td>
  </tr>

  return <table id={ vip ? 'gold-table' : 'predictions' } >
    <thead >
      <tr >
        <th width="40" className="d-none d-sm-table-cell">
          {/* Lig */ }
        </th>
        <th style={ { minWidth: '180px' } } >
          <i className="fas fa-futbol" /> Match
            </th>
        <th className="d-none d-sm-table-cell">
          <i className="far fa-calendar-alt" /> Date
          </th>
        <th>
          Prediction (GD)
        </th>
        <th width="40" >
          { vip
            ? <span><i className="fas fa-donate" /> Winning </span>
            : 'Pts' }
        </th>
      </tr>
    </thead>
    <tbody>
      {/* <tr> <td>Alfreds Futterkiste</td> <td>Maria Anders</td> <td>Germany</td> </tr> */ }

      { loading ?
        <Spiner />
        : <>
          { prds && prds.map( prd => <PredictionTableRow prediction={ prd } vip={ vip } key={ prd._id } /> ) }
        </>
      }


    </tbody>
  </table>
}

export default PredictionsTable
