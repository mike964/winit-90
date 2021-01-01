const mongoose = require( 'mongoose' )
const moment = require( 'moment' )
const Schema = mongoose.Schema


// Create Match
const MatchSchema = new Schema( {
  id_: {  // fixture api id
    type: Number
  },
  team1: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [ true, 'Match must have 2 teams' ],
    // winner: false
  },
  team2: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: [ true, 'Match must have 2 teams' ],
    // winner: false
  },
  team_home: {     // api-football
    type: Object
  },
  team_away: {     // api-football
    type: Object
  },
  league: {
    // type: mongoose.Schema.ObjectId,
    type: Object,
    // ref: 'League',
    required: [ true, 'Match must belong to a league' ]
  },
  title: {   // 'atmadrd x barca'  (for admin)
    type: String,
    // required: true
  },
  note: {  // for ex: [first leg finished 3-2 , 'Semi-finals' , Round 16 , 'Group Stage']
    type: String
  },
  date: {
    type: Date,
    required: [ true, 'Match must have date' ]
  },
  timestamp: {
    type: Number
  },
  year: {   // '2020'
    type: String
  },
  week: {  // 45
    type: Object,
    // default: {   number : 25 ,  year : 2020 ,  id : '2020-25'  }
  },
  penalty: {   // match could end in penalty shoutouts
    type: Boolean,
    default: false
  },
  vip: {   // Will determine if this match is included in vip predictions or not
    type: Boolean,
    default: false
  },
  onlyVip: {   // Will determine if this match is included in weekly predictions or not
    type: Boolean,
    default: false
  },
  odds: {   // if user make vip prediction correct will win this much
    type: Object,
    default: {
      team1: 0.0,
      team2: 0.0,
      draw: 0.0
    }
  },
  //=======================================================
  // *  FIELS BELOW Will get Calculate Automatically  * ///
  //======================================================= 
  // week: {    // this will be calculated automatically by setWeek()
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Week',
  //   required: [ true, 'Match must belong to a week' ]
  // },
  //===========================================================
  // *** Admin will set The fields below after match finish *** 
  //===========================================================
  finished: {
    type: Boolean,
    default: false
  },
  result: {
    type: Object,
    default: {
      // goals: { team1: null, team2: null, team1pen: null, team2pen: null },
      // gd: null,
      // penalties  : false ,  // ( if match ended in penalties) 
      score: null   //  '1-1 (4-3 p)'  //  (result string - In order to display in frontend) 
    }
  },
  resultKey: { // ( 1 character string)
    // 1  => team 1 won,  2 => team 2 won,  3 => draw 
    type: Number,
    default: null
  },
  resultKey2: { // (2 character resutl string)
    // 11 => means team 1 won with gd:3
    // 22 => means team 2 won gd: 2 
    // 15  => team 1 won with gd:5+
    // 30 => draw 0-0 
    // 10,  20 => team 1 won in penlaties, team2 won in p
    type: String,
    default: null
  },

  // predictions :[]   // get array of related predictions by reverse populate
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
} )

//===========================================================================
MatchSchema.virtual( 'predictions', {
  ref: 'Prediction',
  localField: '_id',
  foreignField: 'match',
  justOne: false
} )
MatchSchema.virtual( 'vipredictions', {
  ref: 'PredictionVip',
  localField: '_id',
  foreignField: 'match',
  justOne: false
} )

MatchSchema.pre( 'remove', async function ( next ) {
  // Cascade delete Predictions when a Match is deleted - from Brad 
  await this.model( 'Prediction' ).deleteMany( { match: this._id } )
  await this.model( 'Viprediction' ).deleteMany( { match: this._id } )
  // await this.model( 'PredictionVip' ).deleteMany( { match: this._id } )

  console.log( `=> All predictions for Match ${ this._id } got deleted.`.blue )
  next()
} )

MatchSchema.pre( /^find/, function ( next ) {
  // console.log( '--- Match.pre( /^find/ )' )
  // console.log( this )   // Query { ... } 
  next()
} )

MatchSchema.post( /^find/, function ( docs, next ) {
  // console.log( '--- Match.post( /^find/ )' )
  // console.log( docs )
  // console.log( this )   // Long shit
  // console.log( `Query took ${ Date.now() - this.start } milliseconds!` )

  next()
} )

MatchSchema.pre( 'save', function ( next ) {
  // console.log( '--- Match.pre( save ) ---' )
  // console.log( req.body )  // No accessible here
  // this.year = moment( this.date ).format( 'YYYY' )
  // this.title = `${ this.team1 } x ${ this.team2 }`
  // console.log( this )   / { ... Match }  
  next()
} )

MatchSchema.post( 'save', function ( doc, next ) {
  console.log( '--- Match.post( save ) ---' )
  // console.log( doc )
  next()
} )

// findByIdAndUpdate
// MatchSchema.pre( /^find/, function ( next ) {
// /^find/ means => this mdlwr function will be executed for all query functions that start with 'find' (like; find(), findOne(), ... )

MatchSchema.pre( 'findOneAndUpdate', function ( next ) {
  // MatchSchema.pre( /^find/, function ( next ) { 
  console.log( '--- Match.pre( findOneAndUpdate ) ---' )

  // console.log( req.body )   // doesn't work here 

  // console.log( this )  // output: Query { ... so long ...}

  next()
} )

MatchSchema.post( 'findOneAndUpdate', function ( docs, next ) {
  console.log( '--- Match.post( findOneAndUpdate ) ---' )
  // console.log( this ) 
  next()
} )



// Prevent duplicate matches; Each team can play one match at time
MatchSchema.index( { timestamp: 1, team1: 1 }, { unique: true } )

const Match = mongoose.model( 'Match', MatchSchema )
module.exports = Match




