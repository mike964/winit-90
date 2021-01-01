const axios = require( 'axios' );
const moment = require( 'moment' )
// const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../utils/asyncHandler' )
const Match = require( '../models/Match' )
const crud = require( '../utils/crudHandler' )
const { qrFunc } = require( '../utils/queryFunction' )
const Prediction = require( '../models/Prediction' )
const Viprediction = require( '../models/Viprediction' )
// const { getPercentage } = require( '../utils/functions' )
const Team = require( '../models/Team' )
const { teams } = require( './teams_arr' );   // import teams array

//==========================================================
// exports.createMatch = crud.createOne( Match ) 

const getPercentage = ( num, total ) => parseInt( ( 100 * num ) / total )

// create match by api-football id's 
exports.createMatch = asyncHandler( async ( req, res, next ) => {
  console.log( '--- createMatch() ---'.yellow )
  console.log( req.body )

  const doc = await Match.create( req.body )  // req.body is dangerous

  // console.log( doc )   // for development

  res.status( 201 ).json( {
    success: true,
    data: doc,
    // docs
  } )
} )

exports.updateMatch = crud.updateOne( Match )
exports.deleteMatch = crud.deleteOne( Match )
// @route     GET /api/v1/auth/matches

// exports.getMatches = crud.getAll( Match, 'team1' )
exports.getMatches = asyncHandler( async ( req, res, next ) => {
  console.log( '---- getMatches() ----'.yellow )

  // console.log(req.query.params)
  console.log( req.query )

  // let qr = Match.find()
  // console.log( qr )   // output: Query { ... so long ... } 

  // *** This is for '/weeks/2020-27/matches' route ***
  if ( req.weekId ) {
    // qr = Match.find( { week: req.weekId } )
    req.query.week = req.weekId
  }

  let league_id
  // console.log( league_id )   // undefined
  let week_id

  if ( req.query.league ) {   // for ex: league = 39 
    league_id = parseInt( req.query.league )
    delete req.query[ 'league' ]    // In order to prevent issue
  }
  // if ( req.query.week ) {  // for ex week: '2020-52'
  //   week_id = parseInt( req.query.league )
  //   delete req.query[ 'week' ]
  // }

  // *** Modify query in order to add sorting and selecting fields
  let qr = qrFunc( req.query, Match )
  // let qr = Match.find( { "league.id": 35 } )    // *** FUK YESS :) 
  // qr._conditions = { 'league.id': 35 }   // Good :works fine 

  if ( league_id ) {
    qr._conditions = { 'league.id': league_id }
  }

  // console.log( qr )    // Long Object

  // *** POPULATE - SELECT - SORT *** //
  qr.sort( '-date' )   // works fine
    // qr.populate( 'team1 team2' )
    // .populate( 'team1', 'fullName shortName' )
    .populate( 'team1 team2', '-createdAt -__v' ) // Good Good 
  // .populate( 'league', 'shortName fullName country' )
  // .populate( 'week', 'number year start end' )
  // .populate( 'vipredictions', 'winner answerKey' )

  // const matches = await Match.find( { week: req.weekId } )
  const docs = await qr

  res.status( 200 ).json( {
    success: true,
    nResults: docs.length,
    matches: docs
  } )
} )


// exports.getMatch = crud.getOne( Match )
exports.getMatch = asyncHandler( async ( req, res, next ) => {
  console.log( '--- getMatch() cont ---'.yellow )

  let match = await Match.findById( req.params.id )
    // .populate( 'team1', 'fullName shortName' )
    .populate( 'team1' )
    .populate( 'team2' )
    // .populate( 'league', 'shortName fullName country' )
    .populate( 'league' )
  // .populate( 'week', 'weekTitle' )


  // Set teams by id (populate manually)

  console.log( match.team1 )   // 39

  let team_1 = await Team.find( { id: match.team1 } )
  let team_2 = await Team.find( { id: match.team2 } )

  console.log( team_1 )   // []
  console.log( team_2 )   // []

  let match_ = {
    // ...match,
    team1: team_1,
    team2: team_2
  }

  match.team3 = 'Hiii'


  res.status( 200 ).json( {
    success: true,
    // match: match_,
    match
  } )
} )


