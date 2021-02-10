import React, { useState } from 'react'
import moment from 'moment'
import { deleteMatch_DB, setCurrentMatch, } from '../../redux/actions/match.actions'
import EditMatchModal from './EditMatchModal'
import { useEffect } from 'react'
import PrdsModal from '../prd/PrdsModal'
import ScssFailSpinr from '../../components-common/ScssFailSpinr'
import { axos } from '../../utils'
import { topTeams } from '../../data'

// *** FOR Admin Table
const MatchTR = ( { match, index, expanded } ) => {
  // const { team1, team2, team_home, team_away, result, week } = match
  const { result, week } = match
  // const team1ShortName = ( match.team1_shortName ? match.team1_shortName : match.team1.shortName )
  // const team2ShortName = ( match.team2_shortName ? match.team2_shortName : match.team2.shortName )

  const team1 = { ...match.team1, ...match.team_home }
  const team2 = { ...match.team2, ...match.team_away }
  // console.log( topTeams )
  console.log( team1 )

  // const [includeTopTeams, setIncludeTopTeams] = useState(false)
  const top_teams_a = topTeams.includes( team1.id )
  const top_teams_b = topTeams.includes( team2.id )
  const includeTopTeams = top_teams_a || top_teams_b


  // const result = match.finished ?
  //   ( match.endedInPenalties ? `${ team1GoalsPenalty } - ${ team2GoalsPenalty } :P`
  //     : `${ team1Goals } - ${ team2Goals }` ) : ''

  // const result = team1Goals || team1Goals === 0 ? `${ team1Goals } - ${ team2Goals }` : ' x '

  // Show Table Second Row to Display More Details of Match
  const [ showScndRow, setshowScndRow ] = useState( expanded ? expanded : false )
  const [ showPrdsModal, setShowPrdsModal ] = useState( false )
  // const [ showVIPrdsModal, setShowVIPrdsModal ] = useState( false )
  const [ showEditMatchModal, setShowEditMatchModal ] = useState( false )

  const [ req1Status, setreq1Status ] = useState( '' )  // [spinner - success - fail]

  useEffect( () => {
    if ( expanded !== showScndRow ) {
      setshowScndRow( expanded )
    }
  }, [ expanded ] )

  const handleUpdatePrds = async ( e ) => {
    e.preventDefault()
    let success = await calculatePointsForPredictions( match._id )

    success ? setreq1Status( 'success' ) : setreq1Status( 'fail' )
  }

  // ** Calculate Points for Predictions of matchId
  const calculatePointsForPredictions = async ( matchId ) => {
    // `{{URL}}/api/v1/ad/calculate-points/5f25976be6b0da6448a5ee5d` 
    try {
      const response = await axos.get( `/api/adm/calculate-points/${ matchId }` )
      // console.log( response )
      console.log( response.data )

      return true
    } catch ( error ) {
      return false
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  return <>
    <tr style={ { background: includeTopTeams ? '#eeffff' : '#fff' } }>
      <td className="clickable p-0" onClick={ () => setshowScndRow( !showScndRow ) }>
        <div className={ `row p-1 ${ match.finished ? 'border-left-green' : 'border-left-sky' }` }>
          <div className="col-auto px-2">{ index + 1 }.</div>
          <span className="col">{ match._id }</span>
          { ' | ' }
          <span className="col">{ match.id_ }</span>
          {/* <div className="col-2">
           <span className="bolldd"> { match.league.shortName }</span>  
          </div> */}
        </div>
      </td>

      <td className="text-l">
        { match.league.id }
      </td>

      <td className="text-l">
        <div className="row">
          <div className="col text-r">
            <span>{ team1.shortName ? team1.shortName : team1.name.toLowerCase().slice( 0, 6 ) } </span>
          </div>
          <div className="col-auto px-2 center">{ result ? result.score : '' }</div>
          <div className="col ">
            <span>{ team2.shortName ? team2.shortName : team2.name.toLowerCase().slice( 0, 6 ) } </span>
          </div>
        </div>
      </td>
      <td className="center">
        { match.vip ? <span className="green fl">&#10004;</span> : '' }
        { match.odds && <span> { match.odds.team1 } | { match.odds.draw } | { match.odds.team2 }</span> }
      </td>
      <td className="text-center">
        { moment( match.date ).format( 'YYYY-MM-DD, HH:mm' ) }
      </td>
      <td className="text-center">
        { week && week.number }
      </td>
      {/* Actions td */ }
      <td className="center">
        <i className="fas fa-pen-square em-14 clickable mx-2"
          onClick={ () => { setCurrentMatch( match ); setShowEditMatchModal( !showEditMatchModal ) } }
          data-toggle="tooltip"
          data-placement="top"
          title="Update Match (Info + Result)"
        >  </i>

        <EditMatchModal
          match={ match }
          show={ showEditMatchModal }
          handleShow={ () => setShowEditMatchModal( !showEditMatchModal ) }
        />
        { ' ' }

        <span className="blue clickable mx-2 ulineonhover"
          onClick={ () => setShowPrdsModal( !showPrdsModal ) }
        > Prds </span>

        <span className="green clickable mx-2 ulineonhover"
          onClick={ handleUpdatePrds }
        > Up Points </span>
        {/* update points for prds of match */ }

        <PrdsModal
          show={ showPrdsModal }
          handleShow={ () => setShowPrdsModal( !showPrdsModal ) }
          match={ match }
        />

        <i className="fas fa-times crimson mx-2 clickable"
          onClick={ () => { if ( window.confirm( 'Are You Sure?' ) ) { deleteMatch_DB( match._id ) } } }
        />

        <ScssFailSpinr status={ req1Status } />

      </td>
    </tr>

    {/* Second Row (when expanded) */ }
    { showScndRow && <tr className='x' >
      <td colSpan="12" className='center bg-eee' >
        <span className="mr-3"> Note: { match.note } </span>
        {/* <span> Description: { match.description } </span> */ }
      </td>
    </tr> }


  </>
}

export default MatchTR
