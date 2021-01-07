import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PredictionsTable from '../components/prediction/PredictionsTable'
import { getAllMyPredictions } from '../redux/actions/prediction.actions'
import RefreshBtn from '../components/RefreshBtn'
import WeekSelector from '../components/WeekSelector'
import PrdsTableFooter from '../components/prediction/PrdsTableFooter'
import { getMyKarnames_DB, setSelectedKarname } from '../redux/actions/week-karname.actions'
import axios from 'axios'
import SpinnersBox from '../components-common/SpinnersBox'
import { Spinner } from 'react-bootstrap'

//=======================================================================================
// Dashboard - Sidebar - My Weekly Predictions
const PredictionsPg = () => {

  // const { allPredictions } = useSelector( state => state.prd )
  const { thisWeek } = useSelector( state => state.week )
  // console.log( allPredictions )
  const { current: selectedKarname, karnames } = useSelector( state => state.karname )


  // *** User prds of welected week / karname
  const [ predictions, setPredictions ] = useState( [] ) // filtered prediction of user to display
  const [ prdsLoading, setPrdsLoading ] = useState( true ) // filtered prediction of user to display


  useEffect( () => {
    // Once Compnnt mounts, get karnames of logged in user
    console.log( '--- Predictions PG Loaded ---' )
    getMyKarnames_DB()  // Get current user karnames when page load 
  }, [] )


  useEffect( () => {
    // Set default selected karname to display prds
    if ( thisWeek._id && karnames )
      setSelectedKarname( thisWeek._id )
  }, [ thisWeek, karnames ] )


  useEffect( () => {
    if ( selectedKarname ) {
      getPrdsOfKarname( selectedKarname._id )
    } else { }
  }, [ selectedKarname ] )


  useEffect( () => {
    console.log( '--- Selected Karname Changed.' )   // Good
    // *** When week selector changes, get user prds of karname by selected weekId from server
    // *** GET & SET prds of selected week by karname id for logged in user

    if ( selectedKarname ) {
      setPrdsLoading( true )   // To display spinner inside table
      getPrdsOfKarname( selectedKarname._id )
    }
  }, [ selectedKarname ] )


  const getPrdsOfKarname = async ( karnameId ) => {
    console.log( '--- getPrdsOfKarname()' )

    // This function should run once page load or selected week changes
    // api/predictions/me?karname=5fe0eb190d5f6428fcb22647

    if ( karnameId ) {
      console.log( '-- karnameId: ' + karnameId )   // *** UNDEFINED

      try {
        const response = await axios.get( `/api/predictions/me?karname=${ karnameId }` )

        console.log( response.data.data )   // Good Good
        setPredictions( response.data.data )  // set local state prds 

      } catch ( error ) {
        console.log( error )
      }

    } else {
      console.log( '--- No karname id!' )
      setPredictions( [] )
    }
    setPrdsLoading( false )
  }

  // const Spiner = () => <Spinner animation="border" variant="warning" />

  const handleRefreshClick = () => {
    setPrdsLoading( true )
    getPrdsOfKarname( selectedKarname._id )
  }

  //========================================================================================
  return <div className="pg">

    <div className="my-3 em-14 bold center">
      My Predictions
    </div>


    <div className="prds-table-container">
      {/** ====== Header ====== **/ }
      <div className="row mb-2">
        <div className="col col-sm-3 col-md-4"></div>

        <div className="col-6 col-sm-4 center ">
          <WeekSelector />
        </div>
        <div className="col-auto col-sm-3 col-md-4 pt-1 px-2 center">
          {/* <RefreshBtn onclick={ () => getPrdsOfKarname( selectedKarname._id ) } /> */ }
          <span className="white clickable em-12" onClick={ handleRefreshClick } >
            <i className="fas fa-redo" /> Refresh
            </span>
        </div>
      </div>

      <div className="mb-2 curved">
        <PredictionsTable prds={ predictions } vip={ false } loading={ prdsLoading } />



      </div>

      <PrdsTableFooter karname={ selectedKarname } />

    </div>



  </div>
}

export default PredictionsPg
