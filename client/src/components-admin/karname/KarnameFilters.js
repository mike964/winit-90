import React, { useState, useEffect } from 'react'
import Checkbox from '../components-common/Checkbox'
import weekReducer from '../../redux/reducers/week.reducer'
import { useSelector } from 'react-redux'
import { getKarnames } from '../../redux/actions/week-karname.actions'

const KarnameFilters = () => {
  const { thisWeek } = useSelector( state => state.week )
  const { lastWeek } = useSelector( state => state.week )


  const [ year, stYear ] = useState( '' )
  const [ weekId, stWeekId ] = useState( '' )

  const handleSubmit = ( e ) => {
    e.preventDefault()
    getKarnames( weekId )
  }

  const getKarnamesOfThisWeek = () => {
    getKarnames( thisWeek._id )
  }

  useEffect( () => {
    getKarnamesOfThisWeek()
  }, [ thisWeek ] )

  return <div className="x bg-light text-dark m-3 p-3 curved">
    <form onSubmit={ handleSubmit } className="form-inline" >
      <div className="input-group mr-2">
        <input
          type="text"
          className="form-control"
          placeholder="Year"
          value={ year }
          onChange={ ( e ) => stYear( e.target.value ) }
        />
      </div>

      <div className="input-group mr-2">
        <input
          type="text"
          name="weekid"
          placeholder="Week Id"
          className="form-control" //value onChange 
          onChange={ ( e ) => stWeekId( e.target.value ) }
        />
      </div>



      <input type="submit" value="Go" />



    </form>

    <button className="btn btn-sm btn-success" onClick={ () => getKarnamesOfThisWeek() }>
      Get Karnames of This Week
</button>

    <div className="mb-2"></div>

    <div className="bg-info text-center">
      <span className="x">This Week # { thisWeek.number } ID: { thisWeek._id }</span> <br />
      <span className="x">Last Week # { lastWeek.number } ID: { lastWeek._id }</span>
    </div>




  </div>
}

export default KarnameFilters
