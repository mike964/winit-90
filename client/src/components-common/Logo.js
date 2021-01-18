import React, { useState } from 'react'
// import axios from 'axios';
import someclubpng from '../img/some-club.png';

const Logo = ( {
  src,
  size,
  rounded,
  bg,
  className,
  style
} ) => {

  // let logoUrl = ( country ? `http://localhost:3500/logos/${ country }/${ name }.png`
  // const [ logoUrl, setlogoUrl ] = useState( '' )

  const [ altSrc, stAltSrc ] = useState( null )  // Alternative Logo When Error happens 

  // If Error: Change img src to alternative img  

  const logoStyle = {

    width: '100%',
    maxWidth: size ? size : '',    // 25px
    // borderRadius: '50%',
    borderRadius: ( rounded ? '50%' : '' ),
    backgroundColor: ( bg ? bg : '' ),
    ...style
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
  //alt="logo"
  />
}
export default Logo