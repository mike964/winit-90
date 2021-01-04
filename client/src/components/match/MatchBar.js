import React, { useEffect, useState } from 'react'
import { setClickedWeek, stClickedLig, hideFinishedMatches } from '../../redux/actions/global.actions';
import { useSelector } from 'react-redux';
import Switch from '../../components-common/Switch';
import { setFilter } from '../../redux/actions/filter.actions';
import { loadPredictions, resetPredictions } from '../../redux/actions/prediction.actions';
import RefreshBtn from '../RefreshBtn';
import { getMatches_DB } from '../../redux/actions/match.actions';
import LigSelector from './LigSelector';
import { Button } from 'react-bootstrap';

const MatchBar = ( { matchesCount } ) => {

  const { selectedWeek } = useSelector( state => state.global )
  // Hide finished matches switch 
  let { notFinished, hideFinished } = useSelector( state => state.global )


  // Toggle (hide) finished matches switch in 2 seconds after page mounts automatically
  useEffect( () => {
    // setTimeout( () =>  setFilter( 'notFinished' ), 2000 )
    // setTimeout( () => hideFinishedMatches( true ), 3000 )
  }, [] )



  const handleRefreshBtn = () => {
    // Load prediction of this week and next week of current user to Redux
    // loadPredictions()  // @fix needed: only if user logged in 
    getMatches_DB()
    stClickedLig( 'All' )
  }

  const handleWeekSelect = ( week ) => {  // [ thisWeek - nextWeek ]
    resetPredictions()
    setClickedWeek( week )
  }

  ////////////////////////////////////////////////////////////////////////////////////
  // =================================================================================
  return <div className="match-bar">


    <div className="row row-1 py-2 py-sm-3 mb-2 white">

      <div className="col-6 col-sm-3 center">
        <RefreshBtn onclick={ handleRefreshBtn } />
      </div>

      <div className="col-6 col-sm-4 center">
        مجموع المباریات : { matchesCount }
      </div>

      <div className="col col-sm-5 text-center">
        <Switch
          //label='Hide finished matches'
          label='اخفي المباریات المنتهیة'
          //onClick={ () => setFilter( 'notFinished' ) }
          onClick={ () => hideFinishedMatches( !hideFinished ) }
          //checked={ notFinished }
          checked={ hideFinished }
        />
      </div>

    </div>


    <div className="week-selectorr text-center mb-2">
      <div className={ selectedWeek === 'nextWeek' ? "item__selected" : "item" }
        onClick={ () => handleWeekSelect( 'nextWeek' ) }
      > الاسبوع القادم </div>
      <div className={ selectedWeek === 'thisWeek' ? "item__selected" : "item" }
        onClick={ () => handleWeekSelect( 'thisWeek' ) }
      > هذا الاسبوع </div>
    </div>

    <LigSelector />

    <div className="mb-3"></div>
  </div>
}

export default MatchBar
