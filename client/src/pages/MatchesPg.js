import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import MatchList from '../components/match/MatchList'
import MatchBar from '../components/match/MatchBar';
import SubmitAllBtnBox from '../components/match/SubmitAllBtnBox';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { getMatches_DB } from '../redux/actions/match.actions';
import InstructionsCollapse from '../components/InstructionsCollapse';
//=================================================================================================
const MatchesPg = () => {

  // const filters = useSelector( state => state.filters )
  const { selectedWeek } = useSelector( state => state.global )
  const { matches, loading: matchesLoading } = useSelector( state => state.match )
  // const thisWeekId = useSelector( state => state.week.thisWeek._id )
  // const nextWeekId = useSelector( state => state.week.nextWeek._id )
  const { thisWeek, nextWeek } = useSelector( state => state.week )

  console.log( thisWeek )


  const [ thisWeekMatches, setThisWeekMatches ] = useState( [] )
  const [ nextWeekMatches, setNextWeekMatches ] = useState( [] )
  const [ showSpinner, setShowSpinner ] = useState( true )

  useEffect( () => {
    if ( !matches || matches.length === 0 ) {
      // Reload matches
      getMatches_DB()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

  useEffect( () => {
    // setShowSpinner( true )
    if ( matches && thisWeek && nextWeek ) {
      // setThisWeekMatches( matches.filter( mch => mch.week._id === thisWeekId ) )
      // setNextWeekMatches( matches.filter( mch => mch.week._id === nextWeekId ) )
      // setNextWeekMatches( matches.filter( mch => mch.timestamp >= this_week_start_unix) )
      setThisWeekMatches( matches.filter( mch => mch.timestamp >= thisWeek.startUnix && mch.timestamp <= thisWeek.endUnix ) )
      setNextWeekMatches( matches.filter( mch => mch.timestamp >= nextWeek.startUnix && mch.timestamp <= nextWeek.endUnix ) )
    }
    // FIX NEEDS HERE !!!!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ matches, thisWeek, nextWeek ] )




  //===================================================================================
  //===================================================================================
  return <div className="page">
    <div className="container px-2 pb-2 bg-shadow-6">



      <MatchBar matchesCount={ selectedWeek === 'thisWeek' ? thisWeekMatches.length : nextWeekMatches.length } />


      <div className="mb-2 mx-auto" style={ { maxWidth: '640px' } }>
        <InstructionsCollapse />
      </div>


      { matchesLoading ? <div className="text-center p-5">
        <Spinner animation="border" variant="warning" />
      </div>
        : <>
          <MatchList matches={ selectedWeek === 'thisWeek' ? thisWeekMatches : nextWeekMatches } />
        </> }
    </div>
    { !matchesLoading && <div className="container p-0 bg-shadow-8">
      {/* Submit All Predictions Btn */ }
      <div className="center bg-shadow-6">
        <SubmitAllBtnBox />
      </div>
    </div> }

  </div>

}

export default MatchesPg
