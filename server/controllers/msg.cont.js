const axios = require( 'axios' )
const moment = require( 'moment' )
// const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../utils/asyncHandler' )
const Msg = require( '../models/Message' )
const crud = require( '../utils/crudHandler' )


exports.createMsg = crud.createOne( Msg )
exports.createMsg = () => asyncHandler( async ( req, res, next ) => {

  // const docs = await model.find()

  // reqBody = {
  //   sequence: docs.length + 1,
  //   ...req.body
  // }

  console.log( x )


  // const msg = await Msg.create( req.body )

  // console.log( doc )   // for development

  // res.status( 201 ).json( {
  //   status: 'success',
  //   data: doc,
  //   // docs
  // } )
} )


exports.sendMsgToUser = async ( userId, txt ) => {

  // مبروک لقد ربحت 200$ لفوزک بالمرکز الثالث لدوري الاسبوع 45 
  // مبروک لقد ربحت 200$ لفوزک بالمرکز الثالث       

  try {
    const msg = await Msg.create( {
      user: userId,
      txt,
      lang: 'arabic',
      title: 'msg'
    } )
    return true // success 
  } catch ( error ) {
    console.log( error )
    return false
  }
}

// exports.checkMsgAdRead =
// convert read.false to read.true

exports.getMyMessages = asyncHandler( async ( req, res, next ) => {
  // console.log( req.query )

  //GET all my karnames of year 2020

  console.log( req.user )

  // lsn 11.21
  // const docs = await features.qr
  // const doc = await features.qr.explain()   // this is for motherfukers 😎

  // Execute query - find bootcamps in db
  // const qr = qrFunc( req.query, Karname )   // no working
  const myMessages = await Msg.find( { user: req.user._id } )
    // .populate( 'week', 'year', 'number', 'title' )
    // .populate( { path: 'week', select: 'year number' } )
    .select( '-user' )   // For security

  // "$oid": "5f523540b13cbd3a2cbf7162" 


  // SEND RESPONSE 

  res.status( 200 ).json( {
    success: true,
    nResults: myMessages.length,
    data: myMessages
  } )
} )


