import React, { useState } from 'react'
import moment from 'moment'
import Checkbox from '../../components-common/Checkbox'
import FormGrup from '../../components-common/FormGrup'
import { axos } from '../../utils'
import UpdateResultsForm from '../UpdateResultsForm'

const MultiplePg = () => {



  const [ state, setState ] = useState( {
    from_: moment().format( 'YYYY-MM-DD' ),  // Get matches from date
    to_: moment().format( 'YYYY-MM-DD' ),    // To date
    season: '2020',
    ligCode: '39',
    allLigs: true,   // all ligs checkbox true by default
  } )


  const ligs = [ 'prlig', 'splig', 'itlig', 'frlig', 'ucl', 'uel', 'unl' ]
  // const topLigs = [ 2, 3, 5, 39, 140, 135, 61, 45, 143, 137, 66 ] 
  const topLigs = [ 2, 3, 5, 39, 140, 135, 61 ]   // exclude cups - only leagues


  const onChange = ( e ) => setState( { ...state, [ e.target.name ]: e.target.value } )
  // ** The function below is used for all checkboxes here
  const onCheckboxChange = ( e ) => setState( { ...state, [ e.target.name ]: e.target.checked } )

  const handleSubmit = async ( e ) => {
    e.preventDefault()
    // {{URL}}/api/matches/insertmany-multiple-ligs

    const reqBody = {
      from: state.from_,
      to: state.to_,
      season: state.season,
      ligs: state.allLigs === true ? topLigs : [ state.ligCode ]
    }

    console.log( reqBody )

    const response = await axos.post( '/api/matches/insertmany-multiple-ligs', reqBody )
    console.log( response.data )

  }

  //=============================================================================
  return <div className="bg-eee c-222 py-3">
    <div className="container">
      <div className="p-1 mb-3">
        <span className="bold"> * Hint: Lig codes</span>
        <span className="fr">Today : { moment().format( 'YYYY-MM-DD' ) }</span>
        <br />
        <span> prlig : 39, splig : 140, itlig : 135, frlig : 61, ucl : 2, uel : 3</span>
      </div>
      <div className="x">


        <div className="p-3 bg-w border-ccc mb-3">
          <p className=" bold green"> Add multiple matches using api-football</p>
          <form onSubmit={ handleSubmit }  >
            <div className="row mb-3">
              <div className="col-auto">
                <FormGrup
                  name='from_'
                  label='From'
                  //labelTop
                  value={ state.from_ }
                  onChange={ onChange }
                  //placeholder="2021-11-21"
                  placeholder="From"
                //onsubmit={ handleGetMatchesFromDB } 
                />
              </div>
              <div className="col-auto">
                <FormGrup
                  label="To"
                  placeholder="To"
                  name='to_'
                  value={ state.to_ }
                  onChange={ onChange }
                />
              </div>
              <div className="col-auto">
                <FormGrup
                  label="Season"
                  //placeholder="2020"
                  name="season"
                  value={ state.season }
                  onChange={ onChange }
                />
              </div>
              {/* Break */ }
              <div className="w-100 mb-3"></div>

              <div className="col-auto">
                <FormGrup
                  label='Lig code'
                  //placeholder="Lig code"
                  name='ligCode'
                  value={ state.ligCode }
                  onChange={ onChange }
                  disabled={ state.allLigs ? true : false }
                />
              </div>
              <div className="col-2 center pt-2">
                <Checkbox
                  label='All Ligs'
                  name="allLigs"
                  value={ state.allLigs }
                  onChange={ onCheckboxChange }
                />
              </div>
              <div className="col">
                <button className="btn btn-primary va-top" >
                  Submit
          </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mb-3">

          <Checkbox
            label='Prrlig'
            name='prlig'
            checked={ state.prlig }
            onChange={ onCheckboxChange }
          //onclick={ () => { console.log( '.. Say hi' ) } }
          />

        </div>
      </div>

      <div className="p-3 bg-w border-ccc mb-3">
        <p className=" bold green"> Update multiple match results using api-football</p>
        <UpdateResultsForm />
      </div>
    </div>
  </div>
}

export default MultiplePg
