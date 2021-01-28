import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import FormGrup from '../../components-common/FormGrup'
import { createFakeKarname } from '../../redux/actions/week-karname.actions';


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

  const [ fakeUserName, setFakeUserName ] = useState( '' )
  const [ fakeUserId, setfakeUserId ] = useState( fake_users[ 0 ].id )   // Default selected
  const [ nPredictions, setnPredictions ] = useState( '' )
  const [ points, setpoints ] = useState( '' )




  // Handle Add Karname
  const handleSubmit = async ( e ) => {
    e.preventDefault()


    let newFakeKarname = {
      week: weekId,
      user: fakeUserId,
      name: fakeUserName,
      // year: '2020'
      nPredictions,
      points,
      fake: true
    }

    let success = await createFakeKarname( newFakeKarname )

    console.log( newFakeKarname )
  }


  return <form onSubmit={ handleSubmit }>
    <div className="row black bold">
      <div className="col p-1">
        <span className="">Fake user display name</span>
        <FormGrup
          name='fake user name'
          placeholder='عبود خلیل'
          value={ fakeUserName }
          onChange={ e => setFakeUserName( e.target.value ) }
        />
      </div>

      <div className="col p-1">
        <span className="x">Fake user Id</span>
        <select className="custom-select"
          value={ fakeUserId }
          onChange={ ( e ) => setfakeUserId( e.target.value ) }
        > { fake_users.map( user =>
          <option value={ user.id } key={ user.username }>
            { user.username }
          </option> ) }
        </select>
      </div>

      <div className="col p-1">
        <span className="white">.</span>
        <FormGrup
          placeholder='nPredictions'
          value={ nPredictions }
          onChange={ e => setnPredictions( e.target.value ) }
        />
      </div>
      <div className="col p-1">
        <span className="white">.</span>
        <FormGrup
          placeholder='points'
          value={ points }
          onChange={ e => setpoints( e.target.value ) }
        />
      </div>
      <div className="col p-1 px-3">
        <span className="white">.</span>
        <Button block type='submit'>
          Submit
          </Button>
      </div>
    </div>
  </form>
}

export default FakeKarnameForm
