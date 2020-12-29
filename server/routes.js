const express = require( 'express' )
// const app = express()
const router = express.Router()


// app.use( '/api/v1', require( './server/routes' ) )
//==============================================================
// router.use( '/auth', require( './routes/auth.route' ) )
router.use( '/ad', require( './routes/admin.route' ) )
router.use( '/teams', require( './routes/team.route' ) )
router.use( '/leagues', require( './routes/league.route' ) )
router.use( '/matches', require( './routes/match.route' ) )
router.use( '/weeks', require( './routes/week.route' ) )
router.use( '/predictions', require( './routes/prediction.route' ) )
router.use( '/karnames', require( './routes/karname.route' ) )
router.use( '/users', require( './routes/user.route' ) )          // for Admin to CRUD users
router.use( '/vip', require( './routes/vip.route' ) )
router.use( '/winners', require( './routes/winner.route' ) )
router.use( '/messages', require( './routes/message.route' ) )
router.use( '/payment', require( './routes/payment.route' ) )   // paypal - stripe 
module.exports = router