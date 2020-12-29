const axios = require( 'axios' )
const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../utils/asyncHandler' )
const { qrFunc } = require( '../utils/queryFunction' )
const Karname = require( '../models/Karname' )
const Prediction = require( '../models/Prediction' )
const crud = require( '../utils/crudHandler' )
const User = require( '../models/User' )

//==========================================================
// @route     GET /api/v1/auth/Karnamees

exports.getKarnames = asyncHandler( async ( req, res, next ) => {
  // console.log( req.query )


  const qr = qrFunc( req.query, Karname )
    .populate( 'user' )
  // .populate( 'week', 'title' )
  // .populate( 'predictions', 'match answerKey' )  // Reverse

  const docs = await qr

  // SEND RESPONSE 

  res.status( 200 ).json( {
    success: true,
    nResults: docs.length,
    data: docs
  } )
} )

// exports.getKarname = crud.getOne( Karname )
exports.getKarname = asyncHandler( async ( req, res, next ) => {

  console.log( req.params.id )    // 5efb4fd5f355d54860155194 

  const karname = await Karname.findById( req.params.id )
    .populate( 'user', 'email' )
    .populate( 'predictions' )
  // const karname = await Karname.findById( "5ef8eb38f3027134648f3a55" )   // no works
  // const karname = await Karname.find( { _id: "5ef8eb38f3027134648f3a55" } )  // works




  if ( !karname ) {
    return next( new ErrorResponse( `Karname ${ req.params.id } not found!`, 404 ) )
  }

  res.status( 200 ).json( {
    status: 'success',
    nResults: 1,
    karname
  } )
} )

// createFakeKarname
exports.createKarname = crud.createOne( Karname )
// exports.createKarname = asyncHandler( async ( req, res, next ) => { 
//   // First make payment , Then Create karname
//   // Make payment => Update User Balance to -1 $

//   User.findById(req.user._id)

//   const doc = await model.create( req.body )  // req.body is dangerous

//   // console.log( doc )   // for development

//   res.status( 201 ).json( {
//     status: 'success',
//     data: doc,
//     // docs
//   } ) 
// })

exports.updateKarname = crud.updateOne( Karname )

exports.deleteKarname = crud.deleteOne( Karname )
// exports.deleteKarname = asyncHandler( async ( req, res, next ) => {

//   const karname = await Karname.findById( req.params.id ).populate( 'user', '   email' )
//   // const karname = await Karname.findById( "5ef8eb38f3027134648f3a55" )   // no works
//   // const karname = await Karname.find( { _id: "5ef8eb38f3027134648f3a55" } )  // works
//   // .populate( 'predictions' )



//   if ( !karname ) {
//     return next( new ErrorResponse( `Karname ${ req.params.id } not found!`, 404 ) )
//   }

//   res.status( 200 ).json( {
//     status: 'success',
//     nResults: 1,
//     karname
//   } )
// } )

// Get all my karnames (current logged in user)
exports.getMyKarnames = asyncHandler( async ( req, res, next ) => {
  // console.log( req.query )

  //GET all my karnames of year 2020 
  console.log( req.user )

  // lsn 11.21
  // const docs = await features.qr
  // const doc = await features.qr.explain()   // this is for motherfukers 😎

  // Execute query - find bootcamps in db
  // const qr = qrFunc( req.query, Karname )   // no working
  const myKarnames = await Karname.find( { user: req.user._id } )
    // .populate( 'week', 'year', 'number', 'title' )
    .populate( { path: 'week', select: 'year number' } )
    .select( '-user' )   // For security

  // "$oid": "5f523540b13cbd3a2cbf7162" 


  // SEND RESPONSE 

  res.status( 200 ).json( {
    success: true,
    nResults: myKarnames.length,
    data: myKarnames
  } )
} )

