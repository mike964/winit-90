
const express = require( 'express' )
const { protect } = require( '../middleware/auth.mdlwr' )
const {
  getMatches, createMatch, getMatch, deleteMatch, updateMatch,
  updateMatchResult, markPredictions, updateTeamsLast5matches,
  createMultipleMatches
} = require( '../controllers/match.cont' )
const {
  setWeek, setTeams, setMatch, setLeague
} = require( '../middleware/mdlwrs' )
const predictionRouter = require( './prediction.route' )

// app.use( '/api/v1/matches' )
//====================================================================
const router = express.Router( { mergeParams: true } )


// router.use( protect )
// All routes below will use the two middlewares above

// Include other resource routers


router
  .route( '/' )
  .get( setWeek, getMatches )
  // .post( setWeek, setTeams, createMatch )
  .post( setWeek, createMatch )

router
  .route( '/multiple' )
  // .get( getMatchesByDuration )
  // .post( createMultipleMatches )  // using api-football : post does't include req.params
  .get( createMultipleMatches )  // using api-football

router
  .route( '/:id' )
  .get( getMatch )
  .patch( updateMatch )
  // .patch( setResult, updateMatchPredictions, updateMatch )

  .delete( deleteMatch )

router.route( '/update-result/:matchId' )
  // .post( updateMatchResult, updateTeamsLast5matches, markPredictions )
  .post( updateMatchResult, markPredictions )

//   .patch( protect, authorize( 'publisher', 'admin' ), updateStep )
//   .delete( protect, authorize( 'publisher', 'admin' ), deleteStep )

router.use( '/:matchId/predictions', setMatch, predictionRouter )

module.exports = router