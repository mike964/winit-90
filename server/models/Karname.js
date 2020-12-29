const mongoose = require( 'mongoose' )
const colors = require( 'colors' )
const moment = require( 'moment' )
const d = new Date()
const Schema = mongoose.Schema

// Karname is A user weekly report 
const KarnameSchema = new Schema( {
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [ true, 'Karname must belong to a user' ]
  },
  name: {  // user full name
    type: String,
  },
  week: {   // ucl
    type: mongoose.Schema.ObjectId,
    ref: 'Week',
    required: [ true, 'Karname must belong to a Week' ]
  },
  // Predictions : []   // my last week predictions
  //////////////////////////////////
  // *** AFTTER ADMIN UPDATE *** //
  ////////////////////////////////
  // Number of predictions: 
  nPredictions: {
    type: Number
  },
  nCorrectPredictions: {
    type: Number
  },
  points: {  // points - comes from calculating number of correct answers
    type: Number
  },
  note: {
    type: String,  // for ex. "fake" means created by admin
  },
  fake: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  position: {     // BY ADMIN 
    type: Number
  },
  gotPaid: { // If this karnames stands in top 10 users, admin update associated user blance for this karname
    type: Boolean,
    default: false
  },
  prize: {  // How much money user received  ex. 100
    type: Number,
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
} )
// ============================================================================
// Prevent user from submitting more than one review per bootcamp
// ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });
KarnameSchema.index( { week: 1, user: 1 }, { unique: true } )

KarnameSchema.virtual( 'predictions', {
  ref: 'Prediction',
  localField: '_id',
  foreignField: 'karname',
  justOne: false
} )


KarnameSchema.pre( 'save', async function ( next ) {
  // Create weekk String, In order to prevent Aggregatino match error
  console.log( '--- KarnameSchema.pre( save ) ---'.green )
  // console.log( this )
  // this.weekk = this.week.toString() 
  next()
} )
// KarnameSchema.post( 'save', async function ( next ) {
//   // Create weekk String, In order to prevent Aggregatino match error
//   console.log( '--- KarnameSchema.post( save ) ---'.green )
//   console.log( this )
//   // next()
// } )

KarnameSchema.pre( 'remove', async function ( next ) {
  // Cascade delete Predictions when a Karname is deleted - from Brad
  console.log( '--- Karname.pre( remove ) ---'.green )
  await this.model( 'Prediction' ).deleteMany( { karname: this._id } )

  console.log( `=> All predictions of Karname ${ this._id } got deleted.`.red )
  next()
} )

KarnameSchema.pre( /^find/, function ( next ) {
  // Calculate number of correct Answers for karname
  // console.log( '--- Karname.pre( /^find/ ) ---'.green )
  // const correctPredictionsCount = await Prediction.countDocuments( { karname: this.karname, correct: true } )
  // console.log( correctPredictionsCount )
  // console.log( this )   // Query { so long } 
  // console.log( this.model )   // output: Model { Karname }

  // await Karname.findByIdAndUpdate( this.karname, { nCorrectPredictions: correctPredictionsCount } )
  next()   // no need for now
} )

KarnameSchema.post( 'findOneAndUpdate', function ( doc, next ) {
  // KarnameSchema.post( /^find/, function ( doc, next ) {
  // console.log( "Karname.post( findOneAndUpdate )".green )
  console.log( `=> Karname ${ doc._id } updated!`.green )   // this._id undefined

  // console.log( doc )   // { ... Kaname ...}
  // console.log( this )   // {so long} 
  next()
} )

// KarnameSchema.post( 'find', function ( doc, next ) {
//   // this works for get all karnames 
//   console.log( "--- Karname.post(find) ---".green )
//   // console.log( doc )   // [ Array of karnames]   // if .pre => no doc
//   // console.log( this )   // {so long} 
//   next()
// } )



const Karname = mongoose.model( 'Karname', KarnameSchema )
module.exports = Karname

// Karname is user weekly report and it belongs to one user
// It shows performance of user for each week - number of total and correct answers
// Each user can have only one Karname per week 