import React, { useEffect, useState } from 'react'
import { toggleAllLigs, stClickedLig, hideFinishedMatches } from '../../redux/actions/global.actions';
import { useSelector } from 'react-redux';
import Switch from '../../components-common/Switch';
import { loadPredictions, resetPredictions } from '../../redux/actions/prediction.actions';
import RefreshBtn from '../RefreshBtn';
import { getMatches_DB, setMatchesLoading, setMatchesRedux } from '../../redux/actions/match.actions';
import { Button } from 'react-bootstrap';

const MatchBar = ( { matchesCount } ) => {


  // Hide finished matches switch 
  let { expandAllLigs, hideFinished } = useSelector( state => state.global )



  const HandleRefreshClick = () => {
    // Load prediction of this week and next week of current user to Redux
    // loadPredictions()  // @fix needed: only if user logged in 
    setMatchesLoading( true )     // ** First set matches loading true
    setMatchesRedux( [] )         // ** Then set matches to none in redux store
    getMatches_DB()
    stClickedLig( 'All' )
  }

  const pillBtn = {
    borderRadius: '2rem',
    border: ' 1px solid white',
    color: 'white',
    padding: '4px 10px',
    background: 'none',
    cursor: 'pointer'
  }

  ////////////////////////////////////////////////////////////////////////////////////
  // =================================================================================
  return <div className="match-bar mb-2 mx-auto" style={ { maxWidth: '640px' } }>

    <div className="row row-1 py-2 py-sm-3 mb-2 white">

      {/* SM */ }
      <div className="d-none d-sm-block col-auto p-3 py-sm-0">
        <span className="x">المجموع : { matchesCount }</span>
      </div>

      <div className="col-12 col-sm center p-3 py-sm-0">
        <Switch
          label='اخفي المباریات المنتهیة'
          //onClick={ () => setFilter( 'notFinished' ) }
          onClick={ () => hideFinishedMatches( !hideFinished ) }
          checked={ hideFinished }
        />
      </div>

      <div className="col-4 col-sm-auto px-2 center ">
        <span style={ pillBtn }
          onClick={ () => toggleAllLigs() }
        >{ expandAllLigs ? 'Collapse All' : 'Expand All' }</span>
      </div>



      <div className="col-4 col-sm-auto px-2 center"  >
        <RefreshBtn
          onclick={ HandleRefreshClick } style={ pillBtn }
        />
      </div>

      {/* XS */ }
      <div className="col center d-sm-none  ">
        <span className="x">المجموع : { matchesCount }</span>
      </div>

    </div>


  </div>
}

export default MatchBar
