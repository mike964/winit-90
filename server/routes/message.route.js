const express = require( 'express' )
const { getMyMessages } = require( '../controllers/msg.cont' )
// const {
//   getKarnames, createKarname, getKarname, updateKarname, deleteKarname, getMyKarnames
// } = require( '../controllers/karname.cont' )
const { protect } = require( '../middleware/auth.mdlwr' )

// app.use( '/api/v1/messages' )
//====================================================================
const router = express.Router()


// router.use( protect )
// All routes below will use the two middlewares above


// router
//   .route( '/' )
//   .get( getKarnames )
//   .post( createKarname )

router
  .route( '/me' )
  .get( protect, getMyMessages )

// router
//   .route( '/:id' )
//   .get( getKarname )
//   .patch( updateKarname )
//   .delete( deleteKarname )
//   .patch( protect, authorize( 'publisher', 'admin' ), updateStep )
//   .delete( protect, authorize( 'publisher', 'admin' ), deleteStep )



module.exports = router