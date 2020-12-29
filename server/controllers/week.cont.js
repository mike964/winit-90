// const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../utils/asyncHandler.js' )
const Week = require( '../models/Week' )
const crud = require( '../utils/crudHandler' )
const { qrFunc } = require( '../utils/queryFunction.js' )
const ErrorResponse = require( '../utils/errorResponse.js' )

//==========================================================
// @route     GET /api/v1/auth/Weekes

// exports.getWeeks = crud.getAll( Week )
exports.getWeeks = asyncHandler( async ( req, res, next ) => {
  console.log( '--- getWeeks() cont'.yellow )

  // req.query.startUnix = 1593907200   // Works fine
  // req.query.startUnix = parseInt( req.query.startUnix )

  const qr = qrFunc( req.query, Week )  // Using qrFunc in order to sort and select docs

  qr.select( '-topUsers' )
  // SEND RESPONSE 
  const weeks = await qr

  res.status( 200 ).json( {
    success: true,
    nResults: weeks.length,
    weeks
  } )
} )

// GET SINGLE WEEK by Year & Number
exports.getWeekByNumber = asyncHandler( async ( req, res, next ) => {

  console.log( req.params )   //{ year: '2020', number: '35' }

  if ( !req.params.year || !req.params.number ) {
    return next( new ErrorResponse( 'year and number required', 401 ) )
  }


  const week = await Week.find( { year: req.params.year, number: req.params.number } )

  res.status( 200 ).json( {
    success: true,
    week: week[ 0 ]
  } )
} )


exports.getWeek = crud.getOne( Week )

exports.createWeek = crud.createOne( Week )

exports.updateWeek = crud.updateOne( Week )

exports.deleteWeek = crud.deleteOne( Week )