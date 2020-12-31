import React from 'react'
import { Spinner } from 'react-bootstrap'

const SpinnersBox = ( { small } ) => {

  return <div className='p-1'>
    <Spinner as="span" animation="grow" size={ small ? 'sm' : 'x' } variant="success" />{ ' ' }
    <Spinner as="span" animation="grow" size={ small ? 'sm' : 'x' } variant="warning" /> { ' ' }
    <Spinner as="span" animation="grow" size={ small ? 'sm' : 'x' } variant="danger" />
  </div>
}

export default SpinnersBox
//     <Spinner as="span" animation="border" size="sm" variant="warning" />
//     <Spinner as="span" animation="grow" size="sm" variant="warning" />