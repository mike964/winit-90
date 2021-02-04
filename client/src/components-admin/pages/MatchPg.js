import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Button, Row, Spinner } from 'react-bootstrap'
// import AddMatchBtnModal from '../../components/admin/match/AddMatchBtnModal'
// import { MatchBar } from '../components/admin/match/MatchBar'  
// import MatchFilters from '../../components-admin/match/MatchFilters'
// import ReloadBtn from '../components/admin/components-common/ReloadBtn'
// import InputAppend from '../../components-common/InputGrup'
import RefreshBtn from '../../components/RefreshBtn'
import { toggleAllRows } from '../../redux/actions/global.actions'
import { getMatches_DB } from '../../redux/actions/match.actions'
import AddMatchForm from '../../components-admin/match/AddMatchForm'
import { filterMatches } from '../../redux/actions/filter.actions'
import MatchTable from '../match/MatchTable'
import FormGrup from '../../components-common/FormGrup'



// ** Admin Matches Page
//===================================================================================================
const MatchPg = () => {

  const { expandAll } = useSelector( state => state.global )
  // const { id_: thisWeekId } = useSelector( state => state.weeks.thisWeek )

  // const [ weekid, setweekid ] = useState( '' )
  const [ showMatchForm, stShowMatchForm ] = useState( false )

  const { filters } = useSelector( state => state )
  const { matches, loading: matchesLoading } = useSelector( state => state.match )
  const [ filteredMatches, setFilteredMatches ] = useState( '' )
  // const [ matchesLoading, setMatchesLoading ] = useState( true )
  // const filteredMatches = ( matches ? filterMatches( matches, filters ) : [] )

  // ** Initial FORM Value
  const [ state, setState ] = useState( {
    matchesFrom: moment().subtract( 10, 'days' ).format( 'YYYY-MM-DD' ),  // Get matches from date
    // matchesTo: moment().format( 'YYYY-MM-DD' ),    // To date
    matchesTo: moment.utc().endOf( "week" ).format( 'YYYY-MM-DD' ),    // To date
    weekId: '2021-3'
  } )

  const onChange = ( e ) => setState( { ...state, [ e.target.name ]: e.target.value } )

  useEffect( () => {
    if ( matches ) {
      setFilteredMatches( filterMatches( matches, filters ) )
    }
    // setMatchesLoading( false )
  }, [ matches, filters ] )

  const handleAddMatchBtn = () => {
    stShowMatchForm( !showMatchForm )
  }

  const handleGetMatchesFromDB = async ( e ) => {
    e.preventDefault()
    // console.log( x )   // Good
    // x => weekId
    // const response = await axios.get( `${ process.env.REACT_APP_SERVER}/api/matches?week=${ x }` )
    // setFilteredMatches( response.data.matches )
    getMatches_DB( state.matchesFrom, state.matchesTo, state.weekId )
  }


  // WH#N MATHCES CHANGE CHANGE FILTERED MATCHES : I
  //N ORDER TO CHECK MATCH AS FINISHED ONCE RESULT UPDATED

  //=======================================================================================
  //=======================================================================================
  return <div className="w-90 mx-auto ">

    <div className="bg-eee bold c-222 px-5 py-5 curved my-3">
      <form onSubmit={ handleGetMatchesFromDB }>
        <div className="row mb-3">
          <div className="col">
            <div className="ib mr-2">
              <FormGrup
                name='matchesFrom'
                label='GET matches (from,to)'
                value={ state.matchesFrom }
                onChange={ onChange }
              //placeholder="2021-11-21"
              //onsubmit={ handleGetMatchesFromDB } 
              />
            </div>
            <div className="ib">
              <FormGrup
                //placeholder="2021-11-23"
                name='matchesTo'
                value={ state.matchesTo }
                onChange={ onChange }
              />
            </div>
            <button className="btn btn-primary va-top mx-2" >
              Submit
          </button>
          </div>
        </div>
      </form>

      <Row className="mb-3">
        <div className="col">
          <form onSubmit={ handleGetMatchesFromDB }>
            <div className="ib">
              <FormGrup
                label='GET matches of weekId'
                //placeholder="(2020-35)"
                name='weekId'
                value={ state.weekId }
                onChange={ onChange }
                onsubmit={ handleGetMatchesFromDB }
              />
            </div>
            <button className="btn btn-primary va-top mx-2" type="submit"
            > Submit
          </button>
          </form>
        </div>
      </Row>


      <div className="coll py-1 pr-2">
        <Button variant="primary" onClick={ handleAddMatchBtn }>
          + Match
        </Button>
        { ' ' }
        <Button variant="warning" onClick={ () => toggleAllRows() }>
          { expandAll ? 'Collapse All' : 'Expand All' }
        </Button>
        { ' ' }
        <span className="mx-5">
          <RefreshBtn onclick={ getMatches_DB } />
        </span>
      </div>

      <div className="bg-eee curved pt-2 my-3">
        {/* { showMatchForm ? <AddMatchForm /> : <MatchFilters /> } */ }
      </div>

    </div>

    <div className="pb-3">

      <MatchTable matches={ filteredMatches } loading={ matchesLoading } />

      <div className="p-3">
        <span className="x">Left green border means match.finished = true</span>
      </div>
    </div>


  </div>
}

export default MatchPg
