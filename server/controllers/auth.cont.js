const jwt = require( 'jsonwebtoken' )
const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../utils/asyncHandler' )
// const sendEmail = require( '../utils/sendEmail' )
const User = require( '../models/User' )
// const { sendErrorResponse } = require( '../utils/functions' )
const CLIENT_HOMEPAGE = "http://localhost:3000"   // client homepage url


//===============================
// authentication and authorization
// احراز هویت کاربر و اجازه دادن
//==============================

//==============================================================
// ** Create & Send jwt token to Client when login/singup
const sendTokenResponse = ( user, statusCode, res ) => {
  // *** BRAD ***
  // const token = user.signJwtToken()
  // jwt.sign(payload: 'Data we wannsa store in the token' , jwt_secret, jwt_expire ) 
  const token = jwt.sign( { id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN } )

  const cookie_options = {
    // set cookie expiration - same as token expiration 
    expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 ),
    httpOnly: true
  }

  if ( process.env.NODE_ENV === 'production' ) {
    cookie_options.secure = true
  }

  // Remove password from output
  // user.password = undefined   

  const { name, email, balance, ide } = user
  let user_ = { name, email, balance, ide }

  if ( user.role === 'admin' )
    user_.isAdmin === true

  res
    .status( statusCode )  // statusCode: 200 
    .cookie( 'token', token, cookie_options )   // (cookie name - value - options) 
    // .cookie( 'wntkn', token, cookie_options )   // (cookie name - value - options) 
    .json( {
      success: true,
      token,   // so important
      user: user_   // {...user} shoud not be sent , only token 
    } )
}



// @desc      Register user
// @access    Public     
// @route     POST /api/v1/auth/signup
exports.signup = asyncHandler( async ( req, res, next ) => {
  const { name, email, password } = req.body    // pull out data from req.body 

  // Create user - Add to DB
  let newUser = await User.create( {
    name,
    // balance: 2,   // For new user $2 gift - Give user $2 gift when he validate email
    balance: 0,
    email,
    password
  } )


  if ( !newUser ) {
    // return sendErrorResponse( res, error )
  }

  sendTokenResponse( newUser, 200, res )
} )

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler( async ( req, res, next ) => {
  const { email, password } = req.body

  // Check if email & password exist 
  if ( !email || !password ) {
    return next( new ErrorResponse( 'Please provide an email and password', 400 ) )
  }

  // Check if User exist & password is correct
  // select the password as well in order to validate it for login
  const user = await User.findOne( { email } ).select( '+password' )

  // if ( !user ) { return next( new ErrorResponse( "User not found.", 401 ) ) }
  if ( !user ) { return next( new ErrorResponse( 'Wrong email or password!', 401 ) ) }

  // Check if entered password matches the one in db
  // Will return true or false
  const isMatch = await user.comparePasswords( password )
  if ( !isMatch ) { return next( new ErrorResponse( 'Wrong email or password!', 401 ) ) }

  // Else if both user exist and passwords match => Generate & Send token & cookie
  sendTokenResponse( user, 200, res )
} )

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler( async ( req, res, next ) => {
  console.log( '--- logout() :auth.cont ---' )
  //  *** Delete jwt token
  res.cookie( 'token', '', {
    // expires in 10 scnds
    expires: new Date( Date.now() + 10 * 1000 ),
    httpOnly: true
  } )

  req.logout()
  res.redirect( CLIENT_HOMEPAGE )  // *** Importante

  // res.status( 200 ).json( {
  //   success: true,
  //   //data: {}
  // } )
} )

// @desc      Get current logged in user data from DB
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler( async ( req, res, next ) => {
  console.log( '--- getMe() ---' )
  // req.user.id comes from protect mdlwr 
  // const user = await User.findById( req.user.id ).select( '-password' )   // works
  // const user = await User.findById( req.user.id ).select( '-_id' )          // works 
  // const user = await User.findById( req.user.id ).select( '-password, -_id', )   // works
  const user = await User.findById( req.user.id )  // works - this also returns the user _id

  // For security: To prevent returning user._id & password
  const { name, email, balance, ide } = user
  // *** In order to prevent returning user._id
  let user_ = { name, email, balance, ide }

  if ( user.role === 'admin' )
    user_.isAdmin === true

  // check to see _id should be send or not

  // If logged in user is Admin 
  res.status( 200 ).json( {
    success: true,
    // user: user.role === 'admin' ? { ...user_, isAdmin: true } : user_  // Works fine
    user: user_  // Works fine
  } )
} )


