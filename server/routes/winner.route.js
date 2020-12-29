const express = require( 'express' )
const { getTopUsersOfWeekNumber, getMyTrophies } = require( '../controllers/winners.cont' )
const { protect } = require( '../middleware/auth.mdlwr' )

// app.use( '/api/v1/winners' )
//====================================================================
const router = express.Router( { mergeParams: true } )


// router.use( protect )
// All routes below will use the two middlewares above


router
  .route( '/' )
// .get( getTeams )
// .post( createTeam )

router
  .route( '/my-trophies' )   // Get trophies of logged in user
  .get( protect, getMyTrophies )

router
  .route( '/:year-:weekNumber' )
  .get( getTopUsersOfWeekNumber )



//   .get( getTeam )
//   .patch( updateTeam )
//   .delete( deleteTeam )
//   .patch( protect, authorize( 'publisher', 'admin' ), updateStep )
//   .delete( protect, authorize( 'publisher', 'admin' ), deleteStep )

module.exports = router