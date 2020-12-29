const axios = require( 'axios' )
const moment = require( 'moment' )
// const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../utils/asyncHandler' )
const Prediction = require( '../models/Prediction' )
const crud = require( '../utils/crudHandler' )
const { qrFunc } = require( '../utils/queryFunction' )
const Karname = require( '../models/Karname' )
//==========================================================
// @desc      Get all Predictions
// @route     GET /api/v1/auth/Predictions
// @access    Private/Admin
// exports.getPredictions = crud.getAll( Prediction, 'match week' )
exports.getPredictions = asyncHandler( async ( req, res, next ) => {

  // Modify query in order to add sorting and selecting fields
  const qr = qrFunc( req.query, Prediction )


  // const matches = await Match.find( { week: req.weekId } )
  const docs = await qr
    .populate( 'week' )
    // .populate( 'match' )
    // Get friends of friends - populate the 'friends' array for every friend (nested populate)
    .populate( {
      path: 'match',
      populate: { path: 'team1 team2' }
    } )


  res.status( 200 ).json( {
    success: true,
    nResults: docs.length,
    data: docs
  } )
} )


exports.getPrediction = crud.getOne( Prediction, 'match week' )


// @desc      Create Prediction
// @route     POST /api/v1/auth/Predictions
// @access    Private/Admin
exports.createPrediction = crud.createOne( Prediction )
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



exports.createMultiplePredictions = asyncHandler( async ( req, res, next ) => {
  // Req.body must contain array of [predictions] + week
  console.log( "--- createMultiplePredictions---".yellow )
  // console.log( req.body )  // [predictions]  // Good

  // console.log( req.user )
  console.log( req.body )
  console.log( ' --- req.karname --- ' )
  console.log( req.karname )

  let { predictions, weekId } = req.body

  // // ** filter out predictions made for finished matches

  let predictionss = []   // To be inserted in DB

  predictions.map( ( prd ) => {
    // Filter out predictions for outdated matches
    // If 200 seconds pass from match start, its ok

    console.log( ' ----- predictions.map() -----' )
    // console.log( moment.now() )                             //  1600123900287 
    // console.log( moment().unix() )                          //  1600123900 
    // console.log( moment( prd.matchDate ).format() + 300 )   // '2020-09-19T22:00:00+03:00300'
    // console.log( moment( prd.matchDate ).unix() )           //  1600542000
    // console.log( moment( prd.matchDate ).unix() + 200 )     //  1600542300 

    if ( moment().unix() > moment( prd.matchDate ).unix() + 200 ) {
      console.log( '--- match outdated ---' )
      // return // Remove item from array - ignore 
    } else {
      // SET (User & Week & Karname ) for each Prediction
      predictionss.push( {
        ...prd,
        user: req.user._id,   // req.user comes from protect()
        week: weekId,
        karname: req.karname._id
      } )
    }
  } )

  console.log( '- predictionss: ' ) // Good
  console.log( predictionss ) // Good



  // axios.post( `${ process.env.URL }/api/v1/predictions/2`, pred )   // doesn'w work good - should use insertMany
  // const doc = await Prediction.create( pred )  // Error: U must set week,karname,user.


  const docs = await Prediction.insertMany( predictionss )

  res.status( 200 ).json( {
    success: true,
    newKarname: req.newKarname,
    msg: `${ docs.length } prediction added!`,
    docs
  } )

  // next()


  // first get [] of predictions from front-end then loop and add them one by one to db 
  // by calling specified route for each one
  // If (predction.answerKey === 0 ) , don't insert it 


} )

// @desc      Update Prediction
// @route     PUT /api/v1/auth/Predictions/:id
// @access    Private/Admin
exports.updatePrediction = crud.updateOne( Prediction )

// @desc      Delete Prediction
// @route     DELETE /api/v1/auth/Predictions/:id
// @access    Private/Admin
exports.deletePrediction = crud.deleteOne( Prediction )