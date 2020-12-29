const express = require( 'express' )
const { getAllUsers } = require( '../controllers/user.cont' )
const { protect, isAdmin } = require( '../middleware/auth.mdlwr' )
const { setWeek } = require( '../middleware/mdlwrs' )


// app.use( '/api/v1/steps' )
//====================================================================
const router = express.Router( { mergeParams: true } )


// router.use( protect )
// All routes below will use the two middlewares above

// @access  Admin
// @route   GET /api/v1/users
router
  .route( '/' )
  .get( protect, isAdmin, getAllUsers )

router
  // .route( '/top-users-of-week/:weekId' )
  .route( '/top-users-of-week' )
// .get( setWeek, getTopUsersOfWeek )
//   .patch( updateKarname )
//   .delete( deleteKarname )
//   .patch( protect, authorize( 'publisher', 'admin' ), updateStep )
//   .delete( protect, authorize( 'publisher', 'admin' ), deleteStep )

module.exports = router