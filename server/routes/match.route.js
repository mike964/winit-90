
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
const axios = require( 'axios' )

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

router.route( '/insertmany-multiple-ligs' )
  .post( async ( req, res, next ) => {
    console.log( '--- Add multiple match - all ligs ---' )
    // ** Call the create multiple matches route few times

    let serverUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000'
      : process.env.PROD_URL

    // {{URL}}/api/matches/multiple?season=2020&league=39&from=2021-01-24&to=2021-01-30&createMatches=true

    let from_ = req.body.from
    let to_ = req.body.to
    let season_ = req.body.season

    // const topLigs = [ 2, 3 , 5, 39, 140, 135, 61, , 45 , 143,137 , 66 ]  // ucl:2 , uel: 3
    //  coppa italia : 137, copa del rey 143, fa cup 45, coupe de france 66 
    // unl : 5 , 

    // let ligCodes = req.body.allLigs === true ? topLigs : req.body.ligs

    // let ligsArr = ligCodes
    // console.log( ligCodes )
    // console.log( ligsArr )

    ligCodes = req.body.ligs



    // ** forEach is not promise-aware. It deosnt support async and await.  

    const forLoop = async ( ligCodesArr ) => {
      console.log( 'Start' )

      for ( let i = 0; i < ligCodesArr.length; i++ ) {
        // Get num of each fruit - Call createMultipleMatches for each LigCode
        try {
          // console.log( ligCodes[ i ] )
          const res = await axios.get( `${ serverUrl }/api/matches/multiple?season=${ season_ }&league=${ ligCodesArr[ i ] }&from=${ from_ }&to=${ to_ }&createMatches=true` )
          console.log( res.data )  // Good Good

        } catch ( error ) {
          console.log( error )
          return false
        }
      }

      console.log( 'End.' )
      return true
    }

    // Worked for 140 but no loop

    let success_ = await forLoop( ligCodes )

    res.json( {
      success: success_,
      end: true
    } )

  } )

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