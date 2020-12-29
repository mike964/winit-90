var colors = require( 'colors' )
const ErrorResponse = require( './errorResponse' );

// Brad Traversy - Custom errorHandler mdlwr 
// helps us get Json error in response instead of html

const errorHandler = ( err, req, res, next ) => {
  console.log( '--- errorHandler() ---'.cyan )

  let error = { ...err }
  error.message = err.message

  // Log to console for developer
  // console.log(err)    // for test
  console.log( err.stack.red )   // .red will show error in red color in Terminal
  //// error.stack id too big

  // Mongoose bad ObjectId
  if ( err.name === 'CastError' ) {
    const message = `Resource not found`;
    error = new ErrorResponse( message, 404 );
  }

  // Mongoose duplicate key
  if ( err.code === 11000 ) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse( message, 400 );
  }

  // Mongoose validation error
  if ( err.name === 'ValidationError' ) {
    const message = Object.values( err.errors ).map( val => val.message );
    error = new ErrorResponse( message, 400 );
  }

  res.status( error.statusCode || 500 ).json( {
    // res.status( 200 ).json( {   //😜😝 ها ها ها ، خارکسه 
    success: false,
    statusCode: error.statusCode,
    err_msg: error.message || 'Server Error'
  } );
};

module.exports = errorHandler;
