import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Spinner from 'react-bootstrap/Spinner'

const MatchState = ( { match } ) => {
  const { dateEpoch, date } = match

  const nowEpoch = useSelector( state => state.clock.currentTimeUnix )
  // console.log( nowEpoch )   // Good  


  const [ matchStarted, st_matchStarted ] = useState( false )
  const [ matchFinished, st_matchFinished ] = useState( match.finished ? true : false )
  const [ predictionTimeFinished, st_predictionTimeFinished ] = useState( false )


  useEffect( () => {
    // ** Get What to Display **
    if ( nowEpoch < dateEpoch ) {
      // match not started yet - match will start in 3h - display prediction box 
    }
    if ( nowEpoch >= dateEpoch && nowEpoch < dateEpoch + 2000 ) {
      // match Started - prediction time not finished yet
      // display predictionBox 
      st_matchStarted( true )
    }
    if ( nowEpoch >= dateEpoch + 2000 ) {
      // prediction time finished - but match is going on 
      st_matchStarted( true )
      st_predictionTimeFinished( true )
    }
    if ( nowEpoch >= dateEpoch + 7000 ) {
      // match finished - prediction time finished 
      st_matchFinished( true )
    }


    // console.log( 'fukkkk' )
    // console.log( moment().format( 'YYYY-MM-DD' ) )
    // console.log( moment( date ).format( 'YYYY-MM-DD' ) )
  }, [ nowEpoch ] )


  // =================================================================================================
  return <>


    {/* { !matchStarted && <>
      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" variant="warning" />
      { ' ' } <span> Will start: { moment( dateEpoch * 1000 ).fromNow() }</span>
    </> } */}

    <span>.</span>

    { matchStarted && !predictionTimeFinished && <>
      <div className="text-center">
        <Spinner as="span" animation="grow" variant="success" size="sm" /> { ' ' }
        <span className="align-middle"> Match started </span>
      </div>
    </> }

    { !matchFinished && predictionTimeFinished &&
      <span> Prediction time finished! </span> }



    { matchFinished && <span> Match finished!</span> }

    {/* { ( !predictionTimeFinished && !matchFinished ) && <PredictionBox match={ match } /> } */ }
  </>
}

export default MatchState
