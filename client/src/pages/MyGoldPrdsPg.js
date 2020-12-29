import React, { useState } from 'react'
import PredictionList from '../components/prediction/PredictionList'
import UserSelect from '../components/prediction/UserSelect'
import { useSelector } from 'react-redux'
// import WeekSelector from '../components/dashboard/WeekSelector'
import PredictionsTable from '../components/prediction/PredictionsTable'
import { getAllMyPredictions } from '../redux/actions/prediction.actions'
import YearSelect from '../components/YearSelect'
import RefreshBtn from '../components/RefreshBtn'

const MyGoldPrdsPg = () => {

  const { myVipredictions } = useSelector( state => state.vip )


  const [ state, setState ] = useState( {
    select: ''
  } )



  // get my predictions

  // const onChange = ( e ) => setState( { ...state, [ e.target.name ]: e.target.value } )



  return <div className="mx-900 m-auto">
    <h3 className="x"> My Golden Predictions </h3>

    <div className="mb-1"></div>

    {/* <YearSelect /> */ }



    {/*** ====== Header ====== ***/ }
    <div className="row">
      <div className="col-4">

      </div>
      <div className="col-4">
        {/* <WeekSelector /> */ }
      </div>
      <div className="col-4 text-right">
        <RefreshBtn onclick={ getAllMyPredictions } color='bg-gold black' />
      </div>
    </div>

    <p>My golden prediction for last 30 days</p>

    <p>For more than 10 days only display correct predictions</p>

    <PredictionsTable prds={ myVipredictions } vip={ true } />


  </div>
}

export default MyGoldPrdsPg
