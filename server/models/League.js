const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema


// Create Schema
const leagueSchema = new Schema( {
  name: {   // UEFA Champions League - England Premier League
    type: String,
    //unique: true,
    required: true
  },
  shortName: {   // ucl - prlig
    type: String,
    //unique: true,
    required: true
  },
  // season: {   // 2019-20
  //   type: String,
  //   required: true
  // },
  // teams: {
  //   type: Boolean,
  //   default: false
  // },
  country: {   // England
    type: String,
    required: true
  },
  // CAF AFC UEFA CONCACAF CONMEBOL OFC
  confederation: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
} )

const League = mongoose.model( 'League', leagueSchema )
module.exports = League
