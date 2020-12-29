import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import Tooltipp from '../components-common/Tooltipp'
import UserTR from './UserTR'

const UsersTable = ( { users } ) => {


  // const [ tableHeaders, setTableHeaders ] = useState( [] )
  const tableHeaders = [ '_id', 'username', 'email', 'ide', 'createdAt', 'nPayments', 'balance' ]

  // const [ showScndRow, setshowScndRow ] = useState( false )
  const [ users_, setUsers_ ] = useState( [] )



  useEffect( () => {
    // console.log( users )
    if ( users )
      setUsers_( users )
  }, [ users ] )


  // Sort Array of Objects
  const sortUsersBy = ( x ) => {
    console.log( 'sort users by x ()' )
    let sortedUsers = users_.sort( ( a, b ) => ( a[ x ] < b[ x ] ) ? 1 : -1 )
    // console.log( sortedUsers )
    setUsers_( [] )
    setTimeout( () => setUsers_( sortedUsers ), 1 )

  }


  //============================================================================
  return <Table striped bordered hover size="sm" className="bg-fff curved-5">
    <thead>
      <tr className="center c-444 capitalize">
        { tableHeaders.map( item => <th key={ item }>
          <span className="clickable" onClick={ () => sortUsersBy( item ) }>{ item } </span>
        </th> ) }
      </tr>
    </thead>

    <tbody>
      { users_.map( ( user, index ) =>
        <UserTR key={ index } user={ user } /> ) }
    </tbody>
  </Table>
}

export default UsersTable
