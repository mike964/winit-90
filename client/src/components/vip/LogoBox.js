import React, { useState } from 'react'
import Logo from '../../components-common/Logo'
import { useEffect } from 'react'


// Team logo box
const LogoBox = ( {
  // _name,
  team,
  label,  // In order to diplay at bottom of the logo
  lig,
  onclick,
  clickable,
  clicked,
  size,
  bgColor, // gold or green
} ) => {

  const [ classname, st_classname ] = useState( clickable ? "logo-box clickable" : "logo-box" )
  const [ logoSrc, setLogoSrc ] = useState( null )

  // If team1 / team2 === null set team_home or team_away


  const handleClick = () => {
    if ( clickable && onclick ) {
      onclick()
      st_classname( "logo-box clicked" )
    }
  }


  useEffect( () => {
    if ( clickable === true )
      st_classname( "logo-box clickable" )
    if ( clickable === false )
      st_classname( "logo-box" )
  }, [ clickable ] )


  useEffect( () => {
    if ( clicked === true )
      st_classname( "logo-box clicked" )
    if ( clicked === false )
      st_classname( "logo-box clickable" )
  }, [ clicked ] )


  // *** Get team logo url
  // if team.shorName exist => src = `/api/logos/${ country }/${ team.shorName }.png`
  // Else : if (team_home exist) => src team_home.logo

  useEffect( () => {
    if ( team.shortName ) {
      setLogoSrc( `/api/logos/${ team.country.toLowerCase() }/${ team.shortName }.png` )
    } else {
      setLogoSrc( team.logo )
    }
  }, [ team ] )


  //=============================================================
  return <div className={ classname } onClick={ handleClick }  >
    { logoSrc && <Logo
      //name={ _name ? _name : team.shortName }
      //country={ team ? team.country : '' }
      //team={ team }
      //lig={ lig ? lig : false }
      size={ size }
      src={ logoSrc }
    /> }
  </div>
}

export default LogoBox
