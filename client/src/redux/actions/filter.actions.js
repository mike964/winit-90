import moment from 'moment'
import store from '../store'
const { dispatch } = store




export const setFilter = ( filter ) => {   // x = 'all' , ''thisweek' ' , 'nextweek' , 'finished', 'notfinished'
  // This can both set and clear filter  - No need for removeFilter()
  dispatch( {
    type: 'SET_FILTER',
    payload: filter
  } )
}

export const setWeekNumber = ( weekNumber ) => {
  // In order to filter prediction inside Dashboard
  dispatch( {
    type: 'SET_WEEK_NUMBER',
    payload: weekNumber
  } )
}



// For testing :) 
// setFilter( 'yesterday' )   // Good
// setFilter( 'finished' )   // Good


// Filter Matches by Redux filters
// 2nd Version in order to fix applying multiple filters
// Filter Matches by Redux filters - Get visible matches by applying filters inside redux
// Best way ever to apply multiple filters to an array of objects :) 2020-7-24
export const filterMatches = ( allMatches, filters ) => { // filters is obj of filters which comes from redux

  // console.log( '166' )
  // console.log( filters )   // {finished: false, notFinished: false, thisWeek: false, yesterday: false} 

  let yesterday = moment().subtract( 1, 'days' ).format( 'YYYY-MMM-DD' ) // 2020-07-16  Good 
  let startOfWeek_utc = moment.utc().startOf( 'week' ).format( 'X' )
  let endOfWeek_utc = moment.utc().endOf( 'week' ).format( 'X' )
  let thisMonth = moment().format( 'MMM-YYYY' )   // July-2020   Good
  let lastMonth = moment().startOf( 'month' ).subtract( 10, 'days' ).format( 'MMM-YYYY' )   // July-2020   Good

  return allMatches.filter( ( mch ) => {

    // The variable below are to check if item match filters or not  
    let returnn = true

    let matchIsThisWeek = ( mch.dateEpoch > startOfWeek_utc && mch.dateEpoch < endOfWeek_utc ) ? true : false
    let matchWasLastWeek = ( moment( mch.date ).format() < moment().startOf( 'week' ).format() && moment( mch.date ).format() > moment().startOf( 'week' ).subtract( 7, 'days' ).format() ) ? true : false
    let matchIsThisMonth = ( moment( mch.date ).format( 'MMM-YYYY' ) === thisMonth ) ? true : false
    let matchWasYesterday = ( ( moment( mch.date ).format( 'YYYY-MMM-DD' ) === yesterday ) ? true : false )
    let matchWasLastMonth = ( ( moment( mch.date ).format( 'MMM-YYYY' ) === lastMonth ) ? true : false )

    if ( filters.vip && !mch.vip )
      // finishedd = false
      returnn = false
    if ( filters.finished && mch.finished === false )
      // finishedd = false
      returnn = false

    if ( filters.notFinished && mch.finished === true )
      // notFinishedd = false
      returnn = false

    if ( filters.thisWeek && !matchIsThisWeek ) // if match is not this week, filter match out 
      returnn = false
    if ( filters.lastWeek && !matchWasLastWeek ) // if match is not this week, filter match out 
      returnn = false

    if ( filters.thisMonth && !matchIsThisMonth )
      returnn = false
    if ( filters.lastMonth && !matchWasLastMonth )
      returnn = false

    if ( filters.yesterday && matchWasYesterday === false )
      // if match is not this week, filter it out
      // yesterdayy = false
      returnn = false

    // if ( filters.)


    return returnn
  } )

  // return filteredMaches
}



export const filterPredictionsByWeek = ( predictions, weekNumb, year ) => {
  // Using week.number instead of weekId is much more convenient here.

  // ** For test - Good
  year = 2020
  // weekNumb = "36"
  // console.log( predictions, weekNumb, year )

  // GET week {number id  year} using end of week 

  // let filteredPredictions = predictions.filter( ( prd ) => {
  //   // return prd.week._id === weekId
  //   // return prd.week.number === weekNumb.toString() && prd.year === year.toString()
  //   return prd.match.week.number === weekNumb && prd.match.year === year.toString()
  // } )

  // return filteredPredictions
  return predictions
}
