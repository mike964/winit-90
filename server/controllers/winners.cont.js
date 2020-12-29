// const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../utils/asyncHandler.js' )
const Week = require( '../models/Week' )
const Trophy = require( '../models/Trophy' )
const ErrorResponse = require( '../utils/errorResponse.js' )
const Ulist = require( '../models/Ulist.js' )
// const { sendErrorResponse } = require( '../utils/functions.js' ) 
//==========================================================
// @route     GET /api/v1/ 




// exports.getWeek = crud.getOne( Week )

// exports.createWeek = crud.createOne( Week )

// exports.updateWeek = crud.updateOne( Week )

// exports.deleteWeek = crud.deleteOne( Week )

// Get Top Users [] by User 
exports.getTopUsersOfWeekNumber = asyncHandler( async ( req, res, next ) => {
  console.log( '---- getTopUsersOfWeekNumber() ----' )

  console.log( req.params )   //  { year: '2020', weekNumber: '37' }

  // First convert weekNumber to weekId
  let week = await Week.findOne( { number: req.params.weekNumber, year: req.params.year } )
  console.log( week )

  // if ( !week )
  // return sendErrorResponse( res, 'No Week' )

  // Then find The relevant Ulist (top users lig)
  let ulist = await Ulist.find( { week: week._id } )
  // ulist = await Ulist.find( { week: '5f4b76d9d8ee3563f442ac16' } )
  // console.log( ulist )

  // if ( !ulist.length )   // sendErroResponse
  // return sendErrorResponse( res, 'No uList' )

  // Exclude id's for security
  let topUserss = ulist[ 0 ].topUsers.map( ( item ) => {
    return {
      ...item,
      id: undefined   // delete id
    }
  } )

  res.status( 200 ).json( {
    success: true,
    // ulist: ulist[ 0 ]
    topUsers: topUserss
  } )
} )


exports.getMyTrophies = asyncHandler( async ( req, res, next ) => {
  console.log( '---- getMyTrophies() ----'.yellow )
  // console.log( req.query )

  //GET all my karnames of year 2020

  console.log( req.user )

  // lsn 11.21
  // const docs = await features.qr
  // const doc = await features.qr.explain()   // this is for motherfukers 😎

  // Execute query - find bootcamps in db
  // const qr = qrFunc( req.query, Karname )   // no working
  const myTrophies = await Trophy.find( { user: req.user._id } )
    // .populate( 'week', 'year', 'number', 'title' )
    // .populate( { path: 'week', select: 'year number' } )
    .select( '-user' )   // For security

  // "$oid": "5f523540b13cbd3a2cbf7162" 


  // SEND RESPONSE 

  res.status( 200 ).json( {
    success: true,
    nResults: myTrophies.length,
    data: myTrophies
  } )
} )

