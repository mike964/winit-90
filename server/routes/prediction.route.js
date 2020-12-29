const express = require( 'express' )
const { protect, setUser, restrictedTo } = require( '../middleware/auth.mdlwr' )
const {
  createPrediction,
  createMultiplePredictions,
  getPredictions,
  getPrediction,
  updatePrediction,
  deletePrediction
} = require( '../controllers/prediction.cont' )
const { setKarname, setWeek } = require( '../middleware/mdlwrs' )


// router.use( '/predictions')
//==========================================================
const router = express.Router()

// router.use( protect )
// All routes below will use the two middlewares above

router
  .route( '/' )
  // .get( restrictedTo( 'admin' ), getPredictions )
  .get( setWeek, getPredictions )
// .post( protect, setKarname, createPrediction )

// Add [] of predictions by user
router
  .route( '/multiple' )
  .post( protect, setKarname, createMultiplePredictions )

router.route( '/me' )
  // .get( protect, setUser, setWeek, getPredictions )
  .get( protect, setUser, getPredictions )

router.route( '/:id' )
  .get( getPrediction )
  .patch( updatePrediction )
  .delete( deletePrediction )

// .get( checkUser, getPrediction )
// .patch( checkUser, updatePrediction )
// .delete( checkUser, deletePrediction )


// // Get Steps of a Prediction - Re-route into other router
// router.use( '/:PredictionId/steps', checkPredictionUser, stepRouter )
// router.use( '/steps', stepRouter )


module.exports = router