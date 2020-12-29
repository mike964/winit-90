import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment'
import {
  addPrediction,
  updatePrediction_byMatch,
  deletePrediction,
  updatePrediction_byId,
  setIsEditing,
  updatePrediction_DB
} from '../../redux/actions/prediction.actions';
import { useEffect } from 'react';

// No Longer Used
// This is old component wihout Goal Difference Counter
//====================================================================================
const PredictionBox = ( { match } ) => {
  const { team1, team2 } = match
  const { predictions } = useSelector( state => state.prd )

  const prediction = ( predictions ? predictions.find( prd => prd.match._id === match._id ) : null )


  // if ( prediction ) { console.log( prediction ) }   // Good 
  const { isEditing } = useSelector( state => state.prd )


  const options = [ ' - ', `${ team1.fullName } Win`, `${ team2.fullName } Win`, 'Draw' ]

  const [ index, setIndex ] = useState( 0 )
  const [ showControlBtns, st_showControlBtns ] = useState( true )
  const [ showEditBtn, st_showEditBtn ] = useState( false )
  const [ edit, setEdit ] = useState( false )
  // const [ index, setIndex ] = useState( prediction ? prediction.answerKey : 0 ) 
  const [ firstClick, st_firstClick ] = useState( false )

  // console.log( prediction.answerKey )   // undefined
  useEffect( () => {
    // st_prediction( predictions.find( prd => prd.match._id === match._id ) )

    // Check If user already made prediction for this match
    if ( prediction && prediction._id.length > 20 ) {

      setIndex( prediction.answerKey )

      if ( !isEditing ) {
        setEdit( false )
        st_showEditBtn( true )
        st_showControlBtns( false )

        // else if isEditing Exist
      } else {
        if ( isEditing === prediction._id ) {
          setEdit( true )
          st_showEditBtn( false )
          st_showControlBtns( true )

          // If  if ( isEditing !== prediction._id ) {
        } else {
          setEdit( false )
          st_showEditBtn( false )
          st_showControlBtns( false )
        }
      }
      // If user hasn't made prediction for this match yet
    } else {
      // If user is editing some prediction, hide <> btns for all other predictions
      if ( isEditing && isEditing.length > 0 ) {
        st_showControlBtns( false )
      } else {
        st_showControlBtns( true )
      }
    }

    // console.log( prediction.answerKey )   // undefined wihtout last line: ' }, [prediction] )'
  }, [ prediction, isEditing ] )




  const changeIndex = ( x ) => {
    // if reaches last item in options, return to 0
    if ( index === options.length - 1 && x === 1 ) {
      setIndex( 0 )
      return 0
    } else if ( x === -1 && index === 0 ) {
      // If reaches first element in options adn wants to go back, get to last element in options
      setIndex( options.length - 1 )
      return options.length - 1
    } else {
      setIndex( index + x )
      return index + x
    }
  }

  const handleClick = ( L_or_R ) => {
    let indexx

    // If this is first Click
    if ( !firstClick ) st_firstClick( true )

    if ( L_or_R === 'right' ) {
      // first changeIndex(), then addPrediction() 
      indexx = changeIndex( 1 )

    } if ( L_or_R === 'left' ) {
      indexx = changeIndex( -1 )
    }
    if ( indexx !== 0 ) {   // if indexx = 0 ignore , don't dispatch to redux
      if ( !firstClick ) {
        // If first time clicl, Add Prediction to redux store
        addPrediction( { match: match._id, answerKey: indexx } )

      } else {
        // If scnd time click, Update prediction inside redux store
        console.log( match._id, indexx )
        updatePrediction_byMatch( match._id, indexx )
      }
      // If (indexx == 0 )
    } else {

    }

    console.log( prediction )
  }

  const handleEdit = () => {
    if ( !edit ) {
      setIsEditing( prediction._id )  // change redux store
      setEdit( true )
      st_showEditBtn( false )
      st_showControlBtns( true )
      st_firstClick( true )
    }
  }
  const handleUpdateClick = ( x ) => {
    if ( x === 'update' && index !== 0 ) {
      updatePrediction_DB( prediction._id, index )
      setIsEditing( '' )

    } if ( x === 'cancel' ) {
      setIsEditing( '' )
    }
  }

  return <div className={ edit ? "prediction-box edit" : "prediction-box" }>

    { showEditBtn && <div onClick={ handleEdit }> Edit </div> }

    { showControlBtns && <div className="left clickable"
      onClick={ () => handleClick( 'left' ) }
    > <i className="fas fa-caret-left" />
    </div> }

    <div className="center">
      { options[ index ] }
    </div>

    { showControlBtns && <div className="right clickable"
      onClick={ () => handleClick( 'right' ) }
    > <i className="fas fa-caret-right" />
    </div> }

    { edit && <div className="right" >
      <span onClick={ () => handleUpdateClick( 'update' ) } > &#9989; </span>
      <span onClick={ () => handleUpdateClick( 'cancel' ) }   > &#10062; </span>
    </div> }

  </div>
}

export default PredictionBox