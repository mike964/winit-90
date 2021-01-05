
const asyncHandler = require( '../utils/asyncHandler' )
const ErrorResponse = require( '../utils/errorResponse' )
const moment = require( 'moment' )
const Team = require( '../models/Team' )
const League = require( '../models/League' )
const Week = require( '../models/Week' )
const Match = require( '../models/Match' )
const Prediction = require( '../models/Prediction' )
const Karname = require( '../models/Karname' )
const User = require( '../models/User' )
const { updateUserBalance } = require( '../controllers/user.cont' )
// ================================================================================================

//// *** Match Middlewares *** ///
/////////////////////////////////

// Set Teams & League for match
exports.setTeams = asyncHandler( async ( req, res, next ) => {
  // Convert teams from shortNames to their _id's
  // find teams for match by shortName and replace by _id

  // console.log( req.body )   { team1: 'fcb', team2: 'rmadrid', league: 'laliga', date: '' }
  const { team1, team2, league, date } = req.body

  const startOfWeekForMatchDate = moment( date ).startOf( 'week' ).format( 'X' )

  team11 = await Team.find( { shortName: team1 } )
  team22 = await Team.find( { shortName: team2 } )
  leaguee = await League.find( { shortName: league } ) // @Fix Neded here

  // console.log( team11 )
  // console.log( team11[ 0 ]._id )   // 5eeb67aca91acb1a0c29d094

  req.body.team1 = team11[ 0 ]._id
  req.body.team2 = team22[ 0 ]._id
  req.body.league = leaguee[ 0 ]

  next()

} )


exports.setWeek = asyncHandler( async ( req, res, next ) => {
  console.log( '---- setWeek() ----'.yellow )
  // console.log( req.params )   // { year: '2021', weekNumber: '29' } 

  let week

  if ( req.method === 'GET' ) {
    const startOfWeek_UTC = moment.utc().startOf( 'week' ).format( 'X' )
    // const endOfWeek = moment().endOf( 'week' ).format( 'X' )   // 1592686800
    const endOfWeek_UTC = moment.utc().endOf( 'week' ).format( 'X' )   // 1592686800

    // console.log( 'startOfWeek:     ' + startOfWeek )       // 1593291600
    // console.log( 'startOfWeek UTC: ' + startOfWeek_UTC )   // 1593302400  - bcuz 3h difference
    // console.log( 'endOfWeek; ' + endOfWeek )               // 1593896399 

    if ( req.query.week ) {   // If req.query.week Exists
      // console.log( req.query.week )    // { week: 'thisweek' } 

      if ( req.query.week === 'thisweek' )   // after ? in url
        week = await Week.find( { startUnix: startOfWeek_UTC } )

      if ( req.query.week === 'nextweek' )
        week = await Week.find( { startUnix: parseInt( endOfWeek_UTC ) + 1 } )

      if ( req.query.week === 'lastweek' )
        week = await Week.find( { endUnix: parseInt( startOfWeek_UTC ) - 1 } )

      // else if ( req.query.weekId ) {
      //   req.query.week = req.query.weekId
      //   req.weekId = req.query.weekId
      //   return next()
      // } 
    }

    if ( week ) {   // If week found
      req.query.week = week[ 0 ]._id
      // req.weekId = week[ 0 ]._id
      req.week = week[ 0 ]
      // *** In order to prevent Issue (not displaying matches)
      // req.query.weekNumber = undefined
    }

    return next()
  }

  if ( req.method === 'POST' ) {   // For ex when Adding new Match
    const { date } = req.body
    // console.log( date )   // 2020-06-28T23:00:00.0+03:00  

    // let startOfWeekForMatchDate = moment( date ).startOf( 'week' ).format( 'X' )   // 1593896400
    let startOfWeek_forMatchDate_UTC = moment.utc( date ).startOf( 'week' ).format( 'X' )  // 1593907200
    console.log( startOfWeek_forMatchDate_UTC )

    // startOfWeekForMatchDate = parseFloat( startOfWeekForMatchDate ) + 10800   
    week = await Week.find( { startUnix: startOfWeek_forMatchDate_UTC } )

    if ( week ) {
      // req.body.weekId = week[ 0 ]._id
      req.body.week = week[ 0 ]._id
      return next()

    } else {    // if week doesn't exist
      return next( new ErrorResponse( "Week not found!", 401 ) )
    }
  }

  next()
} )



exports.setLeague = asyncHandler( async ( req, res, next ) => {
  console.log( '----- setLeauge() -----' )
  console.log( req.params )   // { year: '2021', weekNumber: '29' }
  console.log( req.query )    // { week: 'thisweek',league: 'laliga' } 
  // if ( req.method === 'GET' && req.query.league ) {

  //   let league = null

  //   league = await League.find( { shortName: req.query.league } )
  //   // console.log( league )   // [{_id: xxx, shortName: xxx, ...}]
  //   req.query.league = league[ 0 ]._id
  // }

  next()
} )


exports.findWeekByNumber = asyncHandler( async ( req, res, next ) => {
  // console.log( req.params )   // { year: '2021', weekNumber: '29' }
  // console.log( req.query )    // { week: 'thisweek' } 

  const week = await Week.find( {
    weekNumber: req.params.weekNumber,
    year: req.params.year
  } )
  // console.log( week )
  req.weekId = week[ 0 ]._id
  // console.log( weekId )   // 5eefbd0f16c0b010dcd33afb

  next()

} )

//// *** Prediction Middlewares *** ///

exports.setKarname = asyncHandler( async ( req, res, next ) => {
  // ** Find OR Create Karname
  // Set Karname & week bofore user prediction save 
  console.log( '==== setKarname() ===='.yellow )

  // console.log( req.params )   // { year: '2021', weekNumber: '29' }
  // console.log( req.query )    // { week: 'thisweek' } 
  // console.log( req.body )
  // console.log( req.user )   // { ... User ... } / undefined


  // Else - Check if Karname already exist
  let exKarname = await Karname.find( {
    user: req.user._id,   // req.user comes from protect()
    week: req.body.weekId
  } )

  // console.log( exKarname )   // output: [{ ...karname... }]

  // IF Karname Found
  if ( exKarname && exKarname.length > 0 ) {
    console.log( '--- karname found ---' )

    req.karname = exKarname[ 0 ]
    req.body.karname = exKarname[ 0 ]._id
    req.newKarname = false    // newKarname indicates wether new karname created or not on order to -$1 in Frontend. 
    // newKarname will be send along response

  } else {  // Else if Karname doesn't exist, create one
    // First Make Payment 
    let successful_balance_update = await updateUserBalance( req.user._id, -1 )


    if ( successful_balance_update === false ) {
      return next( new ErrorResponse( `Payment failed`, 404 ) )
    }

    // Then If payment successfull, create new karname
    let newKarname = await Karname.create( {
      user: req.user._id,
      week: req.body.weekId
    } )

    // If new karname creation fail - return user money
    if ( !newKarname ) {
      await updateUserBalance( req.user._id, +1 )
    }

    console.log( '---- newKarname ----' )
    console.log( newKarname )   // output: { ...karname... }

    req.karname = newKarname
    req.body.karname = newKarname._id
    req.newKarname = true
  }

  next()
} )



exports.setMatch = asyncHandler( async ( req, res, next ) => {

  // console.log( req.params )   // { matchId: '5ef12ad15c43de2a7cb9e797' }
  // console.log( req.query )    //  

  if ( req.params.matchId ) {
    req.query.match = req.params.matchId
  }

  next()
} )




