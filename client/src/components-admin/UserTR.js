import React, { useState, useEffect } from 'react'

const UserTR = ( { user } ) => {

  const [ showScndRow, setshowScndRow ] = useState( false )

  return <>
    <tr className='text-l'>
      <td>
        <span className="clickable" onClick={ () => setshowScndRow( !showScndRow ) }>  { user._id }</span>
        { user.role === 'admin' && <span className="badg-pill bg-dred fr">Adm</span> }
        { user.fake && <span className="badg-pill bg-888 fr">Fake</span> }
      </td>

      <td> { user.username }  </td>
      <td>{ user.email }</td>
      <td>{ user.ide }</td>
      <td>{ user.createAt }</td>
      <td>{ user.nPayments }</td>
      <td>${ user.balance }</td>
    </tr>

    {/* SECOND ROW */ }
    { showScndRow && <tr className='x' >
      <td colSpan="12" className='text-center bg-w' >
        <span className="clickable ulineonhover mx-2">VIP prds</span>
        <span className="clickable ulineonhover mx-2">Payments</span>
        <span className="clickable ulineonhover mx-2">Karnames</span>
        <span className="clickable ulineonhover mx-2">Send Msg</span>
      </td>
    </tr> }
  </>
}

export default UserTR
