import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import KarnamesModal from '../karname/KarnamesModal'

const WeekTR = ( { week } ) => {


  const { year, number, start, end, startEpoch } = week

  const thisWeekId = useSelector( state => state.week.thisWeek._id )
  // console.log( 'thisWeekId' )
  // console.log( thisWeekId )

  const [ showKarnamesModal, setshowKarnamesModal ] = useState( false )






  return <tr className={ thisWeekId === week._id ? 'table-danger center' : 'center' }>
    <td>{ week._id }</td>
    <td className="x">{ year } - { number }</td>
    <td>{ start }</td>
    <td>{ startEpoch }</td>
    <td>{ end }</td>
    <td>
      <span className="green clickable ulineonhover px-2 "
        onClick={ () => setshowKarnamesModal( !showKarnamesModal ) }
      > karnames
        </span>
    </td>

    <KarnamesModal show={ showKarnamesModal }
      handleShow={ () => setshowKarnamesModal( !showKarnamesModal ) }
      week={ week }
    />
  </tr>
}

export default WeekTR
