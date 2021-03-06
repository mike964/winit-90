import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminNavbar from './AdminNavbar'
import InstructionsPg from './pages/InstructionsPg'
import KarnamesPg from './pages/KarnamesPg'
import UsersPg from './pages/UsersPg'
import ViprdsPg from './pages/ViprdsPg'
import { getMatches_DB } from '../redux/actions/match.actions'
import MatchPg from './pages/MatchPg'
import MultiplePg from './pages/MultiplePg'
import OddsPg from './pages/OddsPg'
import { getOdds_DB } from '../redux/actions/odds.action'

const AdminPg = () => {
  // const history = useHistory()
  // let { path, url } = useRouteMatch();

  const { thisWeek } = useSelector( state => state.week )

  useEffect( () => {
    // getAllMatches()
    getMatches_DB()
    getOdds_DB()
  }, [] )


  //========================================================================
  return <div className="admin-pg white bg-shadow-6 pb-3">

    <div className="row p-3">
      <div className="col em-11 bold">
        <i className="fas fa-user-lock" /> Admin Panel
        </div>
      <div className="col">
        <span className="bold">Current week : { thisWeek.id_ } </span>
        / { thisWeek._id } / { thisWeek.sequence }
      </div>
    </div>

    <div className="mb-22">
      <AdminNavbar />
    </div>

    <div className="x">
      <Switch>
        {/* <Route exact path='/'> Hello Adminn  </Route> */ }
        <Route exact path='/admin'> <MatchPg /> </Route>
        <Route path='/admin/users'> <UsersPg /> </Route>
        {/* <Route path='/admin/messages'>  </Route> */ }
        <Route path="/admin/matches" component={ MatchPg } />
        <Route path="/admin/multiple" component={ MultiplePg } />   {/* api-football */ }
        <Route path="/admin/vipredictions" component={ ViprdsPg } />
        <Route path="/admin/odds" component={ OddsPg } />
        <Route path="/admin/karnames" component={ KarnamesPg } />
        <Route path="/admin/users" component={ UsersPg } />
        <Route path="/admin/instructions" component={ InstructionsPg } />
      </Switch>
    </div>
  </div>
}

export default AdminPg
