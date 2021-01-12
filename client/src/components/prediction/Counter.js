import React, { useState, useEffect } from 'react'
import DiceBtn from '../vip/DiceBtn'

const Counter = ( {
  value,
  onclick,             // handleGDcounter
  disabledd,      // buttons not clickable
  penalties    // match could end in penalties
} ) => {

  // const [ state, setState ] = useState( value >= 0 ? value : 1 )
  const [ state, setState ] = useState( -1 )
  // const [ disabled, st_disabled ] = useState( disabledd ? disabledd : false )


  const counterMax = ( penalties ? 5 : 4 )   // counter max values

  // If props.value change, change state here as well
  useEffect( () => {
    // In order to handle dice btn outside
    // if value which comes from props doesn't equal local state
    // if ( value !== state && state !== -1 ) {
    //   setState( value )
    // }
    if ( ( value || value === 0 ) && value !== state && state !== -1 ) {
      setState( value )
    }
    if ( !value && value !== 0 ) {
      setState( -1 )
    }
  }, [ value ] )



  // Random Number
  const randomNumberr = () => {
    const odds = [ 0, 1, 2, 3, 4, 0, 1 ]
    const randomNumber = Math.floor( Math.random() * 7 )
    // setState(randomNumber)
    // onclick( randomNumber )
    setState( odds[ randomNumber ] )
    onclick( odds[ randomNumber ] )
  }

  const handleCounter = ( x ) => {

    if ( state === counterMax && x === +1 ) {
      setState( 0 )
      onclick( 0 )

    } else if ( ( state === -1 || state === 0 ) && x === -1 ) {
      // Prevent going negative
      setState( counterMax )
      onclick( counterMax )
    } else if ( state === -1 && x === +1 ) {
      setState( 0 )
      onclick( 0 )   // st_goalDiff() in Parent Component state   
    } else {
      setState( state + x )
      onclick( state + x )   // st_goalDiff() in Parent Component state  
    }
  }

  // Get what text to display in component
  const getDisplay = ( counterValue ) => {
    if ( counterValue === -1 ) {
      return ' - '
    } else if ( counterValue === 0 ) {
      return '0'
    } else if ( counterValue === 4 ) {
      return '4+'
    } else if ( counterValue === counterMax ) {
      return 'P'   // penalties
    } else {
      return counterValue
    }
  }
  //======================================================================
  return <div className="d-flex justify-content-center">
    <>
      <div className="counter-box mx-1" >
        <div
          className="counter-btn"
          onClick={ () => handleCounter( - 1 ) }
          disabled={ disabledd }
        >{ disabledd ? '' : <i className="fas fa-minus" /> }
        </div>

        <div className="number" >
          { disabledd ? ' - ' : <>  { getDisplay( state ) }  </> }
        </div>

        <div
          className="counter-btn"
          onClick={ () => handleCounter( + 1 ) }
          disabled={ disabledd }
        > { disabledd ? ''
          : <i className="fas fa-plus" /> }
        </div>
      </div>

      <DiceBtn onclick={ () => randomNumberr() } disabled={ false }></DiceBtn>
    </>
  </div>
}


export default Counter

// <i className="fas fa-caret-right" />
// <i className="fas fa-caret-left" /> 