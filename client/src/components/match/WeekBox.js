import React, { useEffect, useState } from 'react'
import { setClickedWeek, stClickedLig, hideFinishedMatches } from '../../redux/actions/global.actions';
import { useSelector } from 'react-redux';
import { loadPredictions, resetPredictions } from '../../redux/actions/prediction.actions';




const WeekBox = () => {

  const { selectedWeek } = useSelector( state => state.global )

  const handleWeekSelect = ( week ) => {  // [ thisWeek - nextWeek ]
    resetPredictions()
    setClickedWeek( week )
  }


  return <div className="week-selectorr text-center mb-2">
    <div
      className={ selectedWeek === 'nextWeek' ? "item__selected" : "item" }
      onClick={ () => handleWeekSelect( 'nextWeek' ) }
    > الاسبوع القادم
    </div>
    <div
      className={ selectedWeek === 'thisWeek' ? "item__selected" : "item" }
      onClick={ () => handleWeekSelect( 'thisWeek' ) }
    > هذا الاسبوع
    </div>
  </div>
}

export default WeekBox
