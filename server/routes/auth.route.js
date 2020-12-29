const express = require( 'express' )
const router = express.Router()
const passport = require( 'passport' )
const {
  signup,
  login,
  logout,
  getMe,
  // updateDetails, 
  // updatePassword
} = require( '../controllers/auth.cont' )
const { protect } = require( '../middleware/auth.mdlwr' )
const CLIENT_HOMEPAGE = "http://localhost:3000"   // client homepage url

// @route   /auth
//=================================================================


router.post( '/signup', signup )
router.post( '/login', login )

// * Both routes below works fine to get user data from db by token
// router.get( '/', protect, getMe )  // Causes Error bcuz this routes is used to authenticate google
router.get( '/me', protect, getMe )
router.get( '/logout', logout )

// ====================================
// *** GOOGLE AUTH -  PASSPORT JS  ***
//====================================
// @desc    Auth with Google 
router.get( '/google', passport.authenticate( 'google', { scope: [ "profile", "email" ] } ) )

// @desc    Google auth callback 
router.get( '/google/callback', passport.authenticate( 'google',
  { failureRedirect: '/' } ),
  // Success redirect
  ( req, res ) => res.redirect( `${ CLIENT_HOMEPAGE }/matches` )
)

// when login is successful, retrieve user info
router.get( "/login/success", ( req, res ) => {
  console.log( '--- login success ---' )

  // console.log( req )
  //  req.session: { user: '5fd7c567ab24de5028a0ee91' }
  // req.user : '5fd7c567ab24de5028a0ee91' (user mongo _id)
  // ERROR: req.user should be {...user}, Not just user id
  // @toFix: Remove user.password and sensitive information before sendig response to client

  // in Browser Application / Cookies , cookie name will be 'session'
  if ( req.user ) {
    res.json( {
      success: true,
      message: "User logged in successfully.",
      user: req.user,
      // cookies: req.cookies
    } )
  } else {
    console.log( "Error: req.user does not exist!" )
  }
} )

// when login failed, send failed msg
router.get( "/login/failed", ( req, res ) => {
  console.log( '--- login failed ---' )

  res.status( 401 )
    .json( {
      success: false,
      message: "user failed to authenticate."
    } )
} )


// *** AUTH CHECK *** (Google)
// *** Check every time when client browser reload if user logged in or not
// if User is already login, send the profile response, (load user)
// otherwise, send a 401 response that the user is not authenticated
// @route   /auth
router.get( "/", ( req, res ) => {
  // This function is acturlly similar to '/auth/login/success'

  // @toFix: this function should be user both for 
  // Google and jwt auth

  if ( !req.user ) {
    res.status( 401 ).json( {
      authenticated: false,
      message: "user has not been authenticated"
    } );
  }

  res.status( 200 )
    .json( {
      success: true,   // moslm added this line
      message: "user successfully authenticated",
      user: req.user,
      // cookies: req.cookies
    } );
} )



// router.put( '/update-details', protect, updateDetails )
// router.put( '/update-password', protect, updatePassword )
// router.post('/forgot-password', forgotPassword)
// router.put('/reset-password/:resettoken', resetPassword)

module.exports = router