import moment from 'moment'
import React, { useState } from 'react'
import MsgModal from './MsgModal'

const MsgItem = ( { msg } ) => {
  const { read, createdAt } = msg

  console.log( msg )
  const [ showModal, setShowModal ] = useState( false )

  const handleModalShow = () => setShowModal( !showModal )




  return <>
    <div className="list-group-item text-dark p-1">
      <div className="row p-1">
        <div className="col-auto pt-1 px-3 em-14">
          { read
            ? <i className="far fa-envelope-open" />
            : <i className="far fa-envelope" /> }
        </div>
        <div className="col pt-1 px-2 text-r clickable" onClick={ handleModalShow }>
          <span className={ !msg.read ? 'bold' : 'x' } >
            { msg.txt }
          </span>
        </div>
        <div className="col-auto pt-1 px-3">
          <span className="x">
            { moment( createdAt ).format( 'YYYY MMM Do ' ) }
          </span>
        </div>
      </div>
    </div>

    <MsgModal show={ showModal } handleShow={ handleModalShow } msg={ msg } />
  </>
}

export default MsgItem