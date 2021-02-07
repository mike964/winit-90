import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import Tooltipp from '../../components-common/Tooltipp'

const WinrsTable = ( {
  winners, loading
} ) => {

  useEffect( () => {

    // setvisibleWinners( '' )
    // setvisibleWinners( winners )
  }, [ winners ] )


  const TableSpiner = () => <tr>
    <th colSpan="9" className="text-center bg-white p-5">
      <Spinner animation="border" variant="warning" />
    </th>
  </tr>

  const getBgColor = ( pos ) => {
    if ( pos === 1 ) return 'bg-gold'
    if ( pos === 2 ) return 'bg-silver'
    if ( pos === 3 ) return 'bg-bronze'
  }

  //==============================================================
  return <table id="winners-table" >
    <thead >
      <tr >
        <th>
          <Tooltipp place='right' text='Pos.' hoverText='المرکز' />
        </th>
        <th>
          <Tooltipp place='right' text='User' hoverText='المشترک' />
        </th>
        {/* <th>
          <Tooltipp place='right' text='Total' hoverText='مجموع التوقعات' />
        </th> */}
        <th>
          <Tooltipp place='right' text='Points' hoverText='النقاط' />
        </th>
        <th>
          <Tooltipp place='right' text='Prize' hoverText='الجائزة' />
        </th>
      </tr>
    </thead>

    <tbody>
      { winners && winners.map( ( winr, index ) => {
        // * Destructuring
        const { position, name, email, nPredictions, points, prize } = winr
        // const bgColorr = getBgColor( position )

        return <tr className='x' key={ index }>
          <td className={ 'text-center bold ' } width="60">
            { position }
          </td>
          {/* <td>  { name } </td> */ }
          <td>  { email } </td>
          {/* <td className='text-center bold' width="50">
            { nPredictions }
          </td> */}
          {/* <td> { winner.nCorrectPredictions } </td> */ }
          <td className='text-center bold' width="50">
            { points }
          </td>

          <td className={ 'text-center bold ' + getBgColor( position ) } width="120">
            { prize && prize > 0 ? `$${ prize }` : '-' }
          </td>
        </tr>
      }
      ) }
      { loading ? <TableSpiner /> : <></> }
    </tbody>
  </table>
}

export default WinrsTable



//    <tbody>
//      { !loading && winners && winners.map( ( wnr, index ) =>
//        <WinrsTR winner={ wnr } key={ index } />
///      ) }
//      { loading ? <TableSpiner /> : <></> }
//    </tbody>