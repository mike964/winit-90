var colors = require( 'colors' )
var moment = require( 'moment' )
const Team = require( '../models/Team' )

// Logger Middlwr Example
const logger = ( req, res, next ) => {

  var d = new Date()

  // req.hello = 'Hello World'
  // console.log( 'Middleware ran' )   // This will show in the Terminal   // FOR TEST

  // Don't display image requests (png, jpg,...) in console. if  GET: localhost:5000 /api/logos/_ligs/140.png
  let x = req.originalUrl.startsWith( '/api/logos' ) || req.originalUrl.startsWith( '/static' )
  // let x = false   // FOR TEST
  // console.log( '- x: ' + x )  // Boolean

  // *** Ignore showing requests for static assets (jpg, png, ...) in Terminal
  if ( !x ) {
    console.log( '------- logger() ------'.magenta )
    console.log(
      // `${ req.method } ${ req.protocol } :// ${ req.get( 'host' ) } ${ req.originalUrl }`
      `${ req.method }: ${ req.get( 'host' ) } ${ req.originalUrl }`.magenta
    )
    console.log( `min-sec-milis: ${ d.getMinutes() }:${ d.getSeconds() }:${ d.getMilliseconds() }`.cyan )
    console.log( '--- req.body: ' )
    console.log( req.body )
    console.log( '--- req.params: ' )
    console.log( req.params )
    console.log( '--- req.query: ' )
    console.log( req.query )
  }


  // await Prediction.updateMany(
  // { match: matchId, answerKey: match.resultKey, goalDifference: match.goalDifference },
  // { correct: true, correctGD: true } ) 



  next()
}


module.exports = logger