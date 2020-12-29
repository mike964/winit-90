const express = require( 'express' )
const {
  getLeagues, createLeague, getLeague, updateLeague, deleteLeague
} = require( '../controllers/team-lig.cont' )

// app.use( '/api/v1/steps' )
//====================================================================
const router = express.Router( { mergeParams: true } )


// router.use( protect )
// All routes below will use the two middlewares above


router
  .route( '/' )
  .get( getLeagues )
  .post( createLeague )

router
  .route( '/:id' )
  .get( getLeague )
  .patch( updateLeague )
  .delete( deleteLeague )
//   .patch( protect, authorize( 'publisher', 'admin' ), updateStep )
//   .delete( protect, authorize( 'publisher', 'admin' ), deleteStep )

module.exports = router