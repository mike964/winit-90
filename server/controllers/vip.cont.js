const axios = require( 'axios' )
const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../utils/asyncHandler' )
const Prediction = require( '../models/Prediction' )
const crud = require( '../utils/crudHandler' )
const { qrFunc } = require( '../utils/queryFunction' )
const Karname = require( '../models/Karname' )
const Viprediction = require( '../models/Viprediction' )
const { updateUserBalance } = require( '../controllers/admin.cont' )

//==========================================================
// Only by admin (for development)
exports.deleteViprediction = crud.deleteOne( Viprediction )
// @desc      Create VIP Prediction
// @route     POST /api/v1/auth/Predictions
// @access    Private/Admin
exports.createViprediction = asyncHandler( async ( req, res, next ) => {

  // console.log( req.user )
  console.log( 'req.body -----' )
  // console.log( req.body )
  const { match, winner, answerKey, stake, possibleWinning } = req.body

  let newViPrediction = {
    user: req.user._id,
    match,
    answerKey,
    winner,
    stake,
    possibleWinning
  }

  console.log( newViPrediction )   // Good

  // 1.FIRST MAKE PAYMENT (UPDATE USER BALANCE)  

  let successfulPayment = await updateUserBalance( req.user._id, -stake )


  if ( !successfulPayment ) {
    return next( new ErrorResponse( `Payment failed`, 404 ) )
  }

  // Then If payment successfull, create new karname 
  let viPrediction = await Viprediction.create( newViPrediction )

  // If viprediction creation fail - return user money
  if ( !viPrediction ) {
    await updateUserBalance( req.user._id, +stake )
  }


  // 2nd. 


  // let possibleReward = parseInt( stake * odds )



  // console.log( doc )   // for development 
  res.status( 200 ).json( {
    success: true,
    viPrediction
  } )
} )
// @desc      Get all Predictions
// @route     GET /api/v1/auth/Predictions
// @access    Private/Admin 
exports.getVipredictions = asyncHandler( async ( req, res, next ) => {

  // Modify query in order to add sorting and selecting fields  
  // const qr = qrFunc( req.query, Viprediction )

  // Return only last 25 days vip prds
  console.log( req.params )

  const convertedDate = new Date( req.query.from )

  let qr
  let populate = ( req.query.populate === 'true' ? true : false )
  req.query.populate = undefined // Remove to Prevent issues

  if ( req.query.from ) {
    qr = Viprediction.find( { createdAt: { $gte: convertedDate } } )
    // console.log( 'getMatchesByDuration' )
  } else {
    qr = qrFunc( req.query, Viprediction )
    // console.log( '112 test' )
  }

  // const prds = await Viprediction.find( { createdAt: { $gte: convertedDate } } )
  if ( populate ) {
    qr
      .populate( 'user match' )
      .sort( '-date' )
  }
  const docs = await qr

  res.status( 200 ).json( {
    success: true,
    nResults: docs.length,
    data: docs
  } )
} )

// {{URL}}/api/v1/vip/me
exports.getMyVipredictions = asyncHandler( async ( req, res, next ) => {

  // Modify query in order to add sorting and selecting fields 
  req.query.user = req.user._id   // req.user comes from protect mdlwr

  const qr = qrFunc( req.query, Viprediction )

  // const matches = await Match.find( { week: req.weekId } )
  const docs = await qr
    .populate( {
      path: 'match',
      populate: { path: 'team1 team2 league' }
    } )

  res.status( 200 ).json( {
    success: true,
    nResults: docs.length,
    data: docs
  } )
} )


exports.getPrediction = crud.getOne( Prediction, 'match week' )



exports.createOne = Model => catchAsync( async ( req, res, next ) => {

  // const docs = await model.find()

  // reqBody = {
  //   sequence: docs.length + 1,
  //   ...req.body
  // }

  const doc = await Model.create( req.body )

  // console.log( doc )   // for development

  res.status( 201 ).json( {
    status: 'success',
    data: doc,
    // docs
  } )
} )

exports.markVipredictions = asyncHandler( async ( req, res, next ) => {
  console.log( '----- markVipPredictions() -----'.yellow )
  // console.log( req.params ) 
  // Mark vip prediction as correct or not according to match result

  // 1.First get all vip predictions of match

  const vip_predictions = await PredictionVip.find( { match: req.params.matchId } )
  console.log( vip_predictions )   // Array of predictions

  // Modify query in order to add sorting and selecting fields  
  const qr = qrFunc( req.query, PredictionVip )


  // const matches = await Match.find( { week: req.weekId } )
  const docs = await qr

  res.status( 200 ).json( {
    success: true,
    nResults: docs.length,
    data: docs
  } )
} )