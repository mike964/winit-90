import React, { useState, useEffect } from 'react'
import TopUsersTable from '../components/TopUsersTable'
import { useSelector } from 'react-redux'
import { getWeekWinners, stWinnersSelectedWeek } from '../redux/actions/winners.actions'
import WinnersTable from '../components/winrs/WinrsTable'
import WinrWeekSelector from '../components/winrs/WinrWeekSelector'

const WinrsPg = () => {
  const lastWeekNumber = useSelector( state => parseInt( state.week.lastWeek.number ) )
  // const { winners } = useSelector( state => state.wnr )   // Not used anymore
  // const winnersLoading = useSelector( state => state.wnr.loading )
  // const { selectedWeek } = useSelector( state => state.wnr )

  const getWinersOfWeekId = async () => {
    // const response = await axios.get( `/api/weeks/2020/${ weekNumb }` )
  }

  const winners = []

  // console.log( winners )
  // const [ visibleWinners, setvisibleWinners ] = useState( '' )  // array

  console.log( 'lastWeekNumber: ' + lastWeekNumber )   // Good 


  useEffect( () => {
    // When pages mount, get winners of last week 
    if ( lastWeekNumber ) {
      // getWeekWinners( lastWeekNumber )   // Not used Anymore
      getWinersOfWeekId
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
        <WinrWeekSelector />
      </div>

      <div className="winners-table-container">
        { winners && <WinnersTable winners={ winners } /> }
      </div>

    </div>
  </div>
}

export default WinrsPg
