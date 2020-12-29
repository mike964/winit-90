import React, { useState } from 'react'
import moment from 'moment'

const ViprdItem = ( { prd, index } ) => {
  const { match, user } = prd
  const { odds } = match


  const [ showScndRow, setshowScndRow ] = useState( false )



  return <>
    <tr className="x" onClick={ () => setshowScndRow( !showScndRow ) } >
      <td>
        { index + 1 }
      </td>
      <td>
        { prd._id }
      </td>
      <td>
        { user.username }
      </td>
      <td>
        { match.title }  <span className="fr"> { moment( match.date ).format( "MM-DD" ) }</span>
      </td>
      <td>
        { prd.stake }
      </td>
      <td>
        { prd.possibleWinning }
      </td>
      <td>
        { prd.correct === null ? '-' : ( prd.correct === true ? <span>&#10004;</span> : 'F' ) }
      </td>
      <td>
        { prd.gotPaid ? <span>&#10004;</span> : '-' }
      </td>
    </tr>

    { showScndRow && <tr className='x' >
      <td colSpan="12" className="scnd-row bg-bbb">
        <div className="x m-auto row text-l bg-white">

          <div className="col striped border-right">
            <div className="row">
              <div className="col-2 p-2  bold"> User </div>
              <div className="col p-2"> { user.username } </div>
              <div className="col p-2"> { user._id } </div>
            </div>
            <div className="row">
              <div className="col-2 p-2  bold"> IDE </div>
              <div className="col p-2"> { user.ide } </div>
              <div className="col p-2 bold"> Balance  ${ user.balance } </div>
            </div>
            <div className="row">
              <div className="col-2 p-2  bold"> Email </div>
              <div className="col p-2"> { user.email } </div>
            </div>
          </div>

          <div className="col striped">
            <div className="row">
              <div className="col p-2  bold"> Match </div>
              <div className="col p-2">{ match.title }</div>
              <div className="col p-2"> { match._id } </div>
            </div>
            <div className="row">
              <div className="col-4 p-2">
                <span className="bold pr-3"> Odds: </span>
                <span className="x"> [ { odds.team1 } -  { odds.draw } -  { odds.team2 }]</span>
              </div>
              <div className="col p-2">
                <span className="bold pr-3">Date:</span>
                <span className="x"> { moment( match.date ).format( 'YYYY-MM-Do , H:mm' ) }</span>
              </div>
            </div>
            <div className="row">
              <div className="col p-2 bold"> Result key:  { match.resultKey } </div>
              <div className="col p-2 bold"> Answer key: { prd.answerKey } </div>
              <div className="col p-2  bold"> Finisehed:  { match.finished ? 'T' : 'F' } </div>
            </div>
          </div>

        </div>

      </td>
    </tr> }

  </>

}

export default ViprdItem
