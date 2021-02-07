import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import FormGrup from '../../components-common/FormGrup'
import ScssFailSpinr from '../../components-common/ScssFailSpinr'
import { payWeeklyWinners } from '../../redux/actions/admin.actions'

const PayWinrsForm = ( { weekId } ) => {


  const [ state, setState ] = useState( {
    "first": 100,
    "second": 50,
    "third": 25,
    "fourth": 15,
    "fifth": 10,
    "sixth": 0,
    "seventh": 0,
    "eighth": 0,
    "ninth": 0,
    "tenth": 0
  } )


  const [ reqStatus, setReqStatus ] = useState( '' )  // [spinner - success - fail]

  const onChange = ( e ) => setState( { ...state, [ e.target.name ]: e.target.value } )

  const handleSubmit = async ( e ) => {
    e.preventDefault()
    setReqStatus( 'spinner' )
    console.log( state )   // FOR TEST 
    let success = await payWeeklyWinners( weekId, state )
    success ? setReqStatus( 'success' ) : setReqStatus( 'fail' )
    setTimeout( () => setReqStatus( '' ), 2000 )     // Disappear after 3 seconds
  }

  const handleReset = () => {
    // SET all inputs to '0'
    setState( {
      "first": 0,
      "second": 0,
      "third": 0,
      "fourth": 0,
      "fifth": 0,
      "sixth": 0,
      "seventh": 0,
      "eighth": 0,
      "ninth": 0,
      "tenth": 0
    } )
  }

  const renderFormInput = ( label, name, value ) => (
    <div className="col p-1 d-flex">
      <span className="p-2"> { label } </span>
      <FormGrup
        value={ value }
        name={ name }
        onChange={ onChange }
      />
    </div> )


  //=========================================================================
  return <form onSubmit={ handleSubmit }>

    <div className="row p-1 pt-2 black bold">

      <div className="col-auto pt-2 px-2">
        <Button variant='success' className='pill' onClick={ handleReset }>
          Reset
        </Button>
      </div>

      { renderFormInput( '1st', 'first', state.first ) }
      { renderFormInput( '2nd', 'second', state.second ) }
      { renderFormInput( '3rd', 'third', state.third ) }
      { renderFormInput( '4th', 'fourth', state.fourth ) }
      { renderFormInput( '5th', 'fifth', state.fifth ) }
      { renderFormInput( '6th', 'sixth', state.sixth ) }
      { renderFormInput( '7th', 'seventh', state.seventh ) }
      { renderFormInput( '8th', 'eighth', state.eighth ) }
      { renderFormInput( '9th', 'ninth', state.ninth ) }
      { renderFormInput( '10th', 'tenth', state.tenth ) }

      <div className="col-auto pt-2 px-3">
        <Button type='submit' className='pill w-120px'>
          Pay  <ScssFailSpinr status={ reqStatus } />
        </Button>
      </div>
    </div>
  </form>
}

export default PayWinrsForm
