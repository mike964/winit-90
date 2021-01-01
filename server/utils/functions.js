const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../utils/asyncHandler' )
const User = require( '../models/User' )

// export const getRandomNumber = () => {
//   // return random number bw 0 - 4

//   // Fix odds ratios to make it more logical 

//   const odds = [ 0, 0, 1, 1, 2, 2, 3, 4, 5 ]

//   const randomNumber = Math.floor( Math.random() * 9 )
//   // console.log( randomNumber )

//   // return Math.floor( Math.random() * 6 )
//   return odds[ randomNumber ]
// }

// exports.sendErrorResponse = ( res, errorMsg ) => {
//   res.status( 200 ).json( {
//     success: false,
//     // error,    // Not good for security
//     error: errorMsg   // Not good for security
//     // error_msg: error.errmsg,
//     // err_code: error.code, 
//   } )
// }

// lsn // 10.16

// *** Filter object
const filterObj = ( obj, ...allowedFields ) => {

  const newObj = {}

  Object.keys( obj ).forEach( el => {
    if ( allowedFields.includes( el ) )
      newObj[ el ] = obj[ el ]
  } )

  return newObj
}

module.exports = filterObj


// for ex. if total 5 n num = 2 , result should be 40 percent 
exports.getPercentage = ( num, total ) => parseInt( ( 100 * num ) / total )
// export const getPercentage = ( num, total ) => parseInt( ( 100 * num ) / total )


// Generate Top Users League IDE - // for ex A-22
exports.genLigCode = () => {

  // const letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z' ]
  const letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ]
  // letters count = 24 

  const randomNumFrom0To23 = Math.floor( ( Math.random() * 10 ) )
  const randomNumFrom10To99 = Math.floor( ( Math.random() * 90 ) + 10 )

  return `${ letters[ randomNumFrom0To23 ] }-${ randomNumFrom10To99 }`

}