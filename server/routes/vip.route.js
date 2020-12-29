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
const { createViprediction, getVipredictions, getMyVipredictions, markVipredictions, deleteViprediction } = require( '../controllers/vip.cont' )


// router.use( '/vip')
//==========================================================
const router = express.Router()

// router.use( protect )
// All routes below will use the two middlewares above

router
  .route( '/' )
  .get( getVipredictions )
  .post( protect, createViprediction )
// Same route as above but without protect 


router.route( '/me' )
  .get( protect, getMyVipredictions )

//Mark vip prediction of matchId as correct or not according to match result by admin
router.route( '/mark/:matchId' )   // restrictedTo 'superAdmin
  .get( markVipredictions )

router.route( '/:id' )
  .get( getPrediction )
  .patch( updatePrediction )
  .delete( deleteViprediction )

// .get( checkUser, getPrediction )
// .patch( checkUser, updatePrediction )
// .delete( checkUser, deletePrediction )


// // Get Steps of a Prediction - Re-route into other router
// router.use( '/:PredictionId/steps', checkPredictionUser, stepRouter )
// router.use( '/steps', stepRouter )


module.exports = router