import React, { useState, useEffect } from 'react'
// import { setSidebar } from '../redux/actions/global.actions'
import {
  Switch,
  Route,
} from "react-router-dom";
import Sidebar from './Sidebar'
import MatchesPg from './MatchesPg'
import PredictionsPg from './PredictionsPg'
import { useSelector } from 'react-redux'
import GoldenPredictions from './MyGoldPrdsPg'
import HonoursPg from './HonoursPg'
import MessagesPg from './MsgsPg'
import MyGoldPrdsPg from './MyGoldPrdsPg';

const Dashboard = () => {
  // const history = useHistory()
  // let { path, url } = useRouteMatch();

  // console.log( '--- Dashboard --- )  
  // console.log( path )   //   output:  /dashboard
  // console.log( url )    //   output:  /dashboard

  // const { sidebar } = useSelector( state => state.global )
  // const { isAuthenticated } = useSelector( state => state.auth )



  // if ( !isAuthenticated )
  //   history.push( '/' )
  // if ( !token ) {
  // history.push( '/' )
  // }

  //=====================================================
  return <div className="page dashboard">

    {/* <div className="d-flex"> */ }

    <Sidebar />

    <div className="content">
      {/* Nested Routes */ }
      {/* { sidebar === '' && <PredictionsPg /> }
      { sidebar === 'predictions' && <PredictionsPg /> }
      { sidebar === 'goldenPredictions' && <GoldenPredictions /> } 
      { sidebar === 'cashout' && <CashoutPg /> } */}

      <Switch>
        <Route exact path='/dashboard'>
          <PredictionsPg />
        </Route>
        <Route path='/dashboard/my-prds'   >
          <PredictionsPg />
        </Route>
        <Route path='/dashboard/my-goldprds'   >
          <MyGoldPrdsPg />
        </Route>
        <Route path='/dashboard/messages'>
          <MessagesPg />
        </Route>
        <Route path='/dashboard/honours'  >
          <HonoursPg />
        </Route>
        <Route path='/dashboard/settings' >
          <h3>Settings PG</h3>
        </Route>
      </Switch>
    </div>
    {/* </div> */ }

  </div>
}

export default Dashboard
