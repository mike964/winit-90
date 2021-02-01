import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import MatchCollapse from './MatchCollapse';
import MatchItem from './MatchItem';



const MatchList = ( { matches, league } ) => {

  // const [ matches, st_matches ] = useState( matches ? matches : [] )

  const [ prligMatches, setPrligMatches ] = useState( [] )   // england - prlig
  const [ spligMatches, setSpligMatches ] = useState( [] )   // spain - la liga
  const [ itligMatches, setItligMatches ] = useState( [] )   // italy seri a
  const [ frligMatches, setFrligMatches ] = useState( [] )   // italy seri a
  const [ uclMatches, setUclMatches ] = useState( [] )   // italy seri a
  const [ uelMatches, setUelMatches ] = useState( [] )   // italy seri a 

  // ** coming soon : uefa nations lig

  // console.log( matches )


  const filterMatchesByLig = ( matches, ligId ) => {  // lig id: 39 , 135 , 140
    // ** filter array of matches by league id 
    let x = matches.filter( ( item ) => item.league.id === ligId )
    return x
  }


  // if matches change
  useEffect( () => {
    if ( matches ) {
      setUelMatches( filterMatchesByLig( matches, 2 ) )
      setUclMatches( filterMatchesByLig( matches, 3 ) )
      setPrligMatches( filterMatchesByLig( matches, 39 ) )
      setSpligMatches( filterMatchesByLig( matches, 140 ) )
      setItligMatches( filterMatchesByLig( matches, 135 ) )
      setFrligMatches( filterMatchesByLig( matches, 61 ) )
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

  const leagues = [
    {
      title: 'UEFA Champions League',
      matches: uclMatches,
      ligId: 'ucl',
      ligCode: '2'
    },
    {
      title: 'England - Premier League',
      matches: prligMatches,
      ligId: 'prlig',
      ligCode: '39'
    },
    {
      title: 'Spain - La Liga',
      matches: spligMatches,
      ligId: 'splig',
      ligCode: '140'
    },
    {
      title: 'Italy - Serie A',
      matches: itligMatches,
      ligId: 'itlig',
      ligCode: '135'
    },
    {
      title: 'France - Ligue 1',
      matches: frligMatches,
      ligId: 'frlig',
      ligCode: '61'
    },
    {
      title: 'Europa League',
      matches: uelMatches,
      ligId: 'uel',
      ligCode: '3'
    },
  ]

  ////////////////////////////////////////////////////////////////////////////////
  //=============================================================================
  return <div className="match-list p-0 p-sm-1" style={ { maxWidth: '640px' } }>


    {/* { matches && matches.map( ( mch ) => <MatchItem match={ mch } key={ mch._id } /> ) } */ }

    {/* <MatchCollapse lig='prlig' matches={ matches } collapseId='id-100' /> */ }

    {/* <MatchCollapse
      title='England - Premier League'
      matches={ prligMatches }
      ligId='prlig'
    />  */}

    { matches.length > 0 && leagues.map( item =>
      <MatchCollapse
        title={ item.title }
        matches={ item.matches }
        ligId={ item.ligId }
        open_={ item.ligCode === '39' ? true : false }  // Set Pr lig collapse open by default
      /> ) }

    { !matches.length && <div className="py-5 text-center bold">
      <span className="white">لا توجد مباریات لهذا الاسبوع</span>
    </div> }

  </div>


}

export default MatchList
