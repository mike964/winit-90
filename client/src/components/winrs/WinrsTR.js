import React from 'react'
// import { calculatePrize } from '../../redux/functions'
// import WinCoinSvg from '../../svg/WinCoinSvg'

const WinrsTR = ( { winner } ) => {

  const { position, name, nPredictions, points, prize } = winner

  // let prize = 0
  // if ( winner )
  //   prize = calculatePrize( position )


  const getBgColor = ( pos ) => {
    if ( pos === 1 ) return 'bg-gold'
    if ( pos === 2 ) return 'bg-silver'
    if ( pos === 3 ) return 'bg-bronze'
  }

  let bgColorr = getBgColor( position )
  // console.log( winner.ide )   // for test
  return <>
    { winner && <tr className='x'>
      <td className={ 'text-center bold ' + bgColorr } width="60">
        { position }
      </td>
      <td>  { name } </td>
      <td className='text-center bold' width="50">
        { nPredictions }
      </td>
      {/* <td> { winner.nCorrectPredictions } </td> */ }
      <td className='text-center bold' width="50">
        { points }
      </td>

      <td className={ 'text-center bold ' + bgColorr } width="120">
        { prize && prize > 0 ? `$${ prize }` : '-' }
      </td>
    </tr> }
  </>
}

export default WinrsTR
