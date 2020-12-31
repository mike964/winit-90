import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setSelectedKarname } from '../redux/actions/week-karname.actions'


// Week and year selectore
const WeekSelector = () => {

  const { weeks, thisWeek, nextWeek } = useSelector( state => state.week )

  const [ selectedItem, setSelectedItem ] = useState( {} )           // In order to display
  const [ selectedItemIndex, setSelectedItemIndex ] = useState( 0 )  // selected week index
  const [ currentWeekIndex, setCurrentWeekIndex ] = useState( '' )   // this week index in Store
  const [ nextWeekIndex, setNextWeekIndex ] = useState( '' )         // this week index in Store


  useEffect( () => {
    if ( weeks && thisWeek && nextWeek ) {
      // setSelectedWeek( weeks.filter( week => week.startUnix === thisWeek.startUnix )[ 0 ] )

      // *** Get the index of first element in array that meet the condition
      // index of this week inside redux store week.weeks array 
      let current_week_indx = weeks.findIndex( week => week.startUnix === thisWeek.startUnix )
      setSelectedItemIndex( current_week_indx ) // select current week by default
      setCurrentWeekIndex( current_week_indx )
      setNextWeekIndex( weeks.findIndex( week => week.startUnix === nextWeek.startUnix ) )
      setSelectedItem( weeks[ current_week_indx ] )   // Set selected week
    }
  }, [ weeks, thisWeek, nextWeek ] )


  const counter = ( x ) => {
    // Loop through index of items
    let new_indx = selectedItemIndex + x
    setSelectedItemIndex( new_indx )
    setSelectedItem( weeks[ new_indx ] )

    // ** Connect to Redux
    // setCurrentKarname( weeks[ new_indx ]._id )
    setSelectedKarname( weeks[ new_indx ]._id )
  }


  const handleCaretClick = ( x ) => {
    if ( x === 1 && selectedItemIndex === nextWeekIndex ) {
      // Do nothing - Prevent counter to reach future weeks
      // minimum: unlimited - maximum nextweek
    } else {
      counter( x )
    }
  }


  //================================================================================
  return <div className="week-selector">
    <div className="left text-center clickable" onClick={ () => handleCaretClick( -1 ) } >
      <i className="fas fa-caret-left" />
    </div>

    <div className="center text-center w-100">
      { selectedItem && <>
        <span> Week { selectedItem.number } { ' ' } of { ' ' } { selectedItem.year }</span>
      </> }
    </div>

    <div className="right text-center" onClick={ () => handleCaretClick( +1 ) } >
      <i className="fas fa-caret-right" />
    </div>
  </div>

}

export default WeekSelector