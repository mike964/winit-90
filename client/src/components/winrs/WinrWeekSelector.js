import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import SpinnersBox from '../../components-common/SpinnersBox'

import { getWeekWinners, stWinnersSelectedWeek } from '../../redux/actions/winners.actions'


// winners page week selector
const WinrWeekSelector = () => {
  const lastWeekNumber = useSelector( state => parseInt( state.week.lastWeek.number ) )
  const { selectedWeek } = useSelector( state => state.wnr )

  const [ showSpinner, setshowSpinner ] = useState( true )

  const handleWeekSelect = ( x ) => {
    let selectedWeekNumber = lastWeekNumber - x
    stWinnersSelectedWeek( selectedWeekNumber )
    getWeekWinners( selectedWeekNumber )
  }

  let count = [ 7, 6, 5, 4, 3, 2, 1, 0 ]

  useEffect( () => {
    if ( lastWeekNumber ) {
      setTimeout( () => setshowSpinner( false ), 600 )
    }
  }, [ lastWeekNumber ] )


  //==================================================================================
  return <>
    {showSpinner
      ? <div className="p-1">
        <SpinnersBox />
      </div>
      : <div className="winners-week-selector my-1">
        <div className="header"> YEAR 2020 </div>

        { lastWeekNumber && <div className="d-flex bg-w justify-content-center">
          { count.map( i =>
            <div key={ i } className={ selectedWeek === ( lastWeekNumber - i ) ? 'item__selected' : 'item' }
              onClick={ () => handleWeekSelect( i ) }>
              { i === 0 ? `Last Week (${ lastWeekNumber })` : `Week ${ lastWeekNumber - i }` }
            </div> ) }
        </div> }

      </div> }
  </>




}
// WinrWeekSelector
export default WinrWeekSelector
