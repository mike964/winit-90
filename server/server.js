// require( 'dotenv' ).config( { path: './config/config.env' } )
require( 'dotenv' ).config()
const path = require( 'path' )
const express = require( 'express' )
const cors = require( 'cors' )
const fileupload = require( 'express-fileupload' )
const cookieParser = require( 'cookie-parser' )
const compression = require( 'compression' )
const connectDB = require( './config/db' )
const logger = require( './middleware/logger.mdlwr' )
const errorHandler = require( './utils/errorHandler' )
const stripe = require( 'stripe' )( 'sk_test_51HIswIHUvZEzaEJSZAoYSNE2wPa96IsgfQeQ9bk3n4t80IXFp7M5TgqczGu40mK1e2KyksktGtbFFQTtLyDYE1cV00UIO4qHfs' );
const cookieSession = require( "cookie-session" )
const passport = require( "passport" )
require( "./config/passport-config" )   // *** REQUIRED! ***
// import { getClientUrl } from './utils/get-client-url';
const getClientUrl = require( './utils/get-client-url' );
//=====================================================================
// connect mongodb
connectDB()

const app = express()

// *** Setting Middlewares *** 
//============================
// *** Request Body Parser
app.use( express.json() )

// Prevent cors error
// app.use( cors() )

// set up cors to allow us  to accept requests from our client
app.use(
  cors( {
    // allow to server to accept request from different origin
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  } )
);

// *** File Upload
app.use( fileupload() )
// *** Comprese http response bodies (txt,json, ...) to minimum size when sending to client
app.use( compression() )



app.use(
  cookieSession( {
    name: "session",
    keys: [ process.env.COOKIE_KEY ],
    maxAge: 24 * 60 * 60 * 100
  } )
)

// ** Parse cookies - to use req.cookies
app.use( cookieParser() )

// initalize passport
app.use( passport.initialize() )
// deserialize cookie from the browser
app.use( passport.session() )

// *** Logger ***
// ==============
app.use( logger )

// app.get( '/', ( req, res ) => res.send( "Hello from '/'" ) )

// Using Error Handler Middleware - In order to send json error instead of html
app.use( errorHandler )


// *** Passport js routes ( Google / Facebook )
app.get( '/test', ( req, res ) => res.send( "Testing server ..." ) )
app.use( '/auth', require( './routes/auth.route' ) )
// *** Mount API Routers ***  ) ) 
app.use( '/api', require( './routes' ) )

// *** Set public as static files folder  
app.use( '/api', express.static( path.join( __dirname, 'public' ) ) )
// http://localhost:3500/some-picture.jpg
// http://localhost:3500/api/some-picture.jpg 


if ( process.env.NODE_ENV === 'production' ) {
  // *** When we deploy to the server - Run React js client as static folder
  // app.use( express.static( path.join( __dirname, '/client/build' ) ) )
  app.use( express.static( path.join( __dirname, '../client/build' ) ) )
  app.get( '*', ( req, res ) => res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) ) )

} else {      //  if NODE_ENV == development
  app.get( '/', ( req, res ) => res.send( "Hello from '/'. NODE_ENV == development" ) )
}

// Fetch PayPal Client ID (for frontend)
// @Route    http://localhost:3500/api/config/paypal
// app.get( '/api/config/paypal', ( req, res ) => res.send( process.env.PAYPAL_CLIENT_ID ) ) 



const port = process.env.PORT || 5000
app.listen( port, () => {
  console.log( `Server running on port : ${ port }` )
  console.log( "NODE_ENV : " + process.env.NODE_ENV )
  let clientUrl = getClientUrl()
  console.log( "CLIENT URL : " + clientUrl )
} )