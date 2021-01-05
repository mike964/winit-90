import React, { useState } from 'react'
// import axios from 'axios';
import someclubpng from '../img/some-club.png';

const Logo = ( {
  src,
  size,
  rounded,
  bg,
  className
} ) => {

  // let logoUrl = ( country ? `http://localhost:3500/logos/${ country }/${ name }.png`
  // const [ logoUrl, setlogoUrl ] = useState( '' )

  const [ altSrc, stAltSrc ] = useState( null )  // Alternative Logo When Error happens 

  // If Error: Change img src to alternative img  

  const logoStyle = {

    height: ( size ? `${ size }px` : '' ),
    // width: 'auto',
    // borderRadius: '50%',
    borderRadius: ( rounded ? '50%' : '' ),
    backgroundColor: ( bg ? bg : '' )
  }

  //====================================================================
  return <img
    className={ className ? className : '' }
    //src={ !altSrc ? logoUrl : altSrc }
    //src='https://media.api-sports.io/football/teams/66.png'
    src={ src ? src : altSrc }
    style={ logoStyle }
    //onError={ () => { console.log( 'say hi' ) } } 
    onError={ () => stAltSrc( someclubpng ) }
    alt="somelogo"
  />
}
export default Logo