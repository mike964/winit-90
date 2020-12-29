import React from 'react'
import dicepng from '../../img/dice.png'

const DiceBtn = ( {
  onclick,
  disabled
} ) => {

  const classNamee = ( disabled ? 'dice-btn__disabled' : 'dice-btn' )


  // background-image: url(`${ process.env.REACT_APP_SERVER}/api/logos/${ country }/${ name }.png`);


  return <div className={ classNamee }
    onClick={ () => { if ( !disabled ) onclick() } }
  >
    {/* <img src={ `${ process.env.REACT_APP_SERVER}/api/img/dice.png` } alt='dice' /> */ }
    <img src={ dicepng } alt='dice' className='dice-img' />
  </div>
}

export default DiceBtn
