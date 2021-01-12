import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import AdminNavbar from '../components-admin/AdminNavbar'
import InstructionsPg from './admin/InstructionsPg'
import MatchPg from './admin/MatchPg'
import KarnamesPg from './admin/KarnamesPg'
import UsersPg from './admin/UsersPg'
import { getMatches_DB } from '../redux/actions/match.actions'
import ViPrdsPg from './admin/ViPrdsPg';
import { useSelector } from 'react-redux'
import UpdateResultPg from './admin/UpdateResultPg'

const AdminPg = () => {
  const history = useHistory()
  let { path, url } = useRouteMatch();

  const { thisWeek } = useSelector( state => state.week )

  useEffect( () => {
    // getAllMatches()
    getMatches_DB()
  }, [] )


  //========================================================================
  return <div className="admin-pg white bg-333">

    <div className="row p-2 my-2 bold ">
      <div className="col p-1 em-12 ">
        <i className="fas fa-user-lock" /> Admin Panel
        </div>
      <div className="col p-1">
        Current week :  { thisWeek.number } / { thisWeek._id }
      </div>
    </div>

    <div className="mb-2">
      <AdminNavbar />
    </div>

    <div className="x">
      <Switch>
        {/* <Route exact path='/'> Hello Adminn  </Route> */ }
        <Route exact path='/admin'> <MatchPg /> </Route>
        <Route path='/admin/users'> <UsersPg /> </Route>
        {/* <Route path='/admin/messages'>  </Route> */ }
        <Route path="/admin/matches" component={ MatchPg } />
        <Route path="/admin/update-results" component={ UpdateResultPg } />
        <Route path="/admin/vipredictions" component={ ViPrdsPg } />
        <Route path="/admin/karnames" component={ KarnamesPg } />
        <Route path="/admin/users" component={ UsersPg } />
        <Route path="/admin/instructions" component={ InstructionsPg } />
      </Switch>
    </div>
  </div>
}

export default AdminPg
