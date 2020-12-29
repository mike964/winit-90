import React from 'react'
import Checkmark from '../../components-common/Checkmark'

const PrdsofMatchTR = ( { prd } ) => {

  const { vip, user, answerKey, answerKey2, correct, correctGD, points, possibleWinning } = prd

  return <tr>
    <td>{ prd._id }</td>
    <td>{ user.username } - { user._id } </td>
    <td>{ answerKey }</td>
    <td>{ correct === null ? 'null' : ( correct ? <Checkmark /> : 'x' ) }</td>

    { !vip && <>
      <td>{ answerKey2 }</td>
      <td>{ correctGD === null ? 'null' : ( correctGD ? <Checkmark /> : 'x' ) }</td>
    </> }

    <td>{ vip ? possibleWinning : points }</td>

    { vip && <>
      <td>{ prd.stake }</td>
      <td>{ prd.gotPaid ? 'T' : '-' }</td>
    </> }
  </tr>
}

export default PrdsofMatchTR
