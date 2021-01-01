import React, { useState, useEffect } from 'react'
import MatchItem from './MatchItem';



const MatchList = ( { matches, league } ) => {

  // const [ matches, st_matches ] = useState( matches ? matches : [] )


  // console.log( matches )


  // if matches change
  // useEffect( () => {
  //   if ( matches )
  //     st_matches( matches )
  // }, [ matches ] )


  const getLigTitle = () => {

    if ( matches && matches.length > 0 ) {
      const ligs_with_no_country = [ 'ucl', 'uel', 'acl', 'ccl', 'rpl' ]
      const lig_shortName = matches[ 0 ].league.shortName

      if ( ligs_with_no_country.includes( lig_shortName ) ) {
        return `${ matches[ 0 ].league.fullName } `
      } else {
        return `${ matches[ 0 ].league.country } - ${ matches[ 0 ].league.fullName } `
      }
    }
  }

  const leagueTitle = getLigTitle()

  ////////////////////////////////////////////////////////////////////////////////
  //=============================================================================
  return <div className="match-list">

    {/* <div className="header-box">
      <div className="header">
        { matches && leagueTitle && <>
          <Logo name={ league } size='30' /> { ' ' }
          <span className="align-bottom">{ leagueTitle }</span>
        </> }
      </div>
    </div> */}

    { matches && matches.map( ( mch ) =>
      <MatchItem match={ mch } key={ mch._id } /> ) }
  </div>
}

export default MatchList