import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import { addVipPrediction_DB, addVipPrediction } from '../../redux/actions/vip.actions';
import SubmitBtn from '../match/SubmitBtn';

const MatchItemVipFooter = ( { match, answerKey, clickedTeam, odds } ) => {
  const { team1, team2 } = match

  const history = useHistory()
  const [ stake, setStake ] = useState( 10 )
  const [ posWinning, setPosWinning ] = useState( 0 )   // possible winnings
  const [ clickedOption, setclickedOption ] = useState( '10' )   // [10,20,100] 
  const [ winnerId, setWinnerId ] = useState( '' )
  const [ error, setError ] = useState( '' )   // When submit fails, {type: noBalance, noAuth}

  // Update Possible Wining while Stake input or AnswerKey change 
  useEffect( () => {
    // console.log( answerKey )
    // console.log( stake )
    if ( answerKey === 1 ) {
      setPosWinning( parseInt( stake * odds.team1 ) )
      setWinnerId( team1._id )
    }
    if ( answerKey === 2 ) {
      setPosWinning( parseInt( stake * odds.team2 ) )
      setWinnerId( team2._id )
    }
    if ( answerKey === 3 ) {
      setPosWinning( parseInt( stake * odds.draw ) )
      setWinnerId( null )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ stake, answerKey ] )


  const handleOptionClick = ( x ) => {
    setStake( x )
    setclickedOption( x.toString() )
  }

  const handleStakeInputChange = ( x ) => {
    // Don't delete, will be user later
    setStake( x )
    setclickedOption( '' )
  }

  const handleChargeBalaceClick = () => {
    // Redirect to charge balance page
    history.push( '/charge-balance' )
  }

  const handleSubmit = async () => {
    console.log( '--- handle Vip Submit() ---' )
    // If user not logged in => Error: Please sign up first 
    // *** SET The Winner Team & Result Key

    const newPrd = {
      match: match._id,
      answerKey,
      winner: winnerId,
      stake,
      possibleWinning: posWinning,
    }

    // console.log( newPrd )

    // let success = true   // for test
    // let success = false   // for test
    let success = await addVipPrediction_DB( newPrd )

    if ( success ) {
      setError( { type: 'hideStakes' } )  // Just in order to hide stake after submit success
      // If vip prediction got added to db, then add it to store after 2 secnds
      setTimeout( () => { addVipPrediction( newPrd ) }, 2000 )
    }
    // console.log( success )
    // let success = await addVipPrediction_DB( newPrd )
    return success   // In order to user in Child Component 

  }
  //======================================================================================================
  //======================================================================================================
  return <div className="row bg-555">
    {/* SM & Bigger Screen Submit Btn */ }
    <div className="col-4 d-none d-sm-block p-1 center">
      <SubmitBtn
        label="تسجیل التوقع"
        onclick={ handleSubmit }
        setError={ setError }
        vip
        stake={ stake }
      />
    </div>

    { !error ? <div className="col p-1 center">
      <div className="ib pt-1 mx-3">
        <div className="ib w-80px bg-b center">
          <span className="gold em-12 bold">${ posWinning }</span>
        </div>
        <span className="white"> ستربح</span>
      </div>

      <div className="ib pt-1 white">
        <span className="mx-2">ادفع</span> { ' ' }
        <span className={ "ulineonhover clickable mx-2 " + ( clickedOption === '10' ? 'gold' : '' ) }
          onClick={ () => handleOptionClick( 10 ) }
        > $10 </span>
        <span className={ "ulineonhover clickable mx-2 " + ( clickedOption === '20' ? 'gold' : '' ) }
          onClick={ () => handleOptionClick( 20 ) }
        > $20 </span>
        <span className={ "ulineonhover clickable mx-2 " + ( clickedOption === '30' ? 'gold' : '' ) }
          onClick={ () => handleOptionClick( 30 ) }
        > $30 </span>
        {/* <span className={ "ulineonhover clickable mx-2 " + ( clickedOption === '100' ? 'gold' : '' ) }
          onClick={ () => handleOptionClick( 100 ) }
        >$100</span> */}

        {/* CUSTOM MONEY INPUT */ }
        {/* <input type="text"
          className="chashin-input mx-2"
          value={ stake }
          onChange={ ( e ) => handleStakeInputChange( e.target.value ) }
        /> */}
      </div>
    </div>
      : <div className="col center p-1">
        { error && error.type === 'noBalance' &&
          <div className="ib em-12 bold gold clickable ulineonhover mr-3"
            onClick={ handleChargeBalaceClick } >
            <span> اشحن رصیدک </span> { ' ' }
            <i className="fas fa-hand-point-left"></i>
          </div> }
        <div className="ib mx-2">
          <span className="white">{ error.msg }</span>
        </div>
      </div> }

    {/* XS Submit Btn */ }
    <div className="col-12 d-sm-none p-1 center">
      <SubmitBtn
        label="تسجیل التوقع"
        onclick={ handleSubmit }
        setError={ setError }
        vip
        stake={ stake }
      />
    </div>

  </div>
}

export default MatchItemVipFooter
