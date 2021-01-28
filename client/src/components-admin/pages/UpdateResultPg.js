import moment from 'moment'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Checkmark from '../../components-common/Checkmark'
import { setReqHeaders } from '../../redux/actions/auth.actions'
import { axos } from '../../utils'


// ** Admin Update Results Page
// ** Update multiple result using api-football
const UpdateResultPg = () => {

  const [ state, setState ] = useState( { from_: '', to_: '', ligcode: '' } )
  const [ success, setSuccess ] = useState( false )  // req status

  const onChange = ( e ) => setState( { ...state, [ e.target.name ]: e.target.value } )


  const updateMultipleResults = async () => {
    // ** Update multiple match result by admin
    // {{URL}}/api/matches/update-multiple-result?league=135&season=2020&from=2021-01-06&to=2021-01-12&updateResults=true

    const season_ = '2020'  // default season

    setReqHeaders()   // SET TOKEN 
    try {
      const response = await axos.get( `/api/matches/update-multiple-result?league=${ state.ligcode }&season=${ season_ }&from=${ state.from_ }&to=${ state.to_ }&updateResults=true` )

      console.log( response.data )

      if ( response.data.success )
        return true

    } catch ( error ) {
      return false
    }
  }

  const handleSubmit = ( e ) => {
    e.preventDefault()

    console.log( state )

    let success_ = updateMultipleResults()

    success_ ? setSuccess( true ) : setSuccess( false )

    setTimeout( () => setSuccess( false ), 3000 )   // Then dissappear

  }

  //=============================================================================
  return <div className="x">
    <div className="container">

      <div className="center p-3 mb-2">
        <span className="em-12 bold"> Update multiple result using api-football </span>
      </div>

      <div className="bg-w black p-3 m-auto curved" style={ { maxWidth: '600px' } }>

        <div className="p-1 mb-3">
          <span className="bold"> * Hint: Lig codes</span>
          <span className="fr">Today : { moment().format( 'YYYY-MM-DD' ) }</span>
          <br />
          <span>prlig 39 - splig 140 - itlig 135 - frlig - ucl - uel</span>
        </div>

        <form onSubmit={ handleSubmit }>
          <div className="form-group row">
            <div className="col px-1">
              <input type="text" className="form-control"
                placeholder="From"
                name='from_'
                value={ state.from_ }
                onChange={ onChange }
              />
            </div>

            <div className="col px-1">
              <input type="text" className="form-control"
                placeholder="To"
                name="to_"
                value={ state.to_ }
                onChange={ onChange }
              />
            </div>

            <div className="col px-1">
              <input
                type="text"
                className="form-control"
                placeholder="Lig Code"
                name='ligcode'
                value={ state.ligcode }
                onChange={ onChange }
              />
            </div>

            <div className="col px-1">
              <Button type="submit" variant="primary">
                Go
                </Button>

              { success && <Checkmark /> }
            </div>

          </div>
        </form>
      </div>




    </div>
  </div>


}

export default UpdateResultPg
