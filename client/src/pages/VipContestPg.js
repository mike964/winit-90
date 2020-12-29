import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux';
import MatchList from '../components/match/MatchList'
import MatchBar from '../components/match/MatchBar';
import { submitPredictions } from '../redux/actions/prediction.actions';
import { filterMatches } from '../redux/actions/filter.actions';
import MatchItem from '../components/match/MatchItem';
import MatchItemVip from '../components/vip/MatchItemVip';
import { getMatches_DB } from '../redux/actions/match.actions';
import RefreshBtn from '../components/RefreshBtn';

// Golden Contest Page
const VipContestPg = () => {

  const { currentTimeUnix } = useSelector( state => state.clock )
  const { matches } = useSelector( state => state.match )

  const [ vip_matches, setvip_matches ] = useState( [] )




  // FILTER OUT FINISHED MATCHES
  useEffect( () => {
    if ( matches ) {
      let x = matches.filter( ( mch ) => {
        let matchUnix = moment( mch.date ).format( 'X' )

        // console.log( matchUnix )
        // console.log( currentTimeUnix )
        return mch.vip === true && ( matchUnix > currentTimeUnix )
      } )

      setvip_matches( x )
    }
  }, [ matches, currentTimeUnix ] )

  console.log( vip_matches )

  //============================================================================
  return <div className="page">

    <div className="app-box py-3">

      <div className="row center py-3">
        <div className="col"></div>
        <div className="col">
          {/* <span className="em-14 bold gold">المسابقة الذهبیة</span> */ }
        </div>
        <div className="col">
          <RefreshBtn onclick={ getMatches_DB } />
        </div>
      </div>
      {/* <div className="border border-light ib p-2  clickable"> Europe | Africa | Asia </div>   */ }

      <div className="match-list-vip">
        { vip_matches && vip_matches.map( ( mch ) =>
          <MatchItemVip match={ mch } key={ mch._id } /> ) }
      </div>

    </div>
  </div>
}

export default VipContestPg
