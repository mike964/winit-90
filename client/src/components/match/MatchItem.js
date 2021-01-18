import React, { useState } from 'react'
import moment from 'moment'
// import Logo from '../components-common/Logo'
// import PredictionArea from '../prediction/PredictionArea'
import LogoBox from '../vip/LogoBox'
// import Checkbox from '../components-common/Checkbox'
// import DiceBtn from '../vip/DiceBtn'
import Counter from '../prediction/Counter'
import MatchItemHeader from './MatchItemHeader'
import { getRandomNumber, getPredictionTxt } from '../../utils'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {
  updatePrediction_byMatch, addPrediction, deletePrediction
} from '../../redux/actions/prediction.actions'
import { green } from 'colors'
// import LastFive from './LastFive' 

//================================================================================
const MatchItem = ( { match } ) => {
  const { league, note, date, finished, penalties } = match

  const matchIstoday = ( moment().format( 'YYYY-MM-DD' ) === moment( date ).format( 'YYYY-MM-DD' ) )
  const match_date = matchIstoday ? moment( match.date ).calendar()
    //: moment( date ).format( 'YYYY-MM-DD h:mm A' )
    : moment( date ).format( 'MMM DD   h:mm A' )

  const team1 = match.team1.name === 'null' ? match.team_home : match.team1
  const team2 = match.team2.name === 'null' ? match.team_away : match.team2

  const { predictions } = useSelector( state => state.prd )
  const { selectedLig, selectedWeek, hideFinished } = useSelector( state => state.global )
  const { thisWeek, nextWeek } = useSelector( state => state.week )
  const { currentTimeUnix } = useSelector( state => state.clock )

  const [ alreadyPredicted, setalreadyPredicted ] = useState( false )
  const [ matchFinished, setMatchFinished ] = useState( finished ? true : false )
  const [ matchStarted, setMatchStarted ] = useState( false )
  const [ firstClick, setFirstClick ] = useState( true )
  const [ goalDiff, setGoalDiff ] = useState( null )
  const [ answerKey, setAnswerKey ] = useState( null )    // 1 - 2 - 3
  const [ clickedTeam, setclickedTeam ] = useState( '' )   // team1 or team2 
  const [ winnerName, setwinnerName ] = useState( '' )     // Aresenal or Chelsea
  const [ hidden, sethidden ] = useState( false )   // If true => hide this match Item 
  const [ showSpiner, setShowSpiner ] = useState( true )   // If true => hide this match Item 

  // Scnd row is to display your prediction
  const [ showScndRow, setShowScndRow ] = useState( false )   // If true => hide this match Item 

  const getShortName = ( x ) => x.slice( 0, 10 )


  useEffect( () => {
    const matchTimeUnix = parseInt( moment( date ).format( 'X' ) )
    // console.log( matchTimeUnix )   // string
    if ( !matchFinished && currentTimeUnix > ( matchTimeUnix + 7200 ) )  // 7200 scnds = 2h
      setMatchFinished( true )
    if ( !matchStarted && currentTimeUnix > ( matchTimeUnix + 100 ) )
      setMatchStarted( true )

    setTimeout( () => setShowSpiner( false ), 300 )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentTimeUnix ] )


  // Check If user already made prediction for this match
  useEffect( () => {
    if ( predictions && predictions.length > 0 ) {
      let prd = predictions.find( prd => prd.match && prd.match._id === match._id )

      if ( prd && prd._id.length > 20 ) { // means prd has mongodb _id
        setalreadyPredicted( true )

        setGoalDiff( prd.goalDifference )

        if ( prd.willEndInPenalties ) {
          // setPenaltiesChecked( true )
          setGoalDiff( 6 )   // gd 6 means penalties
        }
        if ( prd.answerKey === 1 ) {
          setclickedTeam( 'team1' )
          setwinnerName( team1.name )
        }
        if ( prd.answerKey === 2 ) {
          setclickedTeam( 'team2' )
          setwinnerName( team2.name )
        }
      }
    } else {   // If no prds in redux store (when logout) :Reset
      setclickedTeam( '' )
      setGoalDiff( '' )
      setalreadyPredicted( false )
      setAnswerKey( '' )
      setFirstClick( true )
    }

    // setTimeout( () => setShowSpiner( false ), 300 )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ predictions ] )


  // Handle Hide OR Display Match Item according to WeekSelector & matchFinished   
  useEffect( () => {
    if ( hideFinished && matchFinished ) {
      // console.log( `hideFinished: ${ hideFinished } - matchFinished: ${ matchFinished }` )
      sethidden( true )
    } else if ( selectedLig === 'All' || selectedLig === league.country ) {
      sethidden( false )
    } else {
      sethidden( true )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ hideFinished, matchFinished, selectedLig ] )


  const addPredictionToRedux = ( gd, answerKey ) => {
    // Add Prediction to Redux Store
    // If first time click add, if not Update the existing prediction
    console.log( 'addPredictionToRedux()' )
    // console.log( 'gd: ' + gd, 'answerKey: ' + answerKey )

    let winnerId
    if ( answerKey === 1 ) {
      winnerId = team1._id
    } else if ( answerKey === 2 ) {
      winnerId = team2._id
    } else {  // If draw
      winnerId = null
    }

    let week_id = ( selectedWeek === 'thisWeek' ? thisWeek._id
      : ( selectedWeek === 'nextWeek' ? nextWeek._id : '-' ) )

    if ( firstClick ) {
      addPrediction( {
        match: match._id,
        answerKey,
        winner: winnerId,
        goalDifference: gd,
        matchDate: match.date,
        // week: match.week._id,
        week: week_id
      } )

    } else {
      updatePrediction_byMatch( match._id, {
        answerKey: answerKey,
        winner: winnerId,
        goalDifference: gd
      } )
    }
  }


  const handleTeamLogoClick = ( team ) => {    // team = ['team1','team2']   
    setShowScndRow( true )
    if ( firstClick ) setFirstClick( false )

    let ansKey
    // console.log( team )
    if ( team === 'team1' ) {
      setclickedTeam( 'team1' )
      ansKey = 1
      setAnswerKey( 1 )
      setwinnerName( team1.name )
      // setWinnerId( team1._id )

    } else if ( team === 'team2' ) {
      setclickedTeam( 'team2' )
      ansKey = 2
      setAnswerKey( 2 )
      setwinnerName( team2.name )
      // setWinnerId( team2._id )
    }
    console.log( firstClick )   // true 

    // console.log( match._id ) 
    addPredictionToRedux( goalDiff, ansKey )
  }

  const handleBtnX = () => {
    // delete prediction from redux 
    deletePrediction( match._id )
    // The reset local state
    setclickedTeam( '' )
    setGoalDiff( null )
    setAnswerKey( null )
    setwinnerName( '' )
    // setWinnerId( '' )
    // setpenaltiesChecked( false ) 
    setFirstClick( true )
  }

  const handleGDcounter = ( gd ) => {
    // handle Goal Difference Counter
    // If this is first Click
    if ( firstClick ) setFirstClick( false )

    let ansKey

    setGoalDiff( gd )

    if ( gd === 0 ) {
      ansKey = 3
      setAnswerKey( 3 )
    } else if ( clickedTeam === 'team1' ) {
      ansKey = 1
    } else if ( clickedTeam === 'team2' ) {
      ansKey = 2
    }

    addPredictionToRedux( gd, ansKey )
  }


  // <Spinr />  

  const Spinr = () => <div className="py-3">
    <Spinner variant='warning' animation="border" />
  </div>


  //============================================================================================
  return <>
    { match && <div className={ hidden ? "match-item hidden" : "match-item" }>

      {/* HEADER */ }
      {/* <MatchItemHeader
        match={ match }
        matchStarted={ matchStarted }
        matchFinished={ matchFinished }
      /> */}

      {/* BODY */ }
      <div className="row">

        {/* <div className="col-auto align-self-center text-center px-2" >
          <span>Pos: { team1.position }</span>
         <LastFive last5matches={ team1.last5 } />  
        </div> */}

        <div className="col-3 col-sm-2 pt-2 center" >
          <LogoBox
            size='45px'
            team={ team1 }
            onclick={ () => handleTeamLogoClick( 'team1' ) }
            clickable={ matchStarted ? false : ( alreadyPredicted ? false : true ) }
            //clicked={ true }   // for test
            clicked={ clickedTeam === 'team1' ? true : false }
          />
          {/* DIV below will apper when page XS */ }
          <div className="team_name_xs center">
            <span onClick={ () => handleTeamLogoClick( 'team1' ) } >
              { ( team1.name ).slice( 0, 12 ) }
            </span>
          </div>
        </div>

        {/* ** Middle Colmn ** */ }
        <div className="col center" >
          { showSpiner ? <Spinr />
            : <>
              <div className="c-888 py-1">
                <span className={ matchIstoday ? "gold fw-400" : "" }>
                  { match_date }
                </span>
              </div>

              { matchStarted && !alreadyPredicted && <div className="py-3">
                <span className="x" style={ { color: '#00ff00' } }>انتهی وقت تسجیل التوقع لهذه المباراة</span>
              </div> }

              { alreadyPredicted && <div className="col py-2 center" dir="rtl"  >
                <span className="bold mx-2"> توقعک : </span>
                <span> { getPredictionTxt( goalDiff, winnerName ) }</span>
              </div> }

              { !alreadyPredicted && !matchStarted && <>
                <div className="row">
                  <div className="col team_name_md">
                    <span onClick={ () => handleTeamLogoClick( 'team1' ) }
                    > { team1.name }</span>
                  </div>
                  <div className="col py-2 py-sm-1">
                    {/* GD Counter + Dice Btn */ }
                    <Counter
                      value={ goalDiff }
                      onclick={ handleGDcounter }
                      disabledd={ alreadyPredicted }
                      penalties={ penalties }
                    />
                  </div>
                  <div className="col pt-1 team_name_md">
                    <span onClick={ () => handleTeamLogoClick( 'team2' ) }
                    > { team2.name }</span>
                  </div>
                </div>
              </> }
            </> }
        </div>

        <div className="col-3 col-sm-2 pt-2 center" >
          <LogoBox
            size='45px'
            team={ team2 }
            onclick={ () => handleTeamLogoClick( 'team2' ) }
            clickable={ matchStarted ? false : ( alreadyPredicted ? false : true ) }
            //clicked={ true }   // for test
            clicked={ clickedTeam === 'team2' ? true : false }
          />
          {/* DIV below will apper when page XS */ }
          <div className="team_name_xs center">
            <span onClick={ () => handleTeamLogoClick( 'team2' ) } >
              { ( team2.name ).slice( 0, 12 ) }
            </span>
          </div>
        </div>

      </div>

      {/* ** Second Row ** */ }
      { showScndRow && <>
        { !matchStarted && !alreadyPredicted && <div className="row py-2 text-r" dir="rtl" style={ { borderTop: '1px solid gray' } } >
          <div className="col-auto col-sm-4 px-2 center">
            { answerKey
              ? <i className="far fa-times-circle red clickable" onClick={ () => handleBtnX() } />
              : <i className="far fa-hand-point-left clickable" onClick={ () => handleBtnX() } /> }
            <span className="bold mx-2">توقعک :</span>
          </div>

          <div className="col ">
            <span> { getPredictionTxt( goalDiff, winnerName ) }</span>
          </div>
        </div> }
      </> }

    </div> }
  </>
}

export default MatchItem



/* <div className="col-3 text-center green pt-3">
        <span>المرکز في الدوري</span> <br />
        <span>12th</span>

        <span className="green">آخر 5 مباراة</span>
        { ' ' } <br /> { ' ' }
        <i className="fas fa-times-circle red"></i>{ ' ' }
        <i className="fas fa-minus-circle gray-l"></i>{ ' ' }
        <i className="fas fa-check-circle green"></i>{ ' ' }
        <i className="fas fa-check-circle green"></i>{ ' ' }
        <i className="fas fa-check-circle green"></i>{ ' ' }

      </div>  */