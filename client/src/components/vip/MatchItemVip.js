/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux';
import Logo from '../../components-common/Logo'
// import {
//   match_isetoday, match_setarted, getRandomNumber, getSubmitBtnDisabled
// } from '../../redux/functions'
// import { addVipPrediction_DB } from '../../redux/actions/vip.actions';
import MatchItemHeader from '../match/MatchItemHeader';
import MatchItemVipFooter from './MatchItemVipFooter';
import SpinnersBox from '../../components-common/SpinnersBox';
// import Logo from '../../components-common/Logo' 
// import { setTeam1Goals, setTeam2Goals } from '../../redux/actions/vip.actions'

const MatchItemVip = ( { match } ) => {
  const { team1, team2, league, note, date, dateEpoch, odds, finished } = match


  // const odds = { team1: 3.3,  team2: 2.6, draw: 3.1 }
  const { currentTimeUnix } = useSelector( setate => setate.clock )
  const { myVipredictions } = useSelector( setate => setate.vip )

  const [ answerKey, setAnswerKey ] = useState( null )  //   [1,2, 3(d)]
  const [ winnerName, setwinnerName ] = useState( '' )     // Aresenal or Chelsea
  // Check If User Already Made Prediction for this match or not
  const [ alreadyPredicted, setalreadyPredicted ] = useState( false )
  const [ possWinning, setPossWinning ] = useState( false )  // Only if already predicted is true
  const [ matchFinished, setMatchFinished ] = useState( finished ? true : false )
  const [ matchsetarted, setMatchsetarted ] = useState( false )

  // const [ prediction,setprediction ] = useState( '' )    // Prediction Holder If user made already 
  const [ showFooter, setShowFooter ] = useState( false )    // Show Submit btn row when user click an option 
  const [ showOptionBtns, setShowOptionBtns ] = useState( true )    // Show option Btns ( team1 - x - team2)
  const [ showSpinner, setShowSpinner ] = useState( true )    // Show Spinners Before Load

  // ** Check If User already Submitted prediction for this Match
  useEffect( () => {
    // console.log( myViPredictions )
    if ( myVipredictions ) {
      myVipredictions.forEach( prd => {
        if ( prd.match._id === match._id || prd.match === match._id ) {
          // console.log( 'Tekrari' )
          console.log( 'already predicted ' )
          console.log( prd )
          setalreadyPredicted( true )
          setShowOptionBtns( false )
          setAnswerKey( prd.answerKey )
          setPossWinning( prd.possibleWinning )

          if ( prd.answerKey === 1 ) {
            setwinnerName( team1.fullName )
          }
          if ( prd.answerKey === 2 ) {
            setwinnerName( team2.fullName )
          }


          // } else {
          //   // If prediction not made yet
          //   // setShowSpinner( false )
        }
      } )
    }
    setTimeout( () => { setShowSpinner( false ) }, 900 )


  }, [ myVipredictions ] )



  useEffect( () => {
    // if ( !matchFinished && currentTimeUnix > ( dateEpoch + 7200 ) )
    const matchTimeUnix = parseInt( moment( date ).format( 'X' ) )
    // console.log( dateEpoch )   // number
    // console.log( matchTimeUnix )   // setring
    if ( !matchFinished && currentTimeUnix > ( matchTimeUnix + 7200 ) )
      setMatchFinished( true )
    if ( !matchsetarted && currentTimeUnix > ( dateEpoch + 200 ) )
      setMatchsetarted( true )
    // eslint-disable-next-line 
  }, [ currentTimeUnix ] )


  const handleOptionSelect = ( x ) => {   //  ('team1' - 'team2' - 'draw')
    // console.log( team )
    if ( !alreadyPredicted ) {
      setShowFooter( true )

      if ( x === 'team1' ) {
        // setClickedTeam( 'team1' )
        setAnswerKey( 1 )
        //setwinnerId( team1._id )
        setwinnerName( team1.fullName )
      }
      if ( x === 'team2' ) {
        // setClickedTeam( 'team2' )
        setAnswerKey( 2 )
        //setwinnerId( team2._id )
        setwinnerName( team2.fullName )
      }
      if ( x === 'draw' ) {
        // setClickedTeam( '' )
        setAnswerKey( 3 )
        //setwinnerId( '' )
        setwinnerName( '' )
      }
    }
  }

  // Handle btn x (delete)
  const handleBtnX = () => {
    setAnswerKey( '' )
    // setClickedTeam( '' )
    setwinnerName( '' )
    setShowFooter( false )
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////// 
  return <>
    { match && <div className="match-item-vip">

      {/* HEADER */ }
      <MatchItemHeader
        match={ match }
        matchsetarted={ matchsetarted }
        matchFinished={ matchFinished }
        vip={ true }
      />

      {/* BODY */ }
      <div className="body"  >

        {/* TEAM LOGOS ROW */ }
        <div className="row p-1">

          <div className="col-auto p-3" onClick={ () => handleOptionSelect( 'team1' ) } >
            <Logo name={ team1.shortName } country={ team1.country } size='60' />
          </div>

          <div className="col 6 text-center">
            { showSpinner ?
              <div className="py-4">
                <SpinnersBox />
              </div>
              : <>
                <div className="bg-white green text-r w-300px px-2 py-1 mx-auto my-2 curved-6" dir="rtl">
                  { answerKey && !alreadyPredicted &&
                    <i className="far fa-times-circle red clickable" onClick={ () => handleBtnX() } /> }
                  { ' ' }
                  <i className="far fa-hand-point-left mx-2" />
                  <span> توقعک :  </span>
                  <span>{ answerKey === 3 ? 'تعادل' : ( answerKey ? `فوز ${ winnerName }` : '-' ) }</span>
                </div>

                <div className="row">
                  { showOptionBtns ? <>
                    <div className="col p-1">
                      <div className={ answerKey === 1 ? "option__selected" : "option" }
                        onClick={ () => handleOptionSelect( 'team1' ) } >
                        <span className="teamname mr-2"> { team1.fullName }</span>{ ' ' }
                        <span className="gold">{ odds.team1 }</span>
                      </div>
                    </div>

                    <div className="col p-1" >
                      <div className={ answerKey === 3 ? "option__selected" : "option" }
                        onClick={ () => handleOptionSelect( 'draw' ) }>
                        <span className="teamname mr-2">{ 'X' }</span>{ ' ' }
                        <span className="gold">{ odds.draw }</span>
                      </div>
                    </div>

                    <div className="col p-1">
                      <div className={ answerKey === 2 ? "option__selected" : "option" }
                        onClick={ () => handleOptionSelect( 'team2' ) } >
                        <span className="teamname mr-2"> { team2.fullName }</span>{ ' ' }
                        <span className="gold">{ odds.team2 }</span>
                      </div>
                    </div>
                  </>
                    : <>
                      { alreadyPredicted && <div className="mx-auto my-1 py-1 c-eee curved">
                        <div className="ib px-5">
                          <span className="c-444"> الربح المتوقع: </span>
                          <span className="gold"> ${ possWinning } </span>
                        </div>
                      </div> }
                    </> }
                </div>
              </> }
          </div>

          <div className="col-auto p-3" onClick={ () => handleOptionSelect( 'team2' ) }>
            <Logo name={ team2.shortName } country={ team2.country } size='60' />
          </div>

        </div>



        {/* FOOOTER - SUBMIT ROW */ }
        { showFooter && !alreadyPredicted &&
          <MatchItemVipFooter
            match={ match }
            answerKey={ answerKey }
            odds={ odds }
          /> }



      </div>

    </div> }
  </>
}

export default MatchItemVip



// { !matchsetarted && <div>
//   <Spinner animation="grow" variant="warning" size="sm" /> { ' ' }
//   <span className="capitalize"> Will setart { moment( dateEpoch * 1000 ).fromNow() } </span>
// </div> }
// { description && <div className="red">{ description }</div> }