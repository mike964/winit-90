const express = require( 'express' )
const {
  getWeeks, createWeek, getWeek, updateWeek, deleteWeek, getWeekByNumber
} = require( '../controllers/week.cont' )
const matchRouter = require( './match.route' )
const { findWeekByNumber } = require( '../middleware/mdlwrs' )

// app.use( '/api/v1/weeks' )
//====================================================================
const router = express.Router( { mergeParams: true } )


// router.use( protect )
// All routes below will use the two middlewares above


router
  .route( '/' )
  .get( getWeeks )
  .post( createWeek )

router
  .route( '/:id' )
  .get( getWeek )
  .patch( updateWeek )
  .delete( deleteWeek )

router.route( '/:year/:number' )
  .get( getWeekByNumber )

// router.use( '/:year-:weekNumber/matches', findWeekByNumber, matchRouter )

//   .patch( protect, authorize( 'publisher', 'admin' ), updateStep )
//   .delete( protect, authorize( 'publisher', 'admin' ), deleteStep )

module.exports = router