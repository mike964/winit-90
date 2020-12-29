import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import MsgItem from '../components/message/MsgItem'
import { getMyMessages } from '../redux/actions/msg.actions'
import { Spinner } from 'react-bootstrap'

const MsgsPg = () => {
  const { messages } = useSelector( state => state.msg )
  const msgLoding = useSelector( state => state.msg.loading )

  const [ showSpinner, setshowSpinner ] = useState( true )


  useEffect( () => {
    console.log( 'Messages PG Loaded' )
    getMyMessages()
  }, [] )

  useEffect( () => {
    msgLoding ? setshowSpinner( true ) : setshowSpinner( false )
  }, [ msgLoding ] )


  return <div className="page pt-2">
    <div className="py-3 center">
      {/* <h4>Messages</h4> */ }
      <h5>الرسائل</h5>
    </div>

    <div className="msgs-box">
      <div className="list-group curved-0">
        { !showSpinner
          ? <>
            { messages && messages.map( ( item, index ) =>
              <MsgItem msg={ item } key={ index } /> ) }
          </>
          : <div className="text-center">
            <Spinner animation="border" variant="warning" />
          </div> }
      </div>
    </div>

  </div>
}

export default MsgsPg
