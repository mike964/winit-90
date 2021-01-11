import React, { useState, useEffect } from 'react'
import TopUsersTable from '../components/TopUsersTable'
import { useSelector } from 'react-redux'
import { getWeekWinners, stWinnersSelectedWeek } from '../redux/actions/winrs.actions'
import WinersTable from '../components/winrs/WinersTable'
import WeekSelector from '../components/WeekSelector'

const WinrsPg = () => {
  // const lastWeekNumber = useSelector( state => parseInt( state.week.lastWeek.number ) )
  // const { winners } = useSelector( state => state.wnr )   // Not used anymore
  const { loading: winersLoading } = useSelector( state => state.wnr )
  const { winners } = useSelector( state => state.wnr )

  const getWinersOfWeekId = async () => {
    // const response = await axios.get( `/api/weeks/2020/${ weekNumb }` )
  }

  // const winners = []

  // console.log( winners )
  // const [ visibleWinners, setvisibleWinners ] = useState( '' )  // array


  // useEffect( () => {
  //   // When pages mount, get winners of last week 
  //   if ( lastWeekNumber ) {
  //     // getWeekWinners( lastWeekNumber )   // Not used Anymore
  //     getWinersOfWeekId()
  //     stWinnersSelectedWeek( lastWeekNumber )
  //   }
  // }, [ lastWeekNumber ] )


  // useEffect( () => {
  // console.log( 'selectedWeek: ' + selectedWeek )
  // }, [ selectedWeek ] )

  const handleWeekSelect = ( x ) => {
    console.log( '---- handleWeekSelect() ----' )
    console.log( x )

    getWeekWinners( x )
  }

  //=============================================
  return <div className="page pt-5">

    <div className="center py-3 white">
      <h5>
        <i className='fas fa-trophy' /> { ' ' } الفائزون
      </h5>
    </div>

    <div className="winners-table-box">
      <div className="row mb-2">
        <div className="col"></div>
        <div className="col">
          <WeekSelector onchange={ handleWeekSelect } />
        </div>
        <div className="col"></div>
      </div>

      <div className="winners-table-container">
        { winners && <WinersTable winners={ winners } loading={ winersLoading } /> }
      </div>

    </div>
  </div>
}

export default WinrsPg
