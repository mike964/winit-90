import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { toggleAuthModal } from '../../redux/actions/global.actions'

const SubmitBtn = ( { vip, stake, onclick, label, setError } ) => {
  // showError proptype is function
  // vip : Boolean , this btn is for submitting vip predictions or not
  // vip : To check balance enought or not
  // onClick is handleSubmit
  // show Error whill activate Error function in parent component
  // label is btn label
  const { isAuthenticated } = useSelector( state => state.auth )
  const { currentUser } = useSelector( state => state.auth )
  const [ showSpinner, setShowSpinner ] = useState( false )    // Show Spinner inside Submit btn
  const [ balance, setBalance ] = useState( currentUser ? currentUser.balance : 0 )
  const [ btnlabel, setbtnlabel ] = useState( label ? label : 'labell' )
  const [ classname, setClassname ] = useState( vip ? 'submit-btn' : 'btn btn-block btn-primary' )

  useEffect( () => {
    if ( currentUser )
      // setBalance( 0 )    // FOR TEST
      setBalance( currentUser.balance )
  }, [ currentUser ] )

  // Change color and label of submit button after user submit prediction
  const changeSubmitBtn = ( success, err_code ) => {
    if ( success === true ) {
      console.log( 'green' )
      setClassname( vip ? "submit-btn" : "btn btn-block btn-success" )
      setbtnlabel( <><i className="fas fa-check" />{ ' ' }<span>تم بنجاح</span></> )

    } else {   //  if ( !success )
      // Change color and label of button
      console.log( 'red' )
      setClassname( vip ? "submit-btn__red" : "btn btn-block btn-danger" )
      // if ( err_code === 11000 ) {
      // setbtnlabel( <><i className="fas fa-exclamation" /> لا یمکن تسجیل اکثر من توقع لکل مباراة</> )

      // } else { 
      setbtnlabel( <><i className="fas fa-times" />{ ' ' }<span className="x">لم یتم</span></> )
    }
  }


  // Return everythin Back After submit
  const resetBtn = () => {
    setClassname( vip ? 'submit-btn' : 'btn btn-block btn-primary' )
    setbtnlabel( label )
  }

  const handleClick = () => {
    console.log( ' --- handleClick() --- ' )
    setShowSpinner( true )

    setTimeout( async () => {

      if ( !isAuthenticated ) {
        // changeSubmitBtn( false )
        // setErrorMsg( 'یجب ان تکون عضوا لتسجیل توقعاتک' )
        // setshowSignupNowBtn( 'true' )
        toggleAuthModal( true )   // Redux :Toggle Auth Model Instead of showing Error

        // CHECK USER BALANCE AT FRONTEND
      } else if ( balance === 0 || balance < stake ) {
        changeSubmitBtn( false )
        setError( { type: 'noBalance', msg: 'لیس لدیک رصید کافي' } )

      } else {    // IF NO ERROR: SUBMIT PREDICTIONS TO DB
        // let success = true   // FOR TEST
        // let success = false // FOR TEST 
        let success = await onclick()
        // console.log( 'success: ' + success )
        // Change btn label & classname
        success ? changeSubmitBtn( true ) : changeSubmitBtn( false )
        setTimeout( () => resetBtn(), 5000 )
      }

      setShowSpinner( false )
      // setTimeout( () => returnEverythingBack(), 5000 )
    }, 500 )
  }

  //================================================================================================
  //================================================================================================
  return <>
    <button className={ classname } onClick={ handleClick }
    //disabled={ submitBtnDisabled } 
    >
      { showSpinner ?
        <Spinner as="span" animation="border" size="sm" variant="warning" />
        : <span className="bold">{ btnlabel }</span> }
    </button>
  </>
}

export default SubmitBtn
