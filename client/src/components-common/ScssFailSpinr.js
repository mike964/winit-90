import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'

const ScssFailSpinr = ( { status } ) => {
  // status is req status //   ['sp', 'sccs' , 'fail']
  // If req.start => Show spinner
  // If req success => Show Done
  // If Req fails => Show Red x 


  const [ statuss, setStatuss ] = useState( '' )

  useEffect( () => {
    // if ( status && status !== statuss ) {
    setStatuss( status )
    // Disappear after 3 seconds
    // setTimeout( () => setStatuss( 'disappear' ), 3000 )
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ status ] )
  // // Shit above doesn't owrk well


  const stylee = {
    fontFamily: "Arial",
    //padding: "6px",
    fontSize: '1.2rem',
    // fontSize: '1rem',
    fontWeight: '500'
    //backgroundColor: "white",
  }

  return <span className={ statuss ? 'badge-sm bg-w mx-1' : '' } style={ stylee } >
    { statuss === 'spinner'
      && <Spinner as="span" animation="border" variant="warning" size="sm" /> }
    { statuss === 'success'
      && <span className='green' >&#10004;</span> }
    { statuss === 'fail'
      && <span className='red'>&#10006;</span> }
    { !statuss && <></> }
  </span>
}

export default ScssFailSpinr
