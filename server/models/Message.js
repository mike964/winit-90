const mongoose = require( 'mongoose' )
const moment = require( 'moment' )
const Schema = mongoose.Schema
const d = new Date()


const MessageSchema = new Schema( {
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [ true, 'Message must belong to a user' ]
  },
  title: { //  [congrats - hint - warning - note]
    type: String,
    required: true
  },
  lang: { // language:  [arb , eng]
    type: String,
    required: true
  },
  txt: { // eg. Congratulations! You've won a new trophy
    type: String,
    required: true
  },
  read: {   // User read this msg or not
    type: Boolean,
    default: false
  },
  hidden: {   // User can't truly delete msg, only set hidden
    type: Boolean,
    default: false
  },
  createdAt: {   // var d = new Date("2015-03-25T12:00:00Z")
    type: Date,
    default: Date.now
  },
  year: {
    type: String, // 2020 - this will be calculated automatically  
    default: d.getFullYear()
  },
  toAdmin: {   // from user, to admin (msgs for admin)
    type: Boolean,
    default: false
  },
  type: { // ['cashout', 'suggestion' , 'other']
    type: Object,
    //{
    // amount
    // }
  }
} )

//===========================================================================
// MatchSchema.virtual( 'predictions', {
//   ref: 'Prediction',
//   localField: '_id',
//   foreignField: 'match',
//   justOne: false
// } ) 

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



const Message = mongoose.model( 'Message', MessageSchema )
module.exports = Message




