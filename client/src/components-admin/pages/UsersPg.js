import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../../redux/actions/admin.actions'
import UsersTable from '../../components-admin/UsersTable'
import { Button } from 'react-bootstrap'

const UsersPg = () => {

  const [ users, setUsers ] = useState( [] )

  const getUsers_DB = async () => {
    // let x = await getAllUsers() 
    setUsers( await getAllUsers() )
  }

  // Once page mount get users from db
  useEffect( () => {

    getUsers_DB()

  }, [] )





  //=================================================================
  return <div>
    <div className="center p-3">
      <h5>Users PG</h5>
    </div>

    <div className="row p-2 center">
      <div className="col"></div>
      <div className="col"></div>
      <div className="col-auto">
        <Button onClick={ () => getUsers_DB() }>Refresh</Button>
      </div>
    </div>

    <div className="center">
      <UsersTable users={ users } />
    </div>
  </div>
}

export default UsersPg
