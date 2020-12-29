
// Brad Traversy - Node Masterclass

const asyncHandler = fn => ( req, res, next ) => {
  Promise
    .resolve( fn( req, res, next ) )
    .catch( next )
}

// This is mdlwr to get rid of writing tyrcatch inside async awiat functions

module.exports = asyncHandler