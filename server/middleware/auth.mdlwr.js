const jwt = require( 'jsonwebtoken' )
const colors = require( 'colors' )
const asyncHandler = require( '../utils/asyncHandler' );
const ErrorResponse = require( '../utils/errorResponse' );
const User = require( '../models/User' );

// Protect routes
exports.protect = asyncHandler( async ( req, res, next ) => {

  console.log( '----- protect() mdlwr -----'.yellow )

  console.log( '- req.user: ' )
  console.log( req.user )   // Fuck yes: Either undefined or {...user} comes from passportJs

  console.log( '- req.headers.authorization: ' )
  console.log( req.headers.authorization )


  // If req.uesr exist: means PassportJs - Google
  if ( req.user ) {
    // *** Passport JS *** 
    next()

  } else {
    // *** JWT *** 
    let token

    if ( req.headers.authorization && req.headers.authorization.startsWith( 'Bearer' ) ) {
      // Set token from Bearer token in header
      token = req.headers.authorization.split( ' ' )[ 1 ];
      console.log( '- Token comes from req.headers.authorization' )
      // Set token from cookie
    } else if ( req.cookies.token ) {
      // Always can load token with every request from cookie - req.cookies is set when user login
      token = req.cookies.token
      console.log( '- Token comes from req.cookies' )
      // ** This block is not complete yet

      // } else if ( !token ) {
    } else {    // Make sure token exists
      console.log( 'No token!' )
      return next( new ErrorResponse( 'No token!', 401 ) )
    }

    // console.log( token )   // output: Bearer 5ee0e50fa350c44dd0daa385

    // Verify token if exist  {userid , issuedat, expiration}
    const decodedToken = jwt.verify( token, process.env.JWT_SECRET )

    // console.log( decodedToken )   // output: { id: '5edbf8e44ae9a940185278d9', iat: 1591521162, exp: 1594113162 }
    // console.log( 'Token: ' + token )

    let user = await User.findById( decodedToken.id )
    // req.user = await User.findById( token )
    // console.log( req.user )
    if ( !user ) {
      return next( new ErrorResponse( 'User not found!', 401 ) )
    }
    // ELSE - SET USER
    req.user = user
    // req.body.user = user._id
    // req.query.user = user._id

    next()
  }
} )


// SET USER MIDDLEWARE
exports.setUser = asyncHandler( async ( req, res, next ) => {
  // console.log( req.params )   // { year: '2021', weekNumber: '29' }
  // console.log( req.query )    // { week: 'thisweek' } 

  console.log( '--- setUser() ---'.yellow )

  // for (GET requset)
  if ( req.user ) {   // req.user comes from protect mdlwr
    if ( req.method === 'GET' ) {
      req.query.user = req.user._id   // req.user comes from protect() 

    } else {    // for (POST, Update, Delete, ...)
      req.body.user = req.user._id
    }

  } else {
    console.log( 'req user not exist!' )
    // RETURN ERROR
  }

  next()
} )


// check If Logged in User is Admin
exports.isAdmin = ( req, res, next ) => {
  console.log( '--- isAdmin() mdlwr ---' )
  // console.log( req.user )

  if ( req.user && ( req.user.isAdmin || req.user.role === 'admin' ) ) {
    next()
  } else {
    res.status( 401 )
    throw new Error( 'Not authorized as an Admin' )
  }
}

// Grant access to specific user roles - this is same as restrictedTo in Jonas project 
exports.restrictedTo = ( ...roles ) => {  // (publisher, admin, ..) will get passed in
  return ( req, res, next ) => {
    if ( !roles.includes( req.user.role ) ) {
      return next(
        new ErrorResponse( `User ${ req.user.id } is not authorized to access this route`, 403 )
      )
    }

    next()
  }
}
