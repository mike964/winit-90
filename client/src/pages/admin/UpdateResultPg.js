import React from 'react'
import { Button } from 'react-bootstrap'


// ** Admin Update Results Page
// ** Update multiple result using api-football
const UpdateResultPg = () => {
  return <div className="x">
    <div className="container">

      <div className="center p-2">
        <span className="em-12 bold">Update multiple result using api-football</span>
      </div>
      <div className="row"> </div>

      <div className="p-3">
        <Button >Update Premier Lig Results</Button> { '' }
        <Button >Update La Liga Results</Button> { '' }
        <Button >Update Seri A Lig Results</Button> { '' }
        <Button >Update UCL Results</Button> { '' }
        <Button >Update UEL Lig Results</Button>
      </div>


    </div>
  </div>


}

export default UpdateResultPg
