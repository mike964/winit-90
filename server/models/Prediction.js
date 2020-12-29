const mongoose = require( 'mongoose' )
const moment = require( 'moment' )
const d = new Date()
const colors = require( 'colors' )
const Schema = mongoose.Schema
const Karname = require( './Karname' )
const Match = require( './Match' )


// Create Schema
const PredictionSchema = new Schema( {
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [ true, 'Prediction must belong to a user' ]
  },
  // vip: {   // vip predictions are for paid users 
  // It's better to create seperate model for vip
  //   type: Boolean,
  //   default: false
  // },
  match: {
    type: mongoose.Schema.ObjectId,
    ref: 'Match',
    required: [ true, 'Prediction must belong to a match' ]
  },
  karname: {
    type: mongoose.Schema.ObjectId,
    ref: 'Karname',
    required: [ true, 'Prediction must belong to a Karname' ]
  },
  // week: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Week',
  //   required: [ true, 'Prediction must belong to a week' ]
  // },
  answerKey: {   // 1 => team 1 won,  2 => team 2 won,  3 => draw
    type: Number,
    required: true
  },
  answerKey2: {   // 11,21,22,3... , 10 => team 1 won penalties
    type: String,
    required: true
  },
  goalDifference: {
    // 0 means draw, 6 means more than 6 goals 
    type: Number,  // not requred bcuz if penalties checked no need for gd
    required: true
  },
  willEndInPenalties: {   // predict If match will end in penalties
    type: Boolean,
    required: true,   // should be true or false
    default: false
  },
  winner: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    default: null
  },
  year: {
    type: String,
    default: d.getFullYear()
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  ////////////////////////////////////////////////////////////////
  // After match finish and Admin update match result,  
  correct: {  // answerKey1 correct. To be compared with match.resultKey
    type: Boolean,
    default: null
  },
  correctGD: {   // answerKey2 correct
    type: Boolean,
    default: null
  },
  // Points user will earn of this prediction is correct
  points: {
    type: Number,
    default: 0
  }
} )


PredictionSchema.pre( 'save', async function ( next ) {
  console.log( "--- PredictionSchema.pre(save) ---".green )
  // console.log( this )  // { ...predictn ... }  

  console.log( this )

  // See which one execute firs? .pre or setKarname ?

  next()
} )

PredictionSchema.post( 'save', async function ( next ) {
  // console.log( "--- PredictionSchema.post(save) ---".green )
  // console.log( this )
  // Calculate number of predictions for related Karname
  // const predictionsCount = await Prediction.countDocuments( { karname: this.karname } )
  // console.log( '** Number of predictions: ' + predictionsCount )   // 6

  // await Karname.findByIdAndUpdate( this.karname, { nPredictions: predictionsCount } )

  // next()   // no need for now
} )

// After Prediction gets updated
// PredictionSchema.post( 'findOneAndUpdate', async function ( docs, next ) {
//   // Calculate number of correct Answers for karname
//   console.log( '--- Prediction.post( findOneAndUpdate ) ---' )
//   console.log( 'docs: ' )
//   console.log( docs )     // { ... updated prediction ...}
//   const correctPredictionsCount = await Prediction.countDocuments( { karname: this.karname, correct: true } )
//   console.log( correctPredictionsCount )

//   // await Karname.findByIdAndUpdate( this.karname, { nCorrectPredictions: correctPredictionsCount } )
//   next()   // no need for now
// } )

// Prevent user from submitting more than one prd per match
// ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });
PredictionSchema.index( { match: 1, user: 1 }, { unique: true } )

const Prediction = mongoose.model( 'Prediction', PredictionSchema )
module.exports = Prediction



// Loading User predictions problem


