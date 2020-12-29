import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'
import { submitPredictions } from '../../redux/actions/prediction.actions'
import SubmitBtn from './SubmitBtn'

// Submit Multiple (All) Predictions Btn
// Submit All Box :later
const SubmitAllBtnBox = () => {

  const history = useHistory()

  // GET from Redux Store 
  const { predictions } = useSelector( state => state.prd )
  const { selectedWeek } = useSelector( state => state.global )
  const { thisWeek, nextWeek } = useSelector( state => state.week )


  const [ error, setError ] = useState( '' )   // When submit fails, {type: noBalance, noAuth}
  // const submitBtnDisabled = getSubmitBtnDisabled( penaltiesChecked, goalDiff, clickedTeam ) 

  const handleSubmit = async () => {
    console.log( ' --- handleSubmit()  --- ' )

    // let prds_ = []  // Prds to be submitted to server
    // Make this function smaller - less code


    let selected_week_id = ( selectedWeek === 'thisWeek' ? thisWeek._id
      : ( selectedWeek === 'nextWeek' ? nextWeek._id : '-' ) )

    // IF NO ERROR: SUBMIT PREDICTIONS TO DB
    // if ( predictions ) { // If prds in redux store exist
    let prds_ = predictions.filter( prd => prd.week === selected_week_id )
    // }

    console.log( prds_ )

    let successfull = await submitPredictions( prds_, selected_week_id )
    return successfull   // In order to use in Child Component 

  }


  // *** Redirect to charge balance page
  const handleChargeBalaceClick = () => history.push( '/charge-balance' )

  //================================================================================================
  //================================================================================================
  return <div className='submit-all-btn-box'>
    <div dir="rtl" className="row submit-error-box justify-content-around pb-1">

      <div className="col-auto p-1 mr-2">
        { error
          ? <span className="bg-white red bold p-1 curved-4">
            <i className="fas fa-exclamation-triangle" /> { ' ' } { error.msg }
          </span>
          : <span className="white em-09"> اضغط علی الزر الاسفل الآن <i className="fas fa-hand-point-down" /></span> }
      </div>

      <div className="col text-center">
        {/* { error && error.type === 'noAuth' &&
          <div className="signup-now-btn bold">
            <i className="fas fa-hand-point-left"></i> { ' ' }
            <span className='em-12' onClick={ handleSignupNowClick }>سجل الآن</span>
          </div> } */}

        { error && error.type === 'noBalance' &&
          <span className="em-12 bold gold clickable ulineonhover"
            onClick={ handleChargeBalaceClick }>
            <i className="fas fa-hand-point-left"></i> { ' ' }اشحن رصیدک
          </span> }
      </div>

      <div className="col text-l bold pl-3 pt-1">
        مجموع توقعاتک : { predictions && predictions.length }
      </div>

    </div>

    <div className="p-2">
      <SubmitBtn
        setError={ setError }
        label="تسجیل التوقعات"
        onclick={ handleSubmit }
      />
    </div>

  </div>
}

export default SubmitAllBtnBox