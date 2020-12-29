const mongoose = require( 'mongoose' )
const moment = require( 'moment' )
const Schema = mongoose.Schema
const d = new Date()


const trophySchema = new Schema( {
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [ true, 'Trophy must belong to a user' ]
  },
  week: {
    type: mongoose.Schema.ObjectId,
    ref: 'Week',
    required: [ true, 'Trophy must belong to a week' ]
  },
  position: {   // 1 , 2 , 3 , 4
    type: Number,
    required: true
  },
  title: { // eg. 1st place / 2nd Place / Top 100 
    type: String,
    // required: true
  },
  createdAt: {   // var d = new Date("2015-03-25T12:00:00Z")
    type: Date,
    default: Date.now
  },
  year: {
    type: String, // 2020 - this will be calculated automatically  
    default: d.getFullYear()
  }
} )

trophySchema.index( { week: 1, user: 1 }, { unique: true } )

const Trophy = mongoose.model( 'Trophy', trophySchema )
module.exports = Trophy




// user
// week
// title
// color
// prize  1000 winCoin