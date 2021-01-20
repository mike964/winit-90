import React, { useState } from 'react'
import Logo from '../../components-common/Logo'
import { Spinner } from 'react-bootstrap'
import moment from 'moment'

const PredictionTR = ( { prediction, vip } ) => {
  // console.log( vip )
  // console.log( prediction )

  // const { match, answerKey, goalDifference, correct, correctGD, points } = prediction
  const { match, answerKey, goalDifference, correct, correctGD, points } = prediction
  // const { match, answerKey, goalDifference, correct, correctGD, points } = prediction
  // const { league, date, finished, resultKey, result } = match

  let date = match ? match.date : 'x'
  let league = match ? match.league : 'x'
  // let team1 = match ? ( match.team1.name === 'null' ? match.team_home : match.team1 ) : { name: 'null' }
  let team1 = match ? ( match.team1.shortName ? match.team1 : match.team_home ) : { name: '-' }
  let team2 = match ? ( match.team2.shortName ? match.team2 : match.team_away ) : { name: '-' }
  // let team1 = match  { name: 'team-x' }   // FOR TEST
  // let team2 = { name: 'team-y' }   // FOR TEST




  // Do destrucre of destructore





  let resultt = match ? ( match.resultKey ? ( match.result.score ? match.result.score : '-' ) : 'x' ) : 'null'


  const matchIsToday = ( ( moment( date ).format( 'YYYY-MM-DD' ) === moment().format( 'YYYY-MM-DD' ) ) ? true : false )

  // ** Teams 3 letter acronym names
  const team1_acr_3 = team1.shortName ? team1.shortName.substring( 0, 3 ).toUpperCase()
    : team1.name.substring( 0, 3 ).toUpperCase()
  const team2_acr_3 = team2.shortName ? team2.shortName.substring( 0, 3 ).toUpperCase()
    : team2.name.substring( 0, 3 ).toUpperCase()


  const trClassName = () => {
    if ( correctGD === true )
      return 'bg-gold black'
    if ( correct === true && correctGD === false )
      // return 'bg-success white'
      return 'bg-green white'
    if ( correct === false )
      // return 'bg-danger white'
      return 'bg-lred white'

    // return 'x'
  }

  // const getPrdText = ( answerKey, gd, team1_name, team2_name, correct ) => {
  const GetPrdText = () => {
    // console.log( answerKey, team1_name, team2_name, correct )

    let gd = goalDifference
    let txt
    let icon
    let color

    if ( answerKey === 1 ) {
      txt = ( vip ? `${ team1.name } Win` : `${ team1.name } Win (${ gd })` )
    }
    if ( answerKey === 2 ) {
      txt = ( vip ? `${ team2.name } Win` : `${ team2.name } Win (${ gd })` )
    }
    if ( answerKey === 3 ) {
      txt = 'Draw'
    }
    if ( correct === true ) {
      icon = 'check'
      color = 'green'
    } else if ( correct === false ) {
      icon = 'times'
      color = 'red'
    }

    return <span className='x'>
      <i className={ `fas fa-${ icon } ${ color } float-right` } /> { ' ' }{ txt }
    </span>
  }

  //========================================================================================
  //========================================================================================
  return <>
    { prediction && match && <tr>

      <td className="d-none d-sm-table-cell text-center">
        <Logo src={ `/api/logos/_ligs/${ league.id }.png` } size='20' />
      </td>

      <td>
        <div className="row">
          <div className="col text-right">
            <span className="d-md-none">   { team1_acr_3 }</span>
            <span className="d-none d-md-inline-block"> { team1.name.substring( 0, 9 ) }</span>
            { ' ' }
            <Logo src={ team1.shortName ? `/api/logos/${ team1.country }/${ team1.shortName }.png` : team1.logo } size='25px' />
          </div>
          <div className="col-3 text-center">
            { resultt }
          </div>
          <div className="col text-left">
            <Logo src={ team2.shortName ? `/api/logos/${ team2.country }/${ team2.shortName }.png` : team2.logo } size='25px' /> { ' ' }
            <span className="d-md-none">   { team2_acr_3 }</span>
            <span className="d-none d-md-inline-block"> { team2.name.substring( 0, 9 ) }</span>
          </div>
        </div>

        {/* XS SCREEN */ }
        <div className="center d-sm-none">
          { matchIsToday ? 'Today' : moment( date ).format( 'YYYY-MM-DD   h:mm A' ) }
        </div>
      </td>

      {/* Display Match Date */ }
      <td className="text-center d-none d-sm-table-cell">
        <div className="ib w-50">
          { matchIsToday ? 'Today' : moment( date ).format( 'YYYY-MM-DD' ) }
        </div>
        <div className="ib w-50">
          { moment( date ).format( 'h:mm A' ) }
        </div>
      </td>

      {/* Display my prediction */ }
      <td >
        <GetPrdText />
      </td>

      <td className={ `${ trClassName() } center bold` } >
        { !match.resultKey
          ? <Spinner animation="grow" variant="warning" size="sm" />
          : ( vip ? <>${ prediction.possibleWinning }</> : points ) }
      </td>

      {/* <td className={ trClassName() }><i "fas fa-times-circle white" /></td> */ }


    </tr> }
  </>
}

export default PredictionTR







// prediction = { 
// _id "5f53e0b14535bc50c4d29963"
// answerKey  2
// correct
// null
// correctGD
// false
// correct
// true
// createdAt
// "2020-09-05T19:02:09.300Z"
// goalDifference
// 1
// karname
// "5f516e8ccd3ca0460ce63f31"

// match
// {__v: 0, _id: "5f53cd934535bc50c4d298fa", date: "20…}
// points
// 0
// user
// "5ef528dcd5d94e11b8db2623"

// week
// {_id: "5ef7b5667a1ede43c8bde471", number: "36", yea…}
// willEndInPenalties
// false
// winner
// null
// year
// "2020"
// vip}
