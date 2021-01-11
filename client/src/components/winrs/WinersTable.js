import React, { useState, useEffect } from 'react'
import WinrsTR from './WinrsTR'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import Tooltipp from '../../components-common/Tooltipp'

const WinersTable = ( {
  winners, loading
} ) => {

  useEffect( () => {

    // setvisibleWinners( '' )
    // setvisibleWinners( winners )
  }, [ winners ] )


  const TableSpiner = () => <tr>
    <th colSpan="5" className="text-center bg-white p-3">
      <Spinner animation="border" variant="warning" />
    </th>
  </tr>

  //==============================================================
  return <table id="winners-table" >
    <thead >
      <tr className="em-11 fw-600">
        <th>
          <Tooltipp place='right' text='Pos.' hoverText='المرکز' />
        </th>
        <th>
          <Tooltipp place='right' text='Name' hoverText='الاسم' />
        </th>
        <th>
          <Tooltipp place='right' text='Total' hoverText='مجموع التوقعات' />
        </th>
        <th>
          <Tooltipp place='right' text='Pts' hoverText='Points / النقاط' />
        </th>
        <th>
          <Tooltipp place='right' text='Prize' hoverText='الجائزة' />
        </th>
      </tr>
    </thead>

    <tbody>
      { !loading && winners
        && winners.map( ( wnr, index ) => <WinrsTR winner={ wnr } key={ index } /> ) }
      { loading ? <TableSpiner /> : <></> }
    </tbody>
  </table>
}

export default WinersTable 