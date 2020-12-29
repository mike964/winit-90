import React, { useEffect, useState } from 'react'
import PredictionTableRow from './PredictionTableRow'


const PredictionsTable = ( { prds, vip } ) => {
  // If (vip = true) means this table is for vip predictions


  return <table id={ vip ? 'gold-table' : 'predictions' } >
    <thead >
      <tr >
        <th> </th>
        <th > <i className="fas fa-futbol" /> Match </th>
        <th> <i className="far fa-calendar-alt" /> Date </th>
        <th> <i className="far fa-clock" /> </th>
        <th> My Prediction </th>
        <th> { vip ? <><i className="fas fa-donate" /> Winning </> : 'Points' } </th>
      </tr>
    </thead>
    <tbody>
      {/* <tr> <td>Alfreds Futterkiste</td> <td>Maria Anders</td> <td>Germany</td> </tr> */ }
      { prds && prds.map( prd => <PredictionTableRow prediction={ prd } vip={ vip } key={ prd._id } /> ) }
    </tbody>
  </table>
}

export default PredictionsTable
