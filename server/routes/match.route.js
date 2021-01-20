
const express = require( 'express' )
const { protect } = require( '../middleware/auth.mdlwr' )
const {
  getMatches, createMatch, getMatch, deleteMatch, updateMatch,
  updateMatchResult, markPredictions, createMultipleMatches, updateMultipleResults
} = require( '../controllers/match.cont' )
const {
  setWeek, setTeams, setMatch, setLeague
} = require( '../middleware/mdlwrs' )
const predictionRouter = require( './prediction.route' )
const { axios } = require( 'axios' )

// app.use( '/api/matches' )
//====================================================================
const router = express.Router( { mergeParams: true } )


// router.use( protect )
// All routes below will use the two middlewares above

// Include other resource routers


router
  .route( '/' )
  // .get( setWeek, getMatches )
  .get( getMatches )
  // .post( setWeek, setTeams, createMatch ) 
  .post( setTeams, createMatch )

router
  .route( '/multiple' )
  // .get( getMatchesByDuration )
  // .post( createMultipleMatches )  // using api-football : post does't include req.params
  .get( createMultipleMatches )  // using api-football

// router.route('/multiple-all-ligs').get(function (req,res,next) {
// console.log('--- Add multiple match - all ligs ---')
//   // ** Call the create multiple matches route few times

//   let serverUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000' 
//   : process.env.PROD_URL

//   // {{URL}}/api/matches/multiple?season=2020&league=39&from=2021-01-24&to=2021-01-30&createMatches=true

//   let from_
//   let to_

//   const ligCodes = [39, 140, 135,61,  2,3]  // ucl:2 , uel: 3

//   ligCodes.forEach((item)=>{

//   })

//   try {

//   } catch (error) {

//   }
//  axios.get()


// })

// ** Update multiple match results using api-football
router.route( '/update-multiple-result' )
  .get( updateMultipleResults )

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