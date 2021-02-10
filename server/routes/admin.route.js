const express = require( 'express' )
const { protect, restrictedTo } = require( '../middleware/auth.mdlwr' )
const {
  createUser,
  getUsers,
  getTopUsersOfWeek,
  payWeeklyWinners,
  updateOdds
} = require( '../controllers/admin.cont' )
const userRouter = require( './user.route' )
const {
  updateAllKarnamesStats, createKarname, updateKarnamesPostion,
} = require( '../controllers/karname.cont' )
const {
  calculatePointsForMatchPrds
} = require( '../controllers/match.cont' )
const {
  payWinrByKarnameId
} = require( '../controllers/admin.cont' )
const { doExtra } = require( '../utils/extra' )
const Odds = require( '../models/Odds' )

// router.use( '/adm', require( './routes/admin.route' ) )
//=============================================================
const router = express.Router()

// * only user.role = admin can crud users
router.use( protect )
router.use( restrictedTo( 'admin' ) )   // Jonas
// ** All routes below will use the two middlewares above

// router
//   .route( '/update-karname-stats/:karnameId' )
//   .get( updateKarnameStats )

// Update Karnames of weekId Stats (total prds + points)
router.route( '/update-all-karnames/:weekId' )
  .get( updateAllKarnamesStats )

router.route( '/update-all-karnames-postion/:weekId' )
  .get( updateKarnamesPostion )


// Calculate points for predictions of matchId
router.route( '/calculate-points/:matchId' )
  .get( calculatePointsForMatchPrds )

// GET / Make top users of week by admin
router.route( '/make-top-users-of-week/:weekId' )
  .get( getTopUsersOfWeek )

router.route( '/add-fake-karname' )
  .post( createKarname )

router.route( '/pay-weekly-winners/:weekId' )
  .post( payWeeklyWinners )
// router.route( '/pay-vip-winners/:weekId' )
//   .post( createKarname )

// Give trophy + msg to winners of week (not used anymore)
// router.route( '/give-prize/:weekId' )
//   .get( giveWinnersPrize )

// * Pay a winner by karname Id
router.route( '/pay-winner-by-karname-id' )
  .post( payWinrByKarnameId )

router.route( '/do-extra' ).get( doExtra )

// * Update Odds for 6 ligs in DB by admin using external api
router.route( '/update-odds' ).get( updateOdds )
router.route( '/odds' ).get( async ( req, res, next ) => {
  // **  


  let odds = await Odds.findById( "6024309eaa5a162990d0bd4f" )

  res.json( {
    success: true,
    odds
  } )
} )

// router
//   .route( '/update-karname-stats' )
//   .get( updateKarnameStats )

router.use( '/users', userRouter )


// router.route( '/:id' )
//   .delete( deleteUser )
//   .put( updateUser )

// SEND GIFT TO USER IF HE MAKE CORRECT VIP PREDICTION 


module.exports = router