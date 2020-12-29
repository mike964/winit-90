import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Logo from '../../components-common/Logo'
import { Spinner } from 'react-bootstrap'

const MatchItemHeader = ( { match, matchFinished, matchStarted, vip } ) => {
  const { date, league, finished } = match
  // const { currentTimeUnix } = useSelector( state => state.clock )


  const getLigName = () => {
    let lig = {}
    if ( league.id === 140 ) {
      lig.name = 'La Liga'
      lig.shortName = 'laliga'
    } else if ( league.id === 39 ) {
      lig.name = 'Premier League'
      lig.shortName = 'prlig-white'
    } else {
      lig.name = league.name
      lig.shortName = league.id
    }

    return lig
  }

  let lig_ = getLigName()


  const matchIstoday = ( moment().format( 'YYYY-MM-DD' ) === moment( date ).format( 'YYYY-MM-DD' ) )


  const getClassName = () => {
    if ( vip ) {
      return "match-item-vip__header"
    } else {  // If NOT vip
      if ( league.id === 78 ) {
        return "match-item__header bg-red"
      } else if ( league.id === 140 ) {
        return "match-item__header bg-laliga"
      } else if ( league.id === 39 ) {
        return "match-item__header bg-prlig"
      } else if ( league.id === 61 ) {
        return "match-item__header bg-france"
      } else {
        return "match-item__header"
      }
    }



  }
  const classname = getClassName()
  /////////////////////////////////////////////////////////////////////////////////////////
  // =================================================================================
  return <div className={ classname }>
    <div className="row">
      <div className="col pl-2">
        <Logo
          size='20'
          src={ `/api/logos/_ligs/${ lig_.shortName }.png` }
        /> { ' ' }
        <span className="align-middle">{ lig_.name }</span>
      </div>

      {/* <div className="col text-center">  </div> */ }

      <div className="col-auto px-2 center capitalize">

        { matchFinished
          ? <span className="bold"> FT انتهت </span>
          : <>
            { matchStarted
              ? <span className='pill px-2 pb-2px bg-w red italic' >
                <Spinner animation="grow" size="sm" variant='danger' /> { ' ' } LIVE
                </span>
              : <>
                { matchIstoday
                  ? <span className="pill px-2  pb-2px bg-w red">
                    <Spinner animation="grow" size="sm" variant='danger' /> { ' ' } { moment( date ).calendar() }
                  </span>
                  : <span>{ moment( date ).format( 'YYYY-MM-DD' ) }</span> }
              </> }
          </> }
      </div>
    </div>

  </div>
}

export default MatchItemHeader



// <div className="col text-left">
  //        <Logo name={ league.shortName } lig={ true } size='20' /> { ' ' }
  //        <span className="align-middle">{ league.fullName }</span>
  //        {/* <span className="align-middle">{ description }</span> */ }
  //      </div>
  //      <div className="col-auto text-center">
 //         <span className="align-middle">
      //      { today ? moment( date ).calendar() : moment( date ).format( 'YYYY-MM-Do' ) }
    //      </span>

 //       </div>
 //     </div> */}

//  useEffect( () => {
//   // Check if match is today or not 
//   if ( match_isToday( date ) ) setToday( true )
//   if ( match_started( nowEpoch, dateEpoch ) ) st_matchStarted( true )
// }, [ nowEpoch ] )