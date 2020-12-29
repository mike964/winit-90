const express = require( 'express' )
const {
  getTeams, createTeam, getTeam, updateTeam, deleteTeam
} = require( '../controllers/team-lig.cont' )

// app.use( '/api/v1/steps' )
//====================================================================
const router = express.Router( { mergeParams: true } )


// router.use( protect )
// All routes below will use the two middlewares above


router
  .route( '/' )
  .get( getTeams )
  .post( createTeam )

router
  .route( '/:id' )
  .get( getTeam )
  .patch( updateTeam )
  .delete( deleteTeam )
//   .patch( protect, authorize( 'publisher', 'admin' ), updateStep )
//   .delete( protect, authorize( 'publisher', 'admin' ), deleteStep )

module.exports = router