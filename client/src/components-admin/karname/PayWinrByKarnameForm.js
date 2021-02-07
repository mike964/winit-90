import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import FormGrup from '../../components-common/FormGrup'
import ScssFailSpinr from '../../components-common/ScssFailSpinr'
import { axos } from '../../utils'


// * Pay a winner by karname Id
const PayWinrByKarnameForm = () => {

  const [ state, setState ] = useState( {
    amount: 0,
    karnameId: ''
  } )

  const [ reqStatus, setReqStatus ] = useState( '' )

  const onChange = e => setState( { ...state, [ e.target.name ]: e.target.value } )


  const handleSubmit = async ( e ) => {
    e.preventDefault()
    // POST /api/adm/pay-winner-by-karname-id

    setReqStatus( 'spinner' )

    try {
      const response = await axos.post( '/api/adm/pay-winner-by-karname-id', state )
      console.log( response.data )

      response.data.success ? setReqStatus( 'success' ) : setReqStatus( 'fail' )

    } catch ( error ) {
      console.log( error )
      setReqStatus( 'fail' )
    }
  }

  //===============================================================================
  return <form onSubmit={ handleSubmit } className="onSubmit">
    <div className="row">
      <div className="col pr-3">
        <FormGrup
          label='Karname ID'
          name='karnameId'
          value={ state.karnameId }
          onChange={ onChange }
        />
      </div>
      <div className="col">
        <FormGrup
          label='Reward amount'
          name='amount'
          value={ state.amount }
          onChange={ onChange }
        />
      </div>
      <div className="col mx-2">
        <Button type='submit' className='pill py-2 w-120px'>
          Submit
        </Button>
        { ' ' }
        <ScssFailSpinr status={ reqStatus } />
      </div>
    </div>

  </form>
}

export default PayWinrByKarnameForm
