import React from 'react'
import { Spinner } from 'react-bootstrap'

const SpinnersBox = () => {
  return <div className='p-1'>
    <Spinner as="span" animation="grow" size="smm" variant="success" />{ ' ' }
    <Spinner as="span" animation="grow" size="smm" variant="warning" /> { ' ' }
    <Spinner as="span" animation="grow" size="smm" variant="danger" />
  </div>
}

export default SpinnersBox
//     <Spinner as="span" animation="border" size="sm" variant="warning" />
//     <Spinner as="span" animation="grow" size="sm" variant="warning" />