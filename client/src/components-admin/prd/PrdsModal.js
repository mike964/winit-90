import React, { useState, useEffect } from 'react'
import { Modal, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import AdminPrdsTable from './AdminPrdsTable'

const PrdsModal = ( { match, show, handleShow, } ) => {

  // First Get prds of match when modal loades
  // No need to user Redux here

  const [ prds, setPrds ] = useState( [] )
  const [ vip, setVip ] = useState( false )


  const getPrdsOfMatch = async () => {
    // {{URL}}/api/v1/predictions?match=5f69d7219734703ed8e815a2 

    const response = await axios.get( `/api/predictions ? match = ${ match._id }` )

    console.log( response )

    // try-catch
    if ( response.data.success ) {
      setPrds( response.data.data )
    }
  }

  const getVIPrdsOfMatch = async () => {
    // {{URL}}/api/v1/vip?match=5f92d92b09e12f45a88d50da

    const response = await axios.get( `/api/vip?match=${ match._id }&populate=true` )

    console.log( response )

    // try-catch
    if ( response.data.success ) {
      setPrds( response.data.data )
    }
  }

  useEffect( () => {
    if ( show ) {
      getPrdsOfMatch()
    }
  }, [ show ] )

  //===========================================================================================
  //===========================================================================================
  return <Modal show={ show } onHide={ handleShow } size='lg' dialogClassName="modal-90w"  >
    <Modal.Header>
      <div className='row p-2 bold bg-blue-1'>
        <div className="col p-1 text-l">

          <span className="x">match.title: { match.title }</span>

        </div>
        <div className="col-auto p-1">
          <span className="x">resultKey: { match.resultKey }</span>
        </div>
        <div className="col-auto p-1">
          <span className="x">resultKey2: { match.resultKey2 }</span>
        </div>

      </div>
    </Modal.Header>

    <Modal.Body>
      <div className="p-2 center">
        <Button variant='success' onClick={ () => { setVip( false ); getPrdsOfMatch() } }>
          Refresh
        </Button>
        { ' ' }
        <Button onClick={ () => { setVip( true ); getVIPrdsOfMatch() } }>
          Get VIP Prds
      </Button>
      </div>
      <div className="bg-white black px-2">
        <AdminPrdsTable prds={ prds } vip={ vip } />
      </div>
    </Modal.Body>

    <div className="footer p-1 center">
      <Button variant="secondary" onClick={ handleShow }>
        Close </Button>
    </div>
  </Modal>
}

export default PrdsModal

