import moment from 'moment'

export const match_isToday = ( matchDate ) => {
  // return true if match is today
  if ( moment().format( 'YYYY-MM-DD' ) === moment( matchDate ).format( 'YYYY-MM-DD' ) )
    return true
  //else return false
}

export const match_started = ( nowEpoch, matchDateEpoch ) => {
  // nowEpoch comes from redux store, in order to get updated every couple seconds
  return nowEpoch >= matchDateEpoch
}


export const getRandomNumber = () => {
  // return random number bw 0 - 4

  // Fix odds ratios to make it more logical 

  const odds = [ 0, 1, 2, 0, 1, 2, 0, 1, 3, 4 ]
  const randomNumber = Math.floor( Math.random() * 10 )
  // console.log( randomNumber )

  // return Math.floor( Math.random() * 6 )
  return odds[ randomNumber ]
}

export const getGoalDifference = ( team1Goals, team2Goals ) => {

  if ( team1Goals === team2Goals ) {
    return 0
  }
  if ( team1Goals > team2Goals ) {
    return team1Goals - team2Goals
  }
  if ( team1Goals < team2Goals ) {
    return team2Goals - team1Goals
  }
}


export const filterVipredictions = () => { }




export const getViPredictinTxt = ( gd, winner, p ) => {

}

// Get What to display for vip predictin item in Arabic
//========================================================
export const getPredictionTxt = ( gd, winner ) => {
  // take in goal difference , winner name , penalty
  // gd = 6 means penalties

  gd = parseInt( gd )

  if ( !winner && gd !== 0 ) {
    return 'اضغط علی شعار الفریق الذي تتقوع سیفوز'
  } else if ( gd === 0 ) {
    return 'المباراة ستنتهی بالتعادل'
  } else if ( gd === 1 ) {
    return ` ${ winner } سیفوز بفارق هدف`
  } else if ( gd === 2 ) {
    return ` ${ winner } سیفوز بفارق هدفین`
  } else if ( gd > 2 && gd < 5 ) {   // 3, 4,5
    return ` ${ winner } سیفوز بفارق ${ gd } اهداف`
  } else if ( gd === 5 ) {   // 5 , 6, ...
    return `${ winner } سیفوز بفارق 5 اهداف او اکثر`
  } else if ( gd === 6 ) {
    return `${ winner } سیفوز برکلات الترجیح `
  } else {
    return 'اختر فارق الاهداف باستخدام العداد'
  }
}

export const getViPredictionTxt = ( ansKey, winner ) => {
  if ( ansKey === 0 ) {
    return 'المباراة ستنتهی بالتعادل'
  } else if ( ansKey === 1 ) {
    return ` ${ winner } سیفوز`
  } else if ( ansKey === 2 ) {
    return ` ${ winner } سیفوز`
  }
}
// Determine whether Submit Btn should be disabled or not in MatchItemVip.js
//============================================================================
export const getSubmitBtnDisabled = ( penaltiesChecked, gd, clickedTeam ) => {
  // gd => goalDifference ,  penaltiesChecked = true/false 

  // return false by default
  let returnn = false

  if ( penaltiesChecked ) {
    if ( !clickedTeam )
      returnn = true   // true means btn will be disabled 

  } else {   // If (!pentaltiesChecked)
    if ( gd === '' ) {   // when draw
      returnn = true
    } else if ( gd === 0 ) {   // when draw
      returnn = false
    } else {
      if ( !clickedTeam ) {
        return true
      }
    }
  }

  return returnn
}


// Calculate Prize Money In order to display in winners Table
export const calculatePrize = ( pos ) => {
  // post means winner.position
  if ( pos === 1 ) {
    return 100
  } else if ( pos === 2 ) {
    return 50
  } else if ( pos === 3 ) {
    return 25
  } else if ( pos === 4 ) {
    return 15
  } else if ( pos === 5 ) {
    return 10
  } else if ( pos === 6 ) {
    return 5
  } else if ( pos > 6 && pos <= 10 ) {
    // top 10
    return 3
  }
  // else if ( pos > 10 && pos <= 20 ) {
  //   // top 20
  //   return 2
  // }
  else {
    return 0
  }
}

// NOTE: time string must look like this 07:05:45PM or this 07:05:45AM and account for 12:00:00AM and convert 12:00:00pm to 12:00:00 
// less lines using array.split/join and modulus (not my solution)
export const timeConversion = ( s ) => {
  let AMPM = s.slice( -2 );
  let timeArr = s.slice( 0, -2 ).split( ":" );
  if ( AMPM === "AM" && timeArr[ 0 ] === "12" ) {
    // catching edge-case of 12AM
    timeArr[ 0 ] = "00";
  } else if ( AMPM === "PM" ) {
    // everything with PM can just be mod'd and added with 12 - the max will be 23
    timeArr[ 0 ] = ( timeArr[ 0 ] % 12 ) + 12
  }
  return timeArr.join( ":" );
}