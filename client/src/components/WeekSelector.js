import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


// Week and year selectore
const WeekSelector = ( {
  onchange,    // function
  max,         // maximum week ['lastWeek', 'thisWeek' , 'nextWeek']
  defaultWeek   // default selected
} ) => {

  const { weeks, thisWeek, nextWeek, lastWeek } = useSelector( state => state.week )

  const [ selectedWeek, setSelectedWeek ] = useState( '' )             // {...week}
  const [ selectedWeekIndex, setSelectedWeekIndex ] = useState( '' )   // selected week index
  const [ lastWeekIndex, setLastWeekIndex ] = useState( '' )
  // const [ thisWeekIndex, setThisWeekIndex ] = useState( '' )
  // const [ nextWeekIndex, setNextWeekIndex ] = useState( '' )
  const [ maxIndex, setMaxIndex ] = useState( '' )   // maximum week index : to prevent goint far


  useEffect( () => {
    if ( weeks && lastWeek && thisWeek && nextWeek ) {
      // setSelectedWeek( weeks.filter( week => week.startUnix === thisWeek.startUnix )[ 0 ] )
      // *** Get the index of first element in array that meet the condition
      // index of this week inside redux store week.weeks array 

      let lastWeekIndex = weeks.findIndex( week => week.startUnix === lastWeek.startUnix )
      let thisWeekIndex = lastWeekIndex + 1
      let nextWeekIndex = lastWeekIndex + 2
      setLastWeekIndex( lastWeekIndex )

      // setSelectedWeek( lastWeek )
      // setSelectedWeekIndex( lastWeekIndex )
      // setThisWeekIndex( lastWeekIndex + 1 )
      // setNextWeekIndex( lastWeekIndex + 2 )

      // ** Set default Selected Week 
      if ( defaultWeek === 'lastWeek' ) {
        setSelectedWeek( lastWeek )
        setSelectedWeekIndex( lastWeekIndex )
      } else if ( defaultWeek === 'thisWeek' ) {
        setSelectedWeek( thisWeek )
        setSelectedWeekIndex( thisWeekIndex )
      } else if ( defaultWeek === 'nextWeek' ) {
        setSelectedWeek( nextWeek )
        setSelectedWeekIndex( nextWeekIndex )
      }

      // ** Define maximum week index
      if ( max === 'lastWeek' ) {
        setMaxIndex( lastWeekIndex )
      } else if ( max === 'thisWeek' ) {
        setMaxIndex( lastWeekIndex + 1 )
      } else if ( max === 'nextWeek' ) {
        setMaxIndex( lastWeekIndex + 2 )
      }

    }
  }, [ weeks, lastWeek, thisWeek, nextWeek ] )




  const handleCaretClick = ( x ) => {   // x : +1 , -1
    if ( x === 1 && selectedWeekIndex >= maxIndex ) {
      // Do nothing - Prevent counter to reach future weeks
      // minimum: unlimited - maximum nextweek
    } else {
      // Loop through index of items
      let new_index = selectedWeekIndex + x
      setSelectedWeekIndex( new_index )
      setSelectedWeek( weeks[ new_index ] )

      // ** Connect to Redux
      // setCurrentKarname( weeks[ new_index ]._id )
      // setSelectedKarname_forPrds( weeks[ new_index ]._id )

      onchange( weeks[ new_index ]._id )
    }
  }


  //================================================================================
  return <div className="week-selector">
    <div className="left text-center clickable" onClick={ () => handleCaretClick( -1 ) } >
      <i className="fas fa-caret-left" />
    </div>

    <div className="center text-center w-100">
      { selectedWeek && <span>
        Week { selectedWeek.number } { ' ' } of { ' ' } { selectedWeek.year }
      </span> }
    </div>

    <div className="right text-center" onClick={ () => handleCaretClick( +1 ) } >
      <i className="fas fa-caret-right" />
    </div>
  </div>

}

export default WeekSelector


/*

<WeekSelector
  startingWeek : [thisWeek , lastWeek]
  maxWeek :[thisWeek , lastWeek , nextWeek]
onchange :
>

*/