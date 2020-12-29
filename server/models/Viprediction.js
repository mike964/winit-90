const mongoose = require( 'mongoose' )
const moment = require( 'moment' )
const d = new Date()
const colors = require( 'colors' )
const Schema = mongoose.Schema
const Karname = require( './Karname' )
const Match = require( './Match' )


// Create Schema
const VipredictionSchema = new Schema( {
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [ true, 'Prediction must belong to a user' ]
  },
  match: {
    type: mongoose.Schema.ObjectId,
    ref: 'Match',
    required: [ true, 'Prediction must belong to a match' ]
  },
  answerKey: {   // (1: team1 won,  2: team2 won,  3: draw)
    type: Number,
    required: true
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
  vip: {   // Indicate this is vip prediction
    type: Boolean,
    default: true
  },
  //===========================================================
  // *** Admin will set The fields below after match finish *** 
  //=========================================================== 
  correct: {  // User predicted result completely correct 
    type: Boolean,
    default: null
  },
  stake: { // Reward user will earn of this prediction is correct
    type: Number,
    required: true
  },
  possibleWinning: {   // For Ex. $220
    type: Number,
    required: true
  },
  gotPaid: { // If prd correct, related user balance got updated 
    type: Number,
    default: false
  },
} )

//=====================================================================
VipredictionSchema.pre( 'save', async function ( next ) {
  console.log( "--- PredictionSchema.pre(save) ---".green )
  // console.log( this )  // { ...predictn ... }  
  // this.possibleReward = this.stake * this.odds
  // next()
} )



VipredictionSchema.post( 'save', async function ( next ) {
  // console.log( "--- PredictionSchema.post(save) ---".green )
  // console.log( this ) 
  // next()   // no need for now
} )

// Prevent user from submitting more than one review per bootcamp
// ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });
VipredictionSchema.index( { match: 1, user: 1 }, { unique: true } )

const Viprediction = mongoose.model( 'Viprediction', VipredictionSchema )
module.exports = Viprediction




