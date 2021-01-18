import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import MatchCollapse from './MatchCollapse';
import MatchItem from './MatchItem';



const MatchList = ( { matches, league } ) => {

  // const [ matches, st_matches ] = useState( matches ? matches : [] )

  const [ prligMatches, setPrligMatches ] = useState( [] )   // england - prlig
  const [ spligMatches, setSpligMatches ] = useState( [] )   // spain - la liga
  const [ itligMatches, setItligMatches ] = useState( [] )   // italy seri a

  // console.log( matches )


  const filterMatchesByLig = ( matches, ligId ) => {  // lig id: 39 , 135 , 140
    // ** filter array of matches by league id 
    let x = matches.filter( ( item ) => item.league.id === ligId )
    return x
  }


  // if matches change
  useEffect( () => {
    if ( matches ) {
      setPrligMatches( filterMatchesByLig( matches, 39 ) )
      setSpligMatches( filterMatchesByLig( matches, 140 ) )
      setItligMatches( filterMatchesByLig( matches, 135 ) )
    }
  }, [ matches ] )


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
  return <div className="match-list p-0 p-sm-1" style={ { maxWidth: '640px' } }>



    {/* { matches && matches.map( ( mch ) => <MatchItem match={ mch } key={ mch._id } /> ) } */ }

    {/* <MatchCollapse lig='prlig' matches={ matches } collapseId='id-100' /> */ }

    { prligMatches.length &&
      <MatchCollapse
        title='England - Premier League'
        matches={ prligMatches }
        ligId='prlig'
      /> }

    { spligMatches.length &&
      <MatchCollapse
        title='Spain - La liga'
        matches={ spligMatches }
        ligId='splig'
      /> }



    { !matches.length && <div className="py-5 text-center bold">
      <span className="white">لا توجد مباریات لهذا الاسبوع</span>
    </div> }

  </div>


}

export default MatchList
