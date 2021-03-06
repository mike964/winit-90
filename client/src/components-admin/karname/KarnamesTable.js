import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Checkmark from '../../components-common/Checkmark'


const KarnamesTable = ( { karnames } ) => {



  // const [ karnames, st_karnames ] = useState( [] )
  // const { karnames } = useSelector( state => state.karname )


  // useEffect( () => {
  //   st_karnames( karnames )
  // }, [ karnames ] )


  // const [ expandedRows, setexpandedRows ] = useState( expandAll ? expandAll : false )

  return <Table striped bordered hover size="sm">
    <thead className="bg-info white">
      <tr className="center">
        <th>
          <span className="fl px-2">Tot: { karnames.length }</span>
          Karname ID
          </th>

        <th> karname.email </th>
        <th> karname.user.email </th>
        <th> Balance </th>
        <th> Pos </th>
        <th> T Prds </th>
        {/* total prds */ }
        <th> C Prds </th>
        {/* correct prds */ }
        <th> Points </th>
        <th> Paid </th>
      </tr>
    </thead>

    <tbody>
      { karnames && karnames.length >= 1 && karnames.map( ( karname, index ) =>
        <tr key={ index } className='center' >
          <td className='text-l pl-2'>
            <div className="px-2">
              { index + 1 } { '. ' } { karname._id }
              { karname.fake && <span className="boldd red px-2 fr">fake</span> }
            </div>
          </td>

          <td className="left">
            { karname.email }
          </td>

          <td className="left">
            { karname.user.email }
          </td>

          {/* <td>
            { karname.user && <div className='row px-2'>
              <div className="col txt-l">
                { karname.fake ? karname.email : karname.user.email }
              </div>
            </div> }
          </td> */}

          <td> ${ karname.user.balance } </td>

          <td>{ karname.position }</td>

          <td>{ karname.nPredictions }</td>

          <td>{ karname.fake ? 'fake' : karname.nCorrectPredictions }</td>

          <td>{ karname.points }</td>
          {/* <td>{ karname.gotPaid && 'T' }</td> */ }
          <td>{ karname.gotPaid ? <> ${ karname.reward } { '' }  <Checkmark /></> : '-' }</td>
        </tr> ) }
    </tbody>
  </Table>
}

export default KarnamesTable


// {
//   "year": "2020",
//   "_id": "5f20fc8930b3a120f41f0a0e",
//   "user": null,
//   "week": "5ef784237a1ede43c8bde46c",
//   "createdAt": "2020-07-29T04:35:21.223Z",
//   "__v": 0,
//   "nCorrectPredictions": 6,
//   "points": 60,
//   "nPredictions": 11,
//   "id": "5f20fc8930b3a120f41f0a0e"
// }