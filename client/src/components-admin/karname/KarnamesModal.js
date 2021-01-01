import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import KarnamesTable from './KarnamesTable'
import FakeKarnameForm from './FakeKarnameForm'
import PayWinrsForm from './PayWinrsForm'
import {
  updateKarnamesOfWeek_stats,
  updateKarnamesOfWeek_position
} from '../../redux/actions/week-karname.actions';
import SpinrSuccsFail from '../../components-common/SpinrSuccsFail'
import Tooltipp from '../../components-common/Tooltipp'
import Checkmark from '../../components-common/Checkmark'
import { updateWeekTopUsers } from '../../redux/actions/admin.actions'
import { axos } from '../../utils'

const KarnamesModal = ( { week, show, handleShow } ) => {

  const [ karnames, setkarnames ] = useState( [] )
  const [ showFakeKarnameForm, setShowFakeKarnameForm ] = useState( true )
  const [ showPayWinrsForm, setShowPayWinrsForm ] = useState( true )
  const [ reqStatus, setReqStatus ] = useState( '' )  // [spinner - success - fail]


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

  const handleUpdateKarnames = async () => {
    setReqStatus( 'spinner' )
    let success = await updateKarnamesOfWeek_stats( week._id )
    success ? setReqStatus( 'success' ) : setReqStatus( 'fail' )
    setTimeout( () => setReqStatus( '' ), 2000 )     // Disappear after 3 seconds
  }

  const handleUpdatePostions = async () => {
    // {{URL}}/api/v1/ad/update-all-karnames-postion/5f4b77a4d8ee3563f442ac1d
    setReqStatus( 'spinner' )
    let success = await updateKarnamesOfWeek_position( week._id )
    success ? setReqStatus( 'success' ) : setReqStatus( 'fail' )
    setTimeout( () => setReqStatus( '' ), 2000 )     // Disappear after 3 seconds
  }
  const handleUpdateWeekTopUsers = async () => {
    // {{URL}}/api/v1/ad/make-top-users-of-week/5f4b77a4d8ee3563f442ac1d?updateWeek=true
    setReqStatus( 'spinner' )
    let success = await updateWeekTopUsers( week._id )
    success ? setReqStatus( 'success' ) : setReqStatus( 'fail' )
    setTimeout( () => setReqStatus( '' ), 2000 )     // Disappear after 3 seconds
  }

  //===============================================================================================
  return <Modal show={ show } onHide={ handleShow } size='lg' dialogClassName="modal-90w"  >
    <Modal.Header>
      <div className='row p-2 bg-blue'>
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

    <Modal.Body>
      <div className="row px-2 pt-3 black center">

        <div className="col">
          <Button variant="primary"
            //title="Update karnames stats (points,..)"
            onClick={ handleUpdateKarnames }
          > Up karname stats
          </Button>  { ' ' }

          <Button variant="secondary"
            onClick={ () => setShowFakeKarnameForm( !showFakeKarnameForm ) }
          //title="Add fake karname to take first positions"
          > + Fake karname
          </Button>  { ' ' }

          {/* update karname positions after adding fake karnames */ }
          <Button variant="primary" onClick={ handleUpdatePostions }
          >  <Tooltipp text='Up positions' hoverText='Update karnames position' />
          </Button> { ' ' }

          <Button variant="success"
            onClick={ () => setShowPayWinrsForm( !showPayWinrsForm ) }
          //title="Update winners balance"
          > Pay winners
          </Button> { ' ' }

          <Button variant="primary"
            onClick={ handleUpdateWeekTopUsers }
          // title="Create Ulist"
          > Up week.topUsers
          </Button> { ' ' }



          {/* <Button variant="danger" onClick={ handleShow }> close </Button> */ }
        </div>
        <div className="col-1">
          <SpinrSuccsFail status={ reqStatus } />
        </div>

        <div className="col-auto px-2">
          <Button variant='outline-success' onClick={ () => { getKarnamesOfWeek() } }>
            <span>&#8635;</span> Refresh
          </Button>
        </div>
      </div>

      <div className="p-1">
        { showFakeKarnameForm && <div className="border-aaa bg-eee p-2 m-2 curved">
          <FakeKarnameForm weekId={ week._id } />
        </div> }
        { showPayWinrsForm && <div className="border-aaa bg-eee p-2 m-2 curved">
          <PayWinrsForm weekId={ week._id } />
        </div> }
      </div>

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
