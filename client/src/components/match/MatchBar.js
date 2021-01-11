import React, { useEffect, useState } from 'react'
import { setClickedWeek, stClickedLig, hideFinishedMatches } from '../../redux/actions/global.actions';
import { useSelector } from 'react-redux';
import Switch from '../../components-common/Switch';
import { setFilter } from '../../redux/actions/filter.actions';
import { loadPredictions, resetPredictions } from '../../redux/actions/prediction.actions';
import RefreshBtn from '../RefreshBtn';
import { getMatches_DB, setMatchesLoading, setMatchesRedux } from '../../redux/actions/match.actions';
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



  const HandleRefreshClick = () => {
    // Load prediction of this week and next week of current user to Redux
    // loadPredictions()  // @fix needed: only if user logged in 
    setMatchesLoading( true )     // ** First set matches loading true
    setMatchesRedux( [] )         // ** Then set matches to none in redux store
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

      <div className="col-16 col-sm-4 center">
        <span className="x">مجموع المباریات : { matchesCount }</span>
        <span className="d-sm-none fr">
          <RefreshBtn onclick={ HandleRefreshClick } className='white' />
        </span>
      </div>

      <div className="col-12 col-sm-4 text-center">
        <Switch
          label='اخفي المباریات المنتهیة'
          //onClick={ () => setFilter( 'notFinished' ) }
          onClick={ () => hideFinishedMatches( !hideFinished ) }
          checked={ hideFinished }
        />
      </div>

      <div className="d-none d-sm-block col-sm-4 center">
        <RefreshBtn onclick={ HandleRefreshClick } className='white' />
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
