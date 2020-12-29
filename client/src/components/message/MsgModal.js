import React from 'react'
import moment from 'moment'
import { Modal } from 'react-bootstrap'

const MsgModal = ( { show, handleShow, msg } ) => {
  const { read, createdAt } = msg



  return <Modal show={ show } onHide={ handleShow }>

    <div className="headerrr row bg-lsky dblue bold p-1 mb-2">
      <div className="col textl pl-3">
        Congratulations! { ' ' }
        <i className="fas fa-gift" />
      </div>
      <div className="col textr fw-400">
        <span className="mr-3">{ moment( createdAt ).format( 'YYYY-MM-Do' ) }</span>
        <span className="fr bg-red bold white curved clickable px-2" onClick={ handleShow }>X</span>
      </div>
    </div>

    <div className="p-2">
      <div className="text-dark mb-3 px-2">
        Congratulations, you're reading this text in a modal!
      </div>
      <div className="center">
        <button
          className="btn btn-sm btn-outline-success w-100px"
          onClick={ handleShow }
        >  OK
    </button>
      </div>
    </div>
  </Modal>
}

export default MsgModal