// @ Update single karname stats by admin only
// exports.updateKarnameStats = asyncHandler( async ( req, res, next ) => {
const updateKarnameStats = async ( karnameId ) => {
  // console.log( '--- updateKarnameStats() ---'.yellow )
  // console.log( req.params )  // { karnameId: '574523454645' }
  // console.log( req.query )

  // const karname = await Karname.findById( req.params.karnameId )
  const karname = await Karname.findById( karnameId )
    .populate( 'predictions' )

  // const predictions = await Prediction.find( { karname: req.params.karnameId } )
  const { predictions } = karname

  // console.log( karname )
  // console.log( predictions ) 

  let nCorrectPredictions = 0
  let totalPoints = 0

  predictions.map( ( prd ) => {
    if ( prd.correct === true ) {
      nCorrectPredictions++
      totalPoints = totalPoints + prd.points
      // console.log( totalPoints )
      // console.log( prd.points )
    }
  } )

  // console.log( 'Total Prds: ' + predictions.length )   // Good
  // console.log( 'Correct: ' + nCorrectPredictions )   // Good 

  // 1.First Calculate Number of correct predictions for Karname
  // 2. Then Update Related Karname
  await Karname.findByIdAndUpdate( karnameId, {
    nPredictions: predictions.length,
    nCorrectPredictions,
    points: totalPoints   // Update points for Karname
  } )

  // res.status( 200 ).json( {
  //   status: 'success',
  //   karname
  // } )
}
//  )

// @ Update All karnames stats by admin (Loop function above)
// Calculate total prds and poitns
exports.updateAllKarnamesStats = asyncHandler( async ( req, res, next ) => {
  console.log( '--- updateAllKarnamesStats() ---'.yellow )   // Good
  // console.log( req.params )   // Good { weekId: '3456456' }

  // 1. First get all Karnames of weekId in URL
  const karnames = await Karname.find( { week: req.params.weekId } )
  // console.log( karnames )   // Good [ ... Karnames ... ]

  // console.log( "process.env.URL: " + process.env.URL )   // http://127.0.0.1:3500
  // axios.get( process.env.URL )   // Good

  karnames.map( async ( karname ) => {
    // console.log( krname._id )   // Good 
    // await axios.get( `${ process.env.URL }/api/v1/ad/update-karname-stats/${ karname._id }` )
    await updateKarnameStats( karname )
  } )

  // console.log( count )

  res.status( 200 ).json( {
    success: true,
    msg: `${ karnames.length } Karnames updated!`
  } )
  // next()
} )




// update All karnames position of a WeekId by Admin
exports.updateKarnamesPostion = asyncHandler( async ( req, res, next ) => {
  console.log( '--- updateKarnamesPostion() ---'.yellow )


  // 1.First get all karnames of weekId (sorted by points)
  // 2. Then update karname.position

  // console.log( req.params )  // { karnameId: '574523454645' }
  // console.log( req.query )


  // console.log( req.params )   // { weekId: '456346457' }
  const { weekId } = req.params

  const karnames = await Karname.find( { week: weekId } ).sort( '-points' )

  // console.log( karnames )   /
  // let filteredKarnames = []
  // let i = 0
  let pos = 0
  let prevKarnamePoints = 0

  // Specify Positions for users
  karnames.map( async ( karname ) => {
    // If user[1] and user[2] have same points, prevent increasing position in newKarname
    console.log( '---------------------------' )
    console.log( karname.points )
    console.log( 'prevKarnamePoints: ' + prevKarnamePoints )
    // console.log( 'i: ' + i )
    // console.log( 'pos: ' + i )

    if ( karname.points !== prevKarnamePoints ) {
      // i++
      pos++
    }

    // pos = i

    // position: pos
    // 1.First Calculate Number of correct predictions for Karname
    // 2. Then Update Related Karname

    prevKarnamePoints = karname.points

    await Karname.findByIdAndUpdate( karname._id, {
      position: pos
    } )


  } )

  res.status( 200 ).json( {
    status: 'success',
    msg: `${ karnames.length } Karnames updated!`
  } )
} )