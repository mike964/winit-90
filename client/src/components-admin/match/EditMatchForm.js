import React, { useState, useEffect } from 'react'
import cx from "classnames"
import { updateMatch_DB, updateMatchResult, calculatePointsForPredictions } from '../../redux/actions/match.actions'
import { useSelector } from 'react-redux';
import moment from 'moment';
import FormGrup from '../../components-common/FormGrup';
import Checkbox from '../../components-common/Checkbox';
// import { timeConversion } from '../../redux/functions';
import ScssFailSpinr from '../../components-common/ScssFailSpinr';


// This component is used both for  Edit Match info & Update match result
//===================================================================================
const EditMatchForm = ( { handleModalShow } ) => {
  const match = useSelector( state => state.match.currentMatch )
  // console.log( match ) 
  const [ season, setSeason ] = useState( match ? match.season : '' )
  // const [ description, setDescription ] = useState( edit ? match.description : '' )
  const [ note, setNote ] = useState( match ? match.note : '' )
  // const [ date, setDate ] = useState( edit ? match.date : moment().format() ) 
  const [ fullDate, setfullDate ] = useState( match ? match.date : moment().format() )

  // const [matchResult, setMatchResult] = useState({})

  // const [ resultString, setResultString ] = useState( match && match.finished ? match.resultString : '' )  // only if match ended in penalties 


  // Match ended in penalties
  const [ penalties, setPenalties ] = useState( false )


  const [ goals, setGoals ] = useState( {
    team1: 0,
    team2: 0,
    penalty1: 0,
    penalty2: 0
  } )

  const onChange = e => setGoals( { ...goals, [ e.target.name ]: e.target.value } )


  // const [ team1Goals, setTeam1Goals ] = useState( 0 )
  // const [ team2Goals, setTeam2Goals ] = useState( 0 )
  const [ odds, setOdds ] = useState( match ? match.odds : { team1: 0.0, team2: 0.0, draw: 0.0 } )
  const [ vip, setVip ] = useState( match ? match.vip : false )
  const [ reqStatus, setReqStatus ] = useState( '' )  // [spinner - success - fail]


  // Update  Match Info
  const handleUpdateMatchInfo = async ( e ) => {
    e.preventDefault()
    console.log( 'handleUpdateMatchInfo()' )

    setReqStatus( 'spinner' )    // Show Spinner  
    // _match is match to be updated
    const _match = {
      date: fullDate,
      vip,
      //penalties,  // match could end in penalties or not
      odds,
      note,
      season
    }

    console.log( _match ) // for test   

    let success = await updateMatch_DB( match._id, _match )
    success ? setReqStatus( 'success' ) : setReqStatus( 'fail' )

    // handleModalShow()   // close modal 
  }

  // Update Only Match Result
  const handleUpdateResult = async ( e ) => {
    e.preventDefault()
    console.log( 'updateMatchResult()' )

    setReqStatus( 'spinner' )    // Show Spinner 

    let success = await updateMatchResult( match._id, {
      goals: {
        "team1": goals.team1,
        "team2": goals.team2
      },
      penalty: penalties ? {
        "team1": goals.penalty1,
        "team2": goals.penalty2
      } : null
    } )

    console.log( success )
    // If success : Done   // If Fail : Red x 
    success ? setReqStatus( 'success' ) : setReqStatus( 'fail' )
    setTimeout( () => handleModalShow(), 600 )
    // setTimeout( () => setReqStatus( '' ), 3000 )
  }

  const handlePenaltyCheck = () => {
    setPenalties( !penalties )
    setGoals( { ...goals, penalty1: 0, penalty2: 0 } )
  }

  //============================================================================
  return <form className='text-dark p-2'>

    <div className="py-3 bold center">
      { match.title }
    </div>

    <div className="row">
      <div className="col-3 p-2 bold"> Result </div>
      <div className="col">
        <FormGrup
          name='team1'
          value={ goals.team1 }
          onChange={ onChange }
        ////className='ib w-80px'
        />
      </div>
      <div className="col">
        <FormGrup
          name='team2'
          value={ goals.team2 }
          onChange={ onChange }
        ////className='ib w-80px'
        />
      </div>
      <div className="col-auto pt-2">
        <Checkbox
          label="Ended in Penalties"
          checked={ penalties }
          //onclick={ () => setPenalties( !penalties ) }
          onclick={ handlePenaltyCheck }
        />
      </div>
    </div>

    <div className="row">
      <div className="col-3 p-2 bold"> Penalties </div>
      <div className="col">
        <FormGrup
          name='penalty1'
          value={ goals.penalty1 }
          onChange={ onChange }
          disabled={ penalties ? false : true }
        // className='ib w-80px'
        />
      </div>
      <div className="col">
        <FormGrup
          name='penalty2'
          value={ goals.penalty2 }
          onChange={ onChange }
          disabled={ penalties ? false : true }
        //// className='ib w-80px'
        />
      </div>
    </div>

    <div className="row">
      <div className="col-3 p-2 bold"> Odss </div>
      <div className="col">
        <FormGrup
          //placeholder='1.1'
          name='team1odds'
          value={ odds ? odds.team1 : '' }
          onChange={ e => setOdds( { ...odds, team1: e.target.value } ) }
          disabled={ vip ? false : true }
        />
      </div>
      <div className="col px-1">
        <FormGrup
          //placeholder='1.2'
          name='drawodds'
          value={ odds ? odds.draw : '' }
          onChange={ e => setOdds( { ...odds, draw: e.target.value } ) }
          disabled={ vip ? false : true }
        />
      </div>
      <div className="col px-1">
        <FormGrup
          //placeholder='1.3'
          name='team2odds'
          value={ odds ? odds.team : '' }
          onChange={ e => setOdds( { ...odds, team2: e.target.value } ) }
          disabled={ vip ? false : true }
        />
      </div>
      <div className="col px-1 pt-2">
        {/* fix checkbox */ }
        <Checkbox
          label="VIP"
          checked={ vip }
          onclick={ () => setVip( !vip ) }
          labelRight={ true }
        />
      </div>
    </div>


    <div className="row">
      <div className="col-3 p-2 bold"> Date </div>
      <div className="col">
        <FormGrup
          name='fullDate'
          value={ fullDate }
          onChange={ e => setfullDate( e.target.value ) }
        />
      </div>
      <div className="w-100"></div>

      <div className="col-3 p-2 bold"> Season </div>
      <div className="col">
        <FormGrup
          name='season'
          value={ season }
          onChange={ e => setSeason( e.target.value ) }
        />
      </div>

    </div>

    <div className="row">
      <div className="col-3 p-2 bold"> Note </div>
      <div className="col">
        <FormGrup
          name='note'
          //label='Note'
          value={ note }
          onChange={ e => setNote( e.target.value ) }
        />
      </div>
    </div>



    <div className="row py-2">
      <div className="col px-1">
        <button className="btn btn-block btn-green"
          onClick={ handleUpdateMatchInfo }
        > Update Match Info
        </button>
      </div>
      <div className="col px-1">
        <button className="btn btn-block btn-blue"
          onClick={ handleUpdateResult }
        > Update Result  <ScssFailSpinr status={ reqStatus } />
        </button>
      </div>
    </div>
  </form>
}

export default EditMatchForm


// {
//   "team1": "manutd",
//   "team2": "manct",
//   "league": "prlig",
//   "season":"2020-21",
//   "description": "Round 19",
//   "date": "2020-08-01T16:00:00Z" 
// }