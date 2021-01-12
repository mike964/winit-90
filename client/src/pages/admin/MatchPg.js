import React, { useState, useEffect } from 'react'
// import AddMatchBtnModal from '../../components/admin/match/AddMatchBtnModal'
// import { MatchBar } from '../components/admin/match/MatchBar'  
import MatchFilters from '../../components-admin/match/MatchFilters'
import MatchTable from '../../components-admin/match/MatchTable'
// import ReloadBtn from '../components/admin/components-common/ReloadBtn'
import InputAppend from '../../components-common/InputGroupe'
import RefreshBtn from '../../components/RefreshBtn'
import { toggleAllRows } from '../../redux/actions/global.actions'
import { useSelector } from 'react-redux'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { getMatches_DB } from '../../redux/actions/match.actions'
import AddMatchForm from '../../components-admin/match/AddMatchForm'
import { filterMatches } from '../../redux/actions/filter.actions'
import InputGroupe from '../../components-common/InputGroupe'
import axios from 'axios'


// Admin matches page
const MatchPg = () => {

  const { expandAll } = useSelector( state => state.global )

  // const [ weekid, setweekid ] = useState( '' )
  const [ showMatchForm, stShowMatchForm ] = useState( false )

  const { filters } = useSelector( state => state )
  const { matches } = useSelector( state => state.match )
  const [ filteredMatches, setFilteredMatches ] = useState( [] )
  // const filteredMatches = ( matches ? filterMatches( matches, filters ) : [] )


  useEffect( () => {
    if ( matches ) {
      setFilteredMatches( filterMatches( matches, filters ) )
    }
  }, [ matches, filters ] )

  const handleAddMatchBtn = () => {
    stShowMatchForm( !showMatchForm )
  }

  const handleGetMatchesOfWeekId = async ( x ) => {
    // console.log( x )   // Good
    // x => weekId
    // const response = await axios.get( `${ process.env.REACT_APP_SERVER}/api/matches?week=${ x }` )
    // setFilteredMatches( response.data.matches )
    getMatches_DB( x )
  }


  // WH#N MATHCES CHANGE CHANGE FILTERED MATCHES : I
  //N ORDER TO CHECK MATCH AS FINISHED ONCE RESULT UPDATED

  //=======================================================================================
  //=======================================================================================
  return <div className="w-90 mx-auto ">

    <div className="row mb-2 ">
      <div className="col-auto py-1 pr-2">
        <Button variant="primary" onClick={ handleAddMatchBtn }>
          + Match
        </Button>
        { ' ' }
        <Button variant="warning" onClick={ () => toggleAllRows() }>
          { expandAll ? 'Collapse All' : 'Expand All' }
        </Button>
      </div>

      <div className="col p-1">
        <InputGroupe
          placeholder="GET matches of weekId"
          onsubmit={ handleGetMatchesOfWeekId }
          append
        />
      </div>

      <div className="col text-r p-1">
        <RefreshBtn onclick={ getMatches_DB } />
      </div>
    </div>


    <div className="bg-eee curved pt-2 my-3">
      { showMatchForm ? <AddMatchForm /> : <MatchFilters /> }
    </div>



    <div className="pb-3">
      <MatchTable matches={ filteredMatches } />

      <div className="p-3">
        <span className="x">Left green border means match.finished = true</span>
      </div>
    </div>


  </div>
}

export default MatchPg
