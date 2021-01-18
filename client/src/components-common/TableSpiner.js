import React from 'react'
import { Spinner } from 'react-bootstrap'

const TableSpiner = () => {
  return <tr>
    <th colSpan="9" className="text-center bg-white p-5">
      <Spinner animation="border" variant="warning" />
    </th>
  </tr>
}

export default TableSpiner
