const colors = require( 'colors' )
const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../utils/asyncHandler' )
const crud = require( '../utils/crudHandler' )
const User = require( '../models/User' )

//============================================================
// @desc      Get all users
// @route     GET /api/v1/users
// @access    Private/Admin
exports.getAllUsers = crud.getAll( User )
exports.getUser = crud.getOne( User )
exports.createUser = crud.createOne( User )
exports.updateUser = crud.updateOne( User )
exports.deleteUser = crud.deleteOne( User )


// Make payment or Get paid
exports.updateUserBalance = async ( userId, _amount ) => {
  // If amount  Negative amount means make payment - positive means get paid
  console.log( '--- updateUserBalance() ---'.yellow )
  // update user balance , make payment by user to admin  


  if ( !_amount ) {
    console.log( '_amount is null' )
    return false
  }

  // ** CONVERT NUMBERS TO INT
  let amount = parseInt( _amount )
  let user = await User.findById( userId )
  // let user_balance = req.user.balance
  let user_balance = parseInt( user.balance )

  if ( !user ) {
    // return sendErrorResponse( res, 'User not exist' ) // Not workin
    console.log( 'User not found!' )
    return false
  }

  if ( amount < 0 ) {  // means if user wants to make payment
    if ( !user_balance || user_balance <= 0 || user_balance < Math.abs( amount ) ) {
      // Math.abs( amount ) return positive number
      // If user has no credit/balance , return error
      // return next( new ErrorResponse( 'Not enough Balance', 401 ) )
      console.log( 'Not enough balance!' )
      return false            // Don't move next line
    }
  }


  let newBalance = user_balance + amount   // Amount could be - or +
  console.log( 'newBalance: ' + newBalance )

  // If user has at leas $1 balance - Make payment
  // First Check User Balance, Then Make Payment, Then create New Karname  
  try {
    let updatedUser = await User.findByIdAndUpdate( userId, { balance: newBalance }, {
      new: true,
      runValidators: true
    } )

    // console.log( updatedUser )
    console.log( 'User.balance updated successfully.'.green )
    return true

  } catch ( error ) {
    console.log( error )
    return false
  }
}