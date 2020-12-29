import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import EditMatchForm from './EditMatchForm';
import { setCurrentMatch } from '../../redux/actions/match.actions'

const EditMatchModal = ( { match, handleShow, show } ) => {


  // const [ show, setShow ] = useState( false )
  // const [ show, setShow ] = useState( false )
  // const handleModalShow = () => setShow( !show )

  // const handleClick = () => {
  //   handleModalShow()
  //   setCurrentMatch( match )
  // }

  //================================================================================
  return <>
    <Modal show={ show } onHide={ handleShow }>

      <Modal.Header >
        <div className="p-2">
          <span className="white em-12 bold">Update Match <i className="fas fa-pen" /></span>
        </div>
      </Modal.Header>

      {/* modal body */ }
      <div className="px-2">
        {/* Both for Edit Match (Info + Result) */ }
        <EditMatchForm handleModalShow={ handleShow } />
      </div>

    </Modal>
  </>
}

export default EditMatchModal 