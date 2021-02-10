import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import KarnamesTable from './KarnamesTable'
import FakeKarnameForm from './FakeKarnameForm'
import PayWinrsForm from './PayWinrsForm'
import ScssFailSpinr from '../../components-common/ScssFailSpinr'
import Tooltipp from '../../components-common/Tooltipp'
import Checkmark from '../../components-common/Checkmark'
import { axos } from '../../utils'
import PayWinrByKarnameForm from './PayWinrByKarnameForm'


// ** Admin ===============================================================
const KarnamesModal = ( { week, show, handleShow } ) => {

  const [ karnames, setkarnames ] = useState( [] )
  const [ reqStatus, setReqStatus ] = useState( '' )  // [spinner - success - fail]
  const [ showForms, setShowForms ] = useState( false )


  useEffect( () => {
    if ( show )
      getKarnamesOfWeek()
  }, [ show ] )


  const getKarnamesOfWeek = async () => {
    // {{URL}}/api/v1/karnames?week=5ef7b5667a1ede43c8bde471&sort=-points

    try {
      const response = await axos.get( `/api/karnames?week=${ week._id }&sort=-points` )
      // console.log( response )
      setkarnames( response.data.data )

    } catch ( error ) {
      console.log( error )
    }
  }

  // ** Update karname points of week ID
  const updateKarnamesOfWeek_stats = async ( weekId ) => {
    console.log( '---- updateKarnamesOfWeek_stats() ----' )
    // console.log( weekId )  
    try {
      const response = await axios.get( `/api/adm/update-all-karnames/${ weekId }` )
      // console.log( response.data ) 
      return true
    } catch ( error ) {
      console.log( error )
      return false
    }
  }

  const handleUpdateKarnames = async () => {
    setReqStatus( 'spinner' )
    let success = await updateKarnamesOfWeek_stats( week._id )
    success ? setReqStatus( 'success' ) : setReqStatus( 'fail' )
    setTimeout( () => setReqStatus( '' ), 2000 )     // Disappear after 3 seconds
  }


  const handleUpdatePostions = async () => {
    // ** Update [karname.position] for all karnames of week ID
    // {{URL}}/api/v1/ad/update-all-karnames-postion/5f4b77a4d8ee3563f442ac1d

    setReqStatus( 'spinner' )
    // {{URL}}/api/v1/ad/update-all-karnames-postion/5f4b77a4d8ee3563f442ac1d
    // console.log( weekId ) 
    try {
      const response = await axios.get( `/api/adm/update-all-karnames-postion/${ week._id }` )
      console.log( response.data )

      response.data.success ? setReqStatus( 'success' ) : setReqStatus( 'fail' )

    } catch ( error ) {
      console.log( error )
      setReqStatus( 'fail' )
    }

    setTimeout( () => setReqStatus( '' ), 2000 )     // Disappear after 2 scnds
  }


  const handleUpdateWeekTopUsers = async () => {
    // {{URL}}/api/v1/ad/make-top-users-of-week/5f4b77a4d8ee3563f442ac1d?updateWeek=true
    setReqStatus( 'spinner' )
    let success = await updateWeekTopUsers( week._id )
    success ? setReqStatus( 'success' ) : setReqStatus( 'fail' )
    setTimeout( () => setReqStatus( '' ), 3000 )     // Disappear after 3 seconds
  }

  // ** Make Top Users - update week.topUsers by Admin
  const updateWeekTopUsers = async ( weekId ) => {
    // {{URL}}/api/v1/ad/make-top-users-of-week/5f4b77a4d8ee3563f442ac1d?updateWeek=true

    // ** NOT COMPLETED YET **  

    try {
      const response = await axos.get( `/api/adm/make-top-users-of-week/${ weekId }?updateWeek=true` )
      console.log( response )  // Good 
      return true
    } catch ( error ) {
      return false
    }
  }

  //===============================================================================================
  return <Modal show={ show } onHide={ handleShow } size='lg' dialogClassName="modal-90w"  >
    <Modal.Header>
      <div className='row p-2' style={ { background: '#6dd16d' } }>
        <div className="col p-1 black bold">
          <span className="px-1"> Karnames of week :</span>
          <span className="px-1 white">{ week._id }</span>
          <span className="px-1">({ week.year } - { week.number })</span>
        </div>
        <div className="col p-1 white">
          <span className='x'> winnersGotPaid : { week.winnersGotPaid ? <Checkmark /> : '-' } </span>
          <span className="black px-3"> | </span>
          <span className='x'> topUsersUpdated : { week.topUsersUpdated ? <Checkmark /> : '-' } </span>
        </div>
      </div>
    </Modal.Header>

    <Modal.Body className="bg-w">
      <div className="hint">
        <p className="">
          <span className="boldd">Hint: </span>
          <span className="x"> 1st. up karname stats</span>
          <span className="x"> 2. Add fake karname to take first positions</span>
          <span className="x"> 3.Click update positions</span>
          <span className="x"></span>

        </p>
      </div>

      <div className="row p-3 mb- black center">
        <div className="col">
          <Button variant="primary"
            //title="Update karnames stats (points,..)"
            onClick={ handleUpdateKarnames }
          > Up karname stats
          </Button>  { ' ' }

          {/* update karname positions after adding fake karnames */ }
          <Button variant="primary" onClick={ handleUpdatePostions }
          >  <Tooltipp text='Up positions' hoverText='Update karname.position for all' />
          </Button> { ' ' }

          <Button variant="primary"
            onClick={ handleUpdateWeekTopUsers }
          // title="Create Ulist"
          > Up week.topUsers
          </Button> { ' ' }

          <Button variant="outline-success" onClick={ () => setShowForms( !showForms ) }>
            Show forms { ' ' } <i className="fas fa-chevron-down" />
          </Button>

          {/* <Button variant="danger" onClick={ handleShow }> close </Button> */ }
        </div>
        <div className="col-1">
          <ScssFailSpinr status={ reqStatus } />
        </div>

        <div className="col-auto px-2">
          <Button variant='outline-success' onClick={ () => { getKarnamesOfWeek() } }>
            <span>&#8635;</span> Refresh
          </Button>
        </div>
      </div>

      { showForms && <div className="p-3">
        <div className="bg-w border-ccc p-3 mb-3">
          <p className="labl"> Add Fake karname</p>
          <FakeKarnameForm weekId={ week._id } />
        </div>

        <div className="bg-w border-ccc p-3 mb-3">
          <p className="labl">Pay winner by karname ID</p>
          <PayWinrByKarnameForm />
        </div>

        <div className="bg-w border-ccc p-3">
          <p className="labl">Pay multiple winners - not tested 100%</p>
          <PayWinrsForm weekId={ week._id } />
        </div>
      </div> }


      <div className="bg-white black px-2">
        <KarnamesTable karnames={ karnames } />
      </div>

      <div className="m-2 p-3 bg-ddd black">
        <div className="x">T Prds: total Prds </div>
        <div className="x">C Prds: correct prds</div>
        <div className="x">Paid: karname.paid (boolean)</div>
      </div>
    </Modal.Body>

  </Modal>
}

export default KarnamesModal
