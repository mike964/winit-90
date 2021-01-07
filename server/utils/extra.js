const axios = require( 'axios' )
const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../utils/asyncHandler' )
const { qrFunc } = require( '../utils/queryFunction' )
const Karname = require( '../models/Karname' )
const Prediction = require( '../models/Prediction' )
const crud = require( '../utils/crudHandler' )
const User = require( '../models/User' )
const Team = require( '../models/Team' )
const Viprediction = require( '../models/Viprediction' )
const { insertMany } = require( '../models/Team' )
const Week = require( '../models/Week' )



////////////////////////////////
// **  EXECUTE UPDATEMANY  ** //   
///////////////////////////////
const updateManyTeams = async () => {
  // Update All VIP REDS
  const response = await Team.updateMany(
    //  { country: 'england' },
    // { last3: null, position: 3 } )
    // { last5: [ 'w', 'w', 'l', 'd', 'l' ], position: 12 }
    // { confederation: 'UEFA' }, { confederation: 'uefa' }
    { country: 'france' }, { country: 'France' }
  )
  console.log( response )   // { n: 23, nModified: 0, ok: 1 } 

  return response
}

const updateManyViprds = async () => {
  // Update All VIP REDS
  const response = await Viprediction.updateMany(
    { vip: true }
  )
  console.log( response )   // { n: 23, nModified: 0, ok: 1 }
}

// updateManyTeams()

// For ex updateMany teams by admin
// {{URL}}/api/v1/ad/do-extra
exports.doExtra = asyncHandler( async ( req, res, next ) => {
  console.log( '===== doExtra() ====='.yellow )
  // console.log( req.query )

  // response = await updateManyTeams()
  // updateManyViprds()

  // await Week.insertMany( weekss )

  res.status( 200 ).json( {
    success: true,
    response
  } )

} )

// doExtra()

// let x = JSON.stringify( weekss )
// console.log( x )

