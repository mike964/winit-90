const mongoose = require( 'mongoose' )
const moment = require( 'moment' )

const Schema = mongoose.Schema

// Create Schema - Each year contains 53 or 54 weeks
const WeekSchema = new Schema( {
  number: {   // number: 26
    type: Number,
    // unique: true,
    // required: true
  },
  year: {  // karname year difers from normal year : Notice end of year    // year : "2020"
    type: Number,
    // required: true
  },
  // weekTitle : "Week 26 0f 2020"
  id_: {  // 2nd ID     "2021-4"   (karname_year-karname_number)
    type: String,
    // required: true
  },
  start: {   // startUnix time of the week
    type: Date,
    // required: true
  },
  end: {   // end time of the week
    type: Date,
    // required: true
  },
  startUnix: {
    type: Number
  },
  endUnix: {
    type: Number
  },
  sequence: {   // sequence : similar to id, helps frontend find week easier
    type: Number,
    default: 100000
  },
  // matches: []   // matches of this week
  // predictions: []
  // TopUsers : []    // users with highest points this week
  // topUsers: {
  //   type: Array,
  //   default: []
  // },
  topUsers: {
    type: Object,
    default: {}
  },
  // {   // topUsers instance
  //   g1: {   // g1 means group 1 (each group 100 users)
  //     users: [],   //  users 'ide's. Array of strings
  //     toUsers: []     // Sorted users (by points). Array of objects - for frontend (no id's) for security 
  //   }, 
  //   g2 : { }
  // },
  topUsersUpdated: {    // top Users List Created (Boolean)
    type: Boolean,
    default: false
  },
  winnersGotPaid: {   // Weekly Winners Got paid  (not vip)
    type: Boolean,
    default: false
  }
  // karnames : []   virtual
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
} )
//=============================================================================
WeekSchema.virtual( 'karnames', {
  ref: 'Karname',
  localField: '_id',
  foreignField: 'week',
  justOne: false
} )

WeekSchema.pre( 'save', async function ( next ) {
  // req.body.startUnix should be in UTC (GMT)

  let prevWeek = await get_prev_week( this.startUnix )
  // console.log( '--- prev week' )
  // console.log( x )   // Good


  this.number = moment.utc( this.startUnix * 1000 ).week()

  // this.startUnix = moment( this.startUnix ).format( 'X' )
  this.start = moment( this.startUnix * 1000 ).format()   // doesn't work - now it works :)
  // The line below works fine :)
  this.year = moment.utc( this.startUnix * 1000 ).endOf( "week" ).format( "YYYY" )
  // this.endUnix = moment( this.end ).format( 'X' )
  this.endUnix = this.startUnix + 604799    // Week startUnix end epoch differnece = 604799
  this.end = moment( this.endUnix * 1000 ).format()   // doesn't work - now it works :)

  this.id_ = `${ this.year }-${ this.number }`
  this.sequence = prevWeek.sequence + 1

  // this.end = moment( this.startUnix ).add( 7, 'days' ) 

  next()
} )

// WeekSchema.index( { year: 1, number: 1 }, { unique: true } )

const Week = mongoose.model( 'Week', WeekSchema )
module.exports = Week


// Week is the number of week of the year
// each year contains almost 54 weeks

const get_prev_week = async ( start_unix ) => {
  // Get prev week before saving week to db,
  // in order to calculate sequence
  let prev_week = await Week.find( { endUnix: start_unix - 1 } )
  return prev_week[ 0 ]
}