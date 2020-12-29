const mongoose = require( 'mongoose' )
const moment = require( 'moment' )
const { genLigCode } = require( '../utils/functions' )
const Schema = mongoose.Schema


// Top Users list of Week Id
// Each Week has 1 or more ulist
const UlistSchema = new Schema( {
  week: {
    type: mongoose.Schema.ObjectId,
    ref: 'Week',
    required: [ true, 'Match must belong to a week' ]
  },
  users: {   // participated users 'ide's. Array of strings
    type: Array,
    default: []
  },
  topUsers: {   // Sorted users (by points). Array of objects - for frontend (no id's) for security 
    type: Array,
    default: []
  },
  year: {
    type: String,
    default: moment().format( 'YYYY' )
  },
  createdAt: {   // var d = new Date("2015-03-25T12:00:00Z")
    type: Date,
    default: Date.now
  },
  code: {   // ide for ex. A-22 / E-48
    type: String,
    unique: true,
  }
  //===========================================================
  // *** Admin will set The fields below after match finish *** 
  //===========================================================
  // finished: {
  //   type: Boolean,
  //   default: false
  // }, 
  // predictions :[]   // get array of related predictions by reverse populate
  // } 
  // ,  {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true }
} )



//===========================================================================
// MatchSchema.virtual( 'predictions', {
//   ref: 'Prediction',
//   localField: '_id',
//   foreignField: 'match',
//   justOne: false
// } )
// MatchSchema.virtual( 'vipredictions', {
//   ref: 'PredictionVip',
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


UlistSchema.pre( 'save', function ( next ) {
  console.log( '--- Ulist.pre( save ) ---' )
  this.code = genLigCode()
  next()
} )

// findByIdAndUpdate
// MatchSchema.pre( /^find/, function ( next ) {
// /^find/ means => this mdlwr function will be executed for all query functions that start with 'find' (like; find(), findOne(), ... )

// MatchSchema.pre( 'findOneAndUpdate', function ( next ) {
//   // MatchSchema.pre( /^find/, function ( next ) { 
//   console.log( '--- Match.pre( findOneAndUpdate ) ---' )

//   // console.log( req.body )   // doesn't work here 

//   // console.log( this )  // output: Query { ... so long ...}

//   next()
// } )  

const Ulist = mongoose.model( 'Ulist', UlistSchema )
module.exports = Ulist




