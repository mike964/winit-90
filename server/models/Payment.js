const mongoose = require( 'mongoose' )
const moment = require( 'moment' )
const Schema = mongoose.Schema
const d = new Date()


const PaymentSchema = new Schema( {
  amount: {   // price (ex: 10)
    type: Number,
    required: [ true, 'Payment amount must be declared' ]
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [ true, 'Message must belong to a user' ]
  },
  type: { //  [ paypal , 'stripe']
    type: String,
    required: true
  },
  paymentResponse: { //   paypal/stripe response object if payment successfull
    type: Object,
    required: true
  },
  // Stripe checkout session id (TEMPORARY)
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {   // var d = new Date("2015-03-25T12:00:00Z")
    type: Date,
    default: Date.now
  }
} )

//===========================================================================
// MatchSchema.virtual( 'predictions', {
//   ref: 'Prediction',
//   localField: '_id',
//   foreignField: 'match',
//   justOne: false
// } ) 

PaymentSchema.pre( /^find/, function ( next ) {
  // this.populate( 'user'.populate( {
  //   path: 'tour',
  //   select: 'name'
  // } ) )

  next()
} )

// MatchSchema.pre( 'remove', async function ( next ) {
//   // Cascade delete Predictions when a Match is deleted - from Brad 
//   await this.model( 'Prediction' ).deleteMany( { match: this._id } )
//   // await this.model( 'PredictionVip' ).deleteMany( { match: this._id } )

//   console.log( `=> All predictions for Match ${ this._id } got deleted.`.blue )
//   next()
// } )

// MatchSchema.pre( 'save', function ( next ) {

//   this.dateEpoch = moment( this.date ).format( 'X' )
//   this.year = moment( this.date ).format( 'YYYY' )
//   // console.log( this )   / { ... Match }
//   console.log( '--- Match.pre( save ) ---' )
//   // console.log( `${ this.team1 } - ${ this.team2 }` ) 

//   next()
// } )



const Message = mongoose.model( 'Payment', PaymentSchema )
module.exports = Message




