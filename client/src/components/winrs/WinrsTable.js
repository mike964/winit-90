import React, { useState, useEffect } from 'react'
import WinrsTR from './WinrsTR'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import Tooltipp from '../../components-common/Tooltipp'

const WinnersTable = ( {
  winners
} ) => {

  const [ loading, stloading ] = useState( false )

  useEffect( () => {

    if ( winners && winners.length > 0 ) {
      stloading( true )

      setTimeout( () => {
        // stwinnerss( winners )
        stloading( false )
      }, 500 )
    }
    // setvisibleWinners( '' )
    // setvisibleWinners( winners )
  }, [ winners ] )

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
        ? winners.map( ( wnr, index ) => <WinrsTR winner={ wnr } key={ index } /> )
        : ( loading
          ? <tr>
            <th colSpan="5" className="text-center bg-white p-3">
              <Spinner animation="border" variant="warning" />
            </th>
          </tr>
          : <></> ) }
    </tbody>
  </table>
}

export default WinnersTable 