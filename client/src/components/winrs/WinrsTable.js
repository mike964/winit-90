import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import Tooltipp from '../../components-common/Tooltipp'

const WinrsTable = ( { winners, loading } ) => {


  const { currentUser } = useSelector( state => state.auth )

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

  const getStarredEmail = ( email ) => {
    // In order to diplay in table  
    let arr = email.split( "@" );
    let part_1 = arr[ 0 ]
    let part_2 = arr[ 1 ]
    let part_1_short = part_1.slice( 0, 5 )
    return `${ part_1_short }****@${ part_2 }`
  }

  const WinrBadge = ( { position } ) => {
    let bgcolor = position === 1 ? 'gold' : ( position === 2 ? 'e6e6e6' : 'bronze' )
    let frontcolor = position === 1 ? 'gold' : ( position === 2 ? '#808080' : '#cd7f32' )

    return <img className='winr-badge' src={ `api/vectors/badge-${ position }.png` } />
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
        let starred_email = getStarredEmail( email )
        let current_user = winr.ide === currentUser.ide ? true : false
        let top_three = position >= 1 && position <= 3  // 1,2,3

        return <tr className={ current_user ? 'bold' : '' }
          key={ index }
          id={ current_user ? "me" : "" }
          style={ { background: current_user ? '#95ff9b' : '' } }
        >
          <td className={ 'text-center bold p-0' } width="60">
            { top_three ? <WinrBadge position={ position } /> : position }
          </td>
          {/* <td>  { name } </td> */ }
          <td>
            <div className="row center">
              <div className="col ">{ starred_email }</div>
              <div className="col-auto">  { current_user ? name : '' }  </div>

            </div>
          </td>
          {/* <td className='text-center bold' width="50">
            { nPredictions }
          </td> */}
          {/* <td> { winner.nCorrectPredictions } </td> */ }
          <td className='text-center bold'>
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