// update match result
// @route:   'matches/update-result/:matchId'  
exports.updateMatchResult = asyncHandler( async ( req, res, next ) => {
  console.log( '------ updateMatchResult() ------'.yellow )
  // Set Winner when admin update match result 

  // 1.First pull out match result from req.body 
  // 2.Then Update match
  // 3.Update associated prediction
  // 4.Update associated vip prediction

  console.log( req.body )

  const { matchId } = req.params
  const { goals, endedInPenalties } = req.body

  // result string (score)

  const match = await Match.findById( matchId ).populate( 'team1 team2' )
  const { team1, team2 } = match
  // console.log( match )

  // Convert String to Int
  let goals1 = parseInt( goals.team1 )
  let goals2 = parseInt( goals.team2 )
  let pen1 = parseInt( goals.penalty1 )
  let pen2 = parseInt( goals.penalty2 )

  let gd = Math.abs( goals1 - goals2 )   // absolute value (positive) 

  // let resultKey    // 1 char reskey  (winner)
  // let resultKey2    // 2 char reskey  (winner + gd)

  let resultString = ( endedInPenalties
    ? `${ goals1 } - ${ goals2 } (${ pen1 }-${ pen2 } p)`
    : `${ goals1 } - ${ goals2 }` )


  let result = {
    goals: {
      team1: goals1,
      team2: goals2
    },
    gd,   // goal difference
    panalties: endedInPenalties ? { team1: pen1, team2: pen2 } : false,
    score: resultString
  }

  let _match = {     // _match is match to be updated  
    finished: true,
    result
  }


  // *** Specify Result Keys  
  //========================= 
  const getResultKey = () => {
    if ( goals1 > goals2 || pen1 > pen2 ) {
      return 1
    } else if ( goals2 > goals1 || pen2 > pen1 ) {
      return 2
    } else if ( goals1 === goals2 ) {
      return 3
    }
  }

  const getResultKey2 = () => {
    if ( endedInPenalties ) {
      // _match.result.gd = null   // NO NEED
      if ( pen1 > pen2 ) {
        return '10'
      } else {
        return '20'
      }
    } else {    // ** IF NOT ENDED IN PENALTIES
      let gd_ = ( gd >= 4 ? 4 : gd )  // Exclude 4+ goal difference
      if ( goals1 > goals2 ) {

        return `1${ gd_ }`
      } else if ( goals2 > goals1 ) {
        return `2${ gd_ }`
      } else if ( goals1 === goals2 ) {
        return '30'
      }
    }
  }


  _match.resultKey = getResultKey()
  _match.resultKey2 = getResultKey2()

  console.log( '---- match To be updated ----' )
  console.log( _match )



  let updatedMatch = await Match.findByIdAndUpdate( matchId, _match, { new: true, runValidators: true } )
  // console.log( '---- updatedMatch ----' )
  // console.log( updatedMatch )   // in 1st attempt it works but don't show result 

  // In order to use populated team1 n team2  
  req.match = { team1, team2, ..._match }   // in order to use match in next mdlwrs  

  next()

  // return  // ** In order to Stop
} )


// Mark Predictions of MatchId after Match result gets updated
exports.markPredictions = asyncHandler( async ( req, res, next ) => {
  // 2020-8-13  Mark All Predictions of MatchId as correct or not (update predictions of match)
  console.log( '------ markPredictions() ------'.yellow )
  // Update Match Result and mark all related predictions as correct or not (vip and normal)
  // console.log( '--- req.match ---' )
  // console.log( req.match )

  const { match } = req
  const { resultKey, resultKey2 } = match
  const { matchId } = req.params

  const predictions = await Prediction.find( { match: req.params.matchId } )
  const Vipredictions = await Viprediction.find( { match: req.params.matchId } )

  // ==============================================================
  //  1.First Mark Weekly Predictions, Then mark vip prediction  *
  // =============================================================
  // // ** Reset All Predictions of match ** //
  // // const response3 = await Prediction.updateMany( { match: matchId }, { correct: null } )

  // // If prediction.answerKey !== resultKey => set: prediction.correct = false

  // resultKey = 1 , 2, 3 
  // resultKey2 = 11 , 22 , 10 penalties

  const response1 = await Prediction.updateMany(
    {
      match: matchId,
      answerKey: resultKey
    },
    { correct: true } )

  const response2 = await Prediction.updateMany(    // $ne means not equal to 
    {
      match: matchId,
      answerKey: { $ne: match.resultKey }
    },
    { correct: false, correctGD: false } )

  const response3 = await Prediction.updateMany(
    {
      match: matchId,
      answerKey2: resultKey2
    },
    { correct: true, correctGD: true } )

  const response4 = await Prediction.updateMany(
    {
      match: matchId,
      answerKey2: { $ne: match.resultKey2 }
    },
    { correctGD: false } )   // $ne means not equal to



  // *** Update Vip Predictions As well ***
  //======================================
  const response5 = await Viprediction.updateMany(    // $ne means not equal to 
    { match: matchId, answerKey: match.resultKey },
    { correct: true } )

  const response6 = await Viprediction.updateMany(    // $ne means not equal to 
    {
      match: matchId, answerKey: { $ne: match.resultKey }
    }, { correct: false } )

  console.log( response1 )   //{ n: 2, nModified: 0, ok: 1 }

  res.status( 200 ).json( {
    success: true,
    updatedMatch: req.match,
    nPredictions: predictions.length,
    nVipredictions: Vipredictions.length,
    // response1,   // "response1": { "n": 2, "nModified": 0, "ok": 1 },
    predictions,
  } )
} )


// 2020-7-30
// // Calculate points for weekly predictions of matchId
exports.calculatePointsForMatchPrds = asyncHandler( async ( req, res, next ) => {
  console.log( '----- calculatePointsForMatchPrds() --------'.yellow )
  // console.log( req.params )
  const { matchId } = req.params

  // First get all predictions of matchId
  // Then count total number and number of correct predictions

  const match = await Match.findById( matchId )
    .populate( 'predictions' )   // Reverse populate
  // console.log( match ) 

  const { predictions } = match
  console.log( '- predictionsLength: ' + predictions.length )
  // console.log( predictions )

  correctPredictinosArray = match.predictions.filter( prd => prd.correct === true )

  // Number of tatal predictinos for this match
  const nTotalPredictions = predictions.length
  const nCorrectPredictions = correctPredictinosArray.length

  console.log( '- correctPredictinosArray: ' + correctPredictinosArray.length )

  // Percentage of Predictions with correct = true
  let correctPrdPercentage = getPercentage( nCorrectPredictions, nTotalPredictions )

  let answerKey1count = 0
  let answerKey2count = 0
  let answerKey3count = 0
  let answerKey1precentage = 0
  let answerKey2precentage = 0
  let answerKey3precentage = 0

  predictions.forEach( prd => {
    if ( prd.answerKey === 1 )
      answerKey1count++
    if ( prd.answerKey === 2 )
      answerKey2count++
    if ( prd.answerKey === 3 )
      answerKey3count++
  } )

  // Calculate percentages
  answerKey1precentage = getPercentage( answerKey1count, predictions.length )
  answerKey2precentage = getPercentage( answerKey2count, predictions.length )
  answerKey3precentage = getPercentage( answerKey3count, predictions.length )

  let points = 0

  if ( correctPrdPercentage >= 80 ) {
    points = 10
  } else if ( 60 <= correctPrdPercentage && correctPrdPercentage < 80 ) {
    points = 15
  } else if ( 40 <= correctPrdPercentage && correctPrdPercentage < 60 ) {
    points = 20
  } else if ( 20 <= correctPrdPercentage && correctPrdPercentage < 40 ) {
    points = 25
  } else if ( 0 <= correctPrdPercentage && correctPrdPercentage < 20 ) {
    points = 30
  }



  // console.log( nTotalPredictions )
  // console.log( correctPredictinosArray )
  // console.log( nCorrectPredictions )


  // The Formula to calculate points 
  // const calculatePoints = () => {
  //   if ( nCorrectPredictions === 0 ) {
  //     return 0
  //   } else {
  //     return parseInt( ( nTotalPredictions * 100 ) / nCorrectPredictions )
  //     // After site gets lots of user decrese 1000 to 100 and then to 10
  //   }
  // }

  // const points = calculatePoints()
  // After site gets lots of user decrese 1000 to 100 and then to 10

  // console.log( 'Points: ' + points )

  // Then update points for all correct predictions
  // const resp1 = await Prediction.updateMany( { match: matchId }, { points: 0 } )   // RESET POINTS 
  const resp2 = await Prediction.updateMany( { match: matchId, correctGD: true, correct: true }, { points: 50 } )
  const resp3 = await Prediction.updateMany( { match: matchId, correctGD: false, correct: true }, { points } )
  const resp4 = await Prediction.updateMany( { match: matchId, correctGD: false, correct: false }, { points: 0 } )

  res.status( 200 ).json( {
    // match,
    // points
    // resp1,
    nTotalPredictions,
    nCorrectPredictions,
    points,
    match,
    answerKey1count,
    answerKey2count,
    answerKey3count,
    answerKey1precentage,
    answerKey2precentage,
    answerKey3precentage,
    correctPrdPercentage
  } )
} )


// 2020-12-17 
// @route   POST: api/matches/multiple
// @desc    Create multiple matches using api-football
exports.createMultipleMatches = asyncHandler( async ( req, res, next ) => {
  console.log( '--- createMultipleMatches() ---'.yellow )

  console.log( req.params )         // {}
  console.log( req.query )          // { from: '2020-12-18', to: '2020-12-22', createMatches: 'false' }

  // Save matches to DB  (default:false)
  let saveMatches = ( req.query.createMatches === 'true' ? true : false )

  // In order to prevent issue
  req.query.createMatches = undefined

  // console.log( teams )    // array of teams imported from module

  const api = 'https://v3.football.api-sports.io'

  // const response = 'ddd'
  const response = await axios( {
    // url: `${ api }/fixtures?season=2020&league=39&from=${ req.params.from }&to=${ req.params.to }`,
    url: `${ api }/fixtures?season=2020`,
    headers: { 'x-rapidapi-key': 'd3feda58281e0a04b0e895700cee1565' },
    params: req.query   // YES 
  } )

  // console.log( response.data )

  let matches_ = [] // matches array to_be_inserted

  let fixtures_stg_1 = response.data.response   // stg => stage

  let fixtures_stg_2 = fixtures_stg_1.map( ( item ) => {
    const { fixture, teams } = item

    let title = `${ teams.home.name } x ${ teams.away.name }`
    let week_number = moment( fixture.timestamp * 1000 ).week()
    let match_year = moment( fixture.timestamp * 1000 ).format( 'YYYY' )
    let week_year = moment.utc( fixture.timestamp * 1000 ).endOf( "week" ).format( "YYYY" )

    newItem = {
      date: fixture.date,
      timestamp: fixture.timestamp,
      week: {
        number: week_number,
        year: week_year,
        id: `${ week_year }-${ week_number }`
      },
      league: item.league,
      team_home: teams.home,
      team_away: teams.away,
      year: match_year,
      title
    }

    return newItem
  } )


  // *** Replace team number id (39) to mongoId (_id)
  // state 3 is the last stage which will be save to DB
  let fixtures_stg_3 = fixtures_stg_2.map( ( item ) => {

    let team1 = teams.find( ( el ) => { return el.id === item.team_home.id } )
    let team2 = teams.find( ( el ) => { return el.id === item.team_away.id } )

    // Null team id in DB -  If team not found in DB 
    let null_id = '5fdfa83b58b9e05070daed4f'

    newItem = {
      ...item,
      team1: ( team1 ? team1._id : null_id ),
      team2: ( team2 ? team2._id : null_id )
      // team1: team1_._id,
      // team2: `${team2_._id}`
    }
    return newItem
  } )

  let docs = []
  if ( saveMatches ) {
    docs = await Match.insertMany( fixtures_stg_3 )
  }

  // console.log( '--- saveMatches: ' + saveMatches )   // Good Good


  // res.json( matches_ )
  // res.json( response.data.response )
  // res.json( fixtures_stage_1 )
  res.json( {
    nResults: fixtures_stg_1.length,
    docsInserted: ( docs.length > 0 ? docs.length : 'none' ),
    // response,
    // fixtures_stg_1,
    fixtures_stg_2,
    fixtures_stg_3,
    // docs: docs.length
  } )
} )