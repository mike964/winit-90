import React, { useState } from 'react'
import Logo from '../../components-common/Logo'
import { Spinner } from 'react-bootstrap'
import moment from 'moment'

const PredictionTableRow = ( { prediction, vip } ) => {
  // console.log( vip )
  // console.log( prediction )

  const { match, answerKey, goalDifference, correct, correctGD, points } = prediction
  const { team1, team2, league, date, finished, resultKey, result } = match

  let resultt = resultKey ? ( result.score ? result.score : '-' ) : 'x'


  const match_isToday = ( ( moment( date ).format( 'YYYY-MM-DD' ) === moment().format( 'YYYY-MM-DD' ) ) ? true : false )

  const team1_acronym = team1.shortName.substring( 0, 3 ).toUpperCase()
  const team2_acronym = team2.shortName.substring( 0, 3 ).toUpperCase()


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
      txt = ( vip ? `${ team1.name } Win` : `${ team1.name } Win (GD: ${ gd })` )
    }
    if ( answerKey === 2 ) {
      txt = ( vip ? `${ team2.name } Win` : `${ team2.name } Win (GD: ${ gd })` )
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
    { prediction && <tr>
      <td className="text-center">
        <Logo name={ league.id } lig size={ 25 } />
      </td>
      <td>
        <div className="row">
          <div className="col text-right">
            { team1_acronym } { ' ' }
            <Logo name={ team1.shortName } country={ team1.country } size='25' />
          </div>
          <div className="col text-center">
            { resultt }
          </div>
          <div className="col text-left">
            <Logo name={ team2.shortName } country={ team2.country } size='25' /> { ' ' }
            { team2_acronym }
          </div>
        </div>
      </td>

      {/* Display Match Date */ }
      <td className="text-center">
        { match_isToday ? 'Today' : moment( date ).format( 'YYYY-MM-DD' ) }
      </td>

      {/* Display Match Time */ }
      <td className="text-center" width="100">
        { moment( date ).format( 'h:mm A' ) }
      </td>

      {/* Display my prediction */ }
      <td className='x' width="200" >
        <GetPrdText />
      </td>

      <td className={ `${ trClassName() } center bold` } width="80" >
        { !resultKey
          ? <Spinner animation="grow" variant="warning" size="sm" />
          : ( vip ? <>${ prediction.possibleWinning }</> : points ) }
      </td>

      {/* <td className={ trClassName() }><i "fas fa-times-circle white" /></td> */ }


    </tr> }
  </>
}

export default PredictionTableRow







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
