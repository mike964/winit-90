import React, { useState, useEffect } from 'react'
import TopUsersTable from '../components/TopUsersTable'
import { useSelector } from 'react-redux'
import { getWeekWinners, stWinnersSelectedWeek } from '../redux/actions/winners.actions'
import WinnersTable from '../components/winrs/WinrsTable'
import WeekSelector from '../components/winrs/WinrWeekSelector'

const WinrsPg = () => {
  const lastWeekNumber = useSelector( state => parseInt( state.week.lastWeek.number ) )
  const { winners } = useSelector( state => state.wnr )
  // const winnersLoading = useSelector( state => state.wnr.loading )
  // const { selectedWeek } = useSelector( state => state.wnr )



  // console.log( winners )
  // const [ visibleWinners, setvisibleWinners ] = useState( '' )  // array

  console.log( 'lastWeekNumber: ' + lastWeekNumber )   // Good 


  useEffect( () => {
    // When pages mount, get winners of last week 
    if ( lastWeekNumber ) {
      getWeekWinners( lastWeekNumber )
      stWinnersSelectedWeek( lastWeekNumber )
    }
  }, [ lastWeekNumber ] )


  // useEffect( () => {
  // console.log( 'selectedWeek: ' + selectedWeek )
  // }, [ selectedWeek ] )

  //=============================================
  return <div className="page pt-5">

    {/* <div className="center py-3">
      <h5>
        <i className='fas fa-trophy gold' />
        { ' ' }  فائزون الاسبوع الماضي    
      </h5>
    </div> */}

    <div className="winners-table-box">
      <div className="text-center mb-2">
        <WeekSelector />
      </div>

      <div className="winners-table-container">
        { winners && <WinnersTable winners={ winners } /> }
      </div>

    </div>
  </div>
}

export default WinrsPg