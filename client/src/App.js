import React, { useState, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePg from './pages/HomePg'
// import AboutPg from './pages/AboutPg' 
import MatchesPg from './pages/MatchesPg'
// import NewsPg from './pages/NewsPg'
import WinrsPg from './pages/WinrsPg'
import RulesPg from './pages/RulesPg'
import Dashboard from './pages/Dashboard'
import Unauthorized from './pages/Unauthorized'
// import Clock from './components/layout/Clock'
import Cookies from 'js-cookie'
import { loadUser } from './redux/actions/auth.actions'
import { getMatches_DB } from './redux/actions/match.actions'
import { loadPredictions, getAllMyPredictions } from './redux/actions/prediction.actions'
import { getAllWeeks } from './redux/actions/week-karname.actions'
import VipContestPg from './pages/VipContestPg'
import { getMyVipredictions } from './redux/actions/vip.actions'
import { getMyKarnames_DB } from './redux/actions/week-karname.actions'
import PrivateRoute from './components-common/PrivateRoute'
import ChargeBalancePg from './pages/payment/ChargeBalancePg'
import CashoutPg from './pages/payment/CashoutPg'
// import ScssfulPaymentPg from './pages/payment/ScssfulPaymentPg' 
import PredictionsPg from './pages/PredictionsPg'
import MsgsPg from './pages/MsgsPg'
import MyGoldPrdsPg from './pages/MyGoldPrdsPg'
import AdminPg from './components-admin/AdminPg'

//==================================================================================
const App = () => {

  console.log( 'NODE_ENV: ' + process.env.NODE_ENV )   // output: ['development' , 'production']


  useEffect( () => {
    // ** Get Matches & Weeks from DB
    console.log( '--- App mounted.' )
    getMatches_DB()
    getAllWeeks()
  }, [] )



  useEffect( () => {
    // ** Load User once the App mount 
    const load_user = async () => {
      // Passport js : Get {...user} from DB when App Mounts :if cookie/token exist in browser'

      let user_loaded_successfully = await loadUser()

      console.log( '--- User loaded success: ' + user_loaded_successfully )

      if ( user_loaded_successfully ) {  // ** Load user data:  prds, msgs, karnames, ... 
        // ** Load prds of this and next week of user to redux
        loadPredictions()
        // *** Get all my predictions from DB, in order to display in Dashboard
        // getAllMyPredictions()
        // getMyVipredictions()
        // GET My Karnames from DB
        // getMyKarnames_DB() 
        // getAllMyPredictions()
        // getMyMessages()
      }
    }

    load_user()
    // if ( token ) loadUserr()
    // eslint-disable-next-line
  }, [] )

  //===========================================================================================
  return <div className="app">
    <Router>
      <Navbar />
      {/* <Clock /> */ }

      {/* XS Drowdown (instead of sidebar) */ }
      {/* <div className="d-sm-none fl">
        <XsDropdown />
      </div> */}




      <Switch>
        {/* <Route exact path="/" component={ HomePg } /> */ }
        {/* <Route exact path="/news" component={ NewsPg } /> */ }
        <Route exact path="/" component={ MatchesPg } />
        <Route path="/matches" component={ MatchesPg } />
        <PrivateRoute path="/goldencontest" component={ VipContestPg } />
        <Route path="/winners" component={ WinrsPg } />
        <Route path="/rules" component={ RulesPg } />
        {/* <Route exact path="/dashboard" component={ Dashboard } /> */ }
        {/* <Route path="/dashboard" > <Dashboard />  </Route> */ }
        {/* <PrivateRoute path="/dashboard" component={ Dashboard } /> */ }
        <PrivateRoute path="/admin" admin component={ AdminPg } />
        <Route path="/unauthorized" component={ Unauthorized } />
        <PrivateRoute path="/cashout" component={ CashoutPg } />
        <PrivateRoute path="/charge-balance" component={ ChargeBalancePg } />
        {/* <Route path="/checkout?success=true" component={ ScssfulPaymentPg } /> */ }

        <PrivateRoute path='/predictions' component={ PredictionsPg } />
        <PrivateRoute path='/predictions-gold' component={ MyGoldPrdsPg } />
        <PrivateRoute path='/messages' component={ MsgsPg } />
        {/* <PrivateRoute path='/settings' component={ SettingsPg } /> */ }

        <Route path="*"  >
          <div className="center p-5 fs-20 boldd"> 404 Not Found </div>
        </Route>

      </Switch>

    </Router>
  </div>

}


export default App
