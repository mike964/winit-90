import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import FormGrup from '../../components-common/FormGrup'
import { axos } from '../../utils'


// Add Fake Karname Form (By Admin)
const FakeKarnameForm = ( { weekId } ) => {

  const fake_users = [
    { username: 'fake1', id: '5f5b70b784cbde291c3c1fa6' },
    { username: 'fake2', id: '5f5b7793fa75600d68411dfa' },
    { username: 'fake3', id: '5f5b7db2fa75600d68411dfb' },
    { username: 'fake4', id: '5f5b7df7fa75600d68411dfc' },
    { username: 'fake5', id: '5f5b7e15fa75600d68411dfe' },
    { username: 'fake6', id: '5f5cdfcc801a70483c5d311f' }
  ]

  // const [ fakeUserName, setFakeUserName ] = useState( '' )
  // const [ fakeUserId, setfakeUserId ] = useState( fake_users[ 0 ].id )   // Default selected
  // const [ nPredictions, setnPredictions ] = useState( '' )
  // const [ points, setpoints ] = useState( '' )

  // * Handle form inputs change
  const onChange = e => setState( { ...state, [ e.target.name ]: e.target.value } )


  const [ state, setState ] = useState( {
    week: weekId,       // weekId
    user: fake_users[ 0 ].id,       // fake user id  - default: first user
    name: '',       // fake user name to display
    email: '',      // fake user email to display
    nPredictions: 0,
    points: 0,
    domain: 'gmail',    // fake email domain  gmail/yahoo/outlook
  } )


  const createFakeKarname = async ( karname ) => {
    // ** POST : api/adm/add-fake-karname
    try {
      const response = await axos.post( `/api/adm/add-fake-karname`, karname )
      console.log( response )

      return true

    } catch ( error ) {
      console.log( error )
      return false
    }
  }


  // Handle Add Karname
  const handleSubmit = async ( e ) => {
    e.preventDefault()


    let newFakeKarname = {
      // week: weekId,
      // user: fakeUserId,
      // name: fakeUserName,
      // // year: '2020'
      // nPredictions,
      // points,
      ...state,
      email: `${ state.email }@${ state.domain }.com`,
      fake: true
    }

    if ( state.email && state.domain ) {
      let success = await createFakeKarname( newFakeKarname )
    }
    // console.log( newFakeKarname )
  }


  //===========================================================
  return <form onSubmit={ handleSubmit }>
    <div className="row black bold">
      {/* <div className="col-2 px-2">
        <p className="">Fake display name</p>
        <FormGrup
          name='name'   // fake user name
          placeholder='خلیل'
          value={ state.name }
          onChange={ onChange }
        />
      </div> */}

      <div className="col-3 px-2">
        <p className="">Fake display email gmail/yahoo</p>
        <div className="ib w-100px">
          <FormGrup
            name='email'   // fake user email
            placeholder='hasan***'
            value={ state.email }
            onChange={ onChange }
          />
        </div>
        <div className="ib px-1"> @ </div>
        <div className="ib w-80px">
          <FormGrup
            name='domain'
            value={ state.domain }
            onChange={ onChange }
          />
        </div>
        <div className="ib px-1"> .com </div>
      </div>

      <div className="col-2 px-2">
        <p className="x">Fake user Id</p>
        <select className="custom-select"
          name='user'   // fake user id
          value={ state.user }
          onChange={ onChange }
        > { fake_users.map( user =>
          <option value={ user.id } key={ user.username }>
            { user.username }
          </option> ) }
        </select>
      </div>

      <div className="col-2 px-2">
        <div className="ib">
          <p> nPredictions </p>
          <FormGrup
            name='nPredictions'
            value={ state.nPredictions }
            onChange={ onChange }
          />
        </div>
      </div>
      <div className="col-1 px-2">
        <p> points </p>
        <FormGrup
          name='points'
          value={ state.points }
          onChange={ onChange }
        />
      </div>
      <div className="col px-2">
        <p className="white">.</p>
        <Button type='submit' className="pill w-120px py-2">
          Submit
          </Button>
      </div>
    </div>
  </form>
}

export default FakeKarnameForm
