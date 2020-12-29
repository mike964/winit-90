class ErrorResponse extends Error {

  constructor( message, statusCode ) {  // takes in msg n status code
    super( message );
    this.statusCode = statusCode;

    Error.captureStackTrace( this, this.constructor );
  }
}

module.exports = ErrorResponse;
