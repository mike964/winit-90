import React, { useState, useEffect } from 'react'
import cx from "classnames"
import { addMatch_DB } from '../../redux/actions/match.actions'
import { useSelector } from 'react-redux';
import moment from 'moment';
import FormGroup from '../../components-common/FormGroup';
import Checkbox from '../../components-common/Checkbox';
import { timeConversion } from '../../redux/functions';
import SpinrSuccsFail from '../../components-common/SpinrSuccsFail';

const AddMatchForm = () => {


  const [ team1, setTeam1 ] = useState( '' )
  const [ team2, setTeam2 ] = useState( '' )
  const [ league, setLeague ] = useState( '' )
  const [ season, setSeason ] = useState( '' )
  const [ note, setNote ] = useState( '' )
  const [ date, setDate ] = useState( moment().format( 'YYYY-MM-DD' ) )
  const [ time, setTime ] = useState( '10:00' )
  const [ penalties, setPenalties ] = useState( false )   // Possible penalties  

  const [ req1Status, setreq1Status ] = useState( '' )  // [spinner - success - fail]

  const handleAddMatch = async ( e ) => {
    e.preventDefault()

    // Show Spinner inside btn
    setreq1Status( 'spinner' )

    // let goals = result.split( "-" )
    let timeStr = `${ time }PM`
    let time24 = timeConversion( timeStr )
    console.log( 'time24: ' + time24 )
    let dateTime = `${ date }T${ time24 }:00.0+03:00`

    const newMatch = {
      team1,
      team2,
      league,
      date: dateTime,
      season,
      title: `${ team1 } x ${ team2 } (${ league })`,
      note,
      penalties
    }
    console.log( newMatch ) // for test

    let success = await addMatch_DB( newMatch )
    success ? setreq1Status( 'success' ) : setreq1Status( 'fail' )

    // FOR TEST
    // setTimeout( () => setreq1Status( 'success' ), 1000 )
    setTimeout( () => setreq1Status( '' ), 3000 )   // RESET

    // handleModalShow()   // close modal
  }


  //=======================================================================
  return <form onSubmit={ handleAddMatch } className='text-dark py-2'>

    <div className="row pt-1">
      <div className="col px-2">
        <FormGroup
          name='team1'
          value={ team1 }
          onChange={ e => setTeam1( e.target.value ) }
          placeholder="Team 1 (barca)"
        />
      </div>
      <div className="col px-2">
        <FormGroup
          name='team2'
          value={ team2 }
          onChange={ e => setTeam2( e.target.value ) }
          placeholder="Team 2"
        />
      </div>

      <div className="col px-2">
        <FormGroup
          name='league'
          value={ league }
          onChange={ e => setLeague( e.target.value ) }
          placeholder="Ligue (prlig / ucl)"
        />
      </div>
      <div className="col px-2">
        <FormGroup
          name='season'
          value={ season }
          onChange={ e => setSeason( e.target.value ) }
          placeholder="Season (2020-21)"
        />
      </div>
    </div>

    <div className="row">
      <div className="col d-flex px-2">
        <FormGroup
          name='date'
          //className='ib w-125px'
          value={ date }
          onChange={ e => setDate( e.target.value ) }
          placeholder="2020-08-01T16:00:00Z"
        />
        <FormGroup
          name='time'
          className='ib w-80px'
          value={ time }
          onChange={ e => setTime( e.target.value ) }
        //placeholder="Date - Ex. 2020-08-01T16:00:00Z"
        /> { ' ' }
        <span className="bold p-2"> PM </span>
      </div>


      <div className="col center pt-2">
        <Checkbox
          label="Penalties Possible"
          checked={ penalties }
          onclick={ () => setPenalties( !penalties ) }
        />
      </div>

      <div className="col-6 px-2">
        <FormGroup
          name='note'
          value={ note }
          onChange={ e => setNote( e.target.value ) }
          placeholder="Note: (Barcelona won 1st leg 2-0)"
        />
      </div>
    </div>

    <div className="px-2">
      <button className="btnn btn-block btn-blue"
        type="submit"
      > Submit  <SpinrSuccsFail status={ req1Status } />
      </button>
    </div>
  </form>
}

export default AddMatchForm
