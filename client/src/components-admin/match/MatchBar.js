import React from 'react'
import { getMatches } from '../../redux/actions/match.actions';

export const MatchBar = () => {


  const handleAllMatches = () => {
    getMatches( 'all' )
  }
  const handleThisWeek = () => {
    getMatches( 'thisWeek' )
  }
  const handleNextWeek = () => {
    getMatches( 'nextWeek' )
  }

  return <div className='matchbar row align-items-center'>
    <div className="col text-center"
      onClick={ handleAllMatches }>
      All Matches
      </div>
    <div className="col text-center">
      Last week
      </div>
    <div
      className="col text-center"
      onClick={ handleThisWeek }
    >
      This week
      </div>
    <div
      className="col text-center"
      onClick={ handleNextWeek }
    >
      Next week
      </div>
  </div>
}
