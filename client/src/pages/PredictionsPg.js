import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PredictionsTable from '../components/prediction/PredictionsTable'
import { getAllMyPredictions } from '../redux/actions/prediction.actions'
import RefreshBtn from '../components/RefreshBtn'
import WeekSelector from '../components/WeekSelector'
import PrdsTableFooter from '../components/prediction/PrdsTableFooter'
import { getMyKarnames_DB, setCurrentKarname } from '../redux/actions/week-karname.actions'
import axios from 'axios'

//=======================================================================================
// Dashboard - Sidebar - My Weekly Predictions
const PredictionsPg = () => {

  // const { allPredictions } = useSelector( state => state.prd )
  const { thisWeek } = useSelector( state => state.week )
  // console.log( allPredictions )
  const { current: selectedKarname, karnames } = useSelector( state => state.karname )


  // *** User prds of welected week / karname
  const [ predictions, setPredictions ] = useState( [] ) // filtered prediction of user to display


  useEffect( () => {
    console.log( '--- Predictions PG Loaded ---' )
    getMyKarnames_DB()  // Get current user karnames when page load 
  }, [] )


  useEffect( () => {
    if ( thisWeek && thisWeek._id && karnames )
      setCurrentKarname( thisWeek._id )
  }, [ thisWeek, karnames ] )


  useEffect( () => {
    if ( selectedKarname ) {
      // get_prds_of_karname( selectedKarname._id )
    } else {

    }
  }, [ selectedKarname ] )


  useEffect( () => {
    console.log( '--- Selected Karname Changed.' )   // Good
    // *** When week selector changes, get user prds of karname by selected weekId from server
    // *** GET & SET prds of selected week by karname id for logged in user

    if ( selectedKarname ) {
      get_prds_of_karname( selectedKarname._id )
    }
  }, [ selectedKarname ] )


  const get_prds_of_karname = async ( karnameId ) => {
    console.log( '--- get_prds_of_karname()' )

    // This function should run once page load or selected week changes
    // api/predictions/me?karname=5fe0eb190d5f6428fcb22647

    if ( karnameId ) {
      console.log( '-- karnameId: ' + karnameId )   // *** UNDEFINED
      const response = await axios.get( `/api/predictions / me ? karname = ${ karnameId }` )


      console.log( response.data.data )   // Good Good
      setPredictions( response.data.data )  // set local state prds 
    } else {
      console.log( '--- No karname id!' )
      setPredictions( [] )
    }
  }

  //========================================================================================
  return <div className="pg">

    <div className="my-3 em-14 bold center">
      My Predictions
    </div>


    <div className="prds-table-container">
      {/** ====== Header ====== **/ }
      <div className="row mb-2">
        <div className="col center pt-1">
          <span className="bold em-12"> Year 2020 </span>
        </div>
        <div className="col center px-5">
          <WeekSelector />
        </div>
        <div className="col pt-1 text-r">
          <RefreshBtn onclick={ () => get_prds_of_karname( selectedKarname._id ) } />
        </div>
      </div>

      <div className="mb-2 curved">
        <PredictionsTable prds={ predictions } vip={ false } />
      </div>

      <PrdsTableFooter karname={ selectedKarname } />

    </div>



  </div>
}

export default PredictionsPg
