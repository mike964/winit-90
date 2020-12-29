const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema


// Create Schema
const teamSchema = new Schema( {
  name: {   // Name to display
    type: String,
    unique: true,
    required: [ true, 'Team must have full name' ]
  },
  shortName: {    // name for developer
    type: String,
    unique: true,
    required: [ true, 'Team must have short name' ]
  },
  country: {    // name for developer
    type: String,
    required: [ true, 'Club team must have country' ]
  },
  confederation: {    // name for developer
    type: String,
    required: [ true, 'Club team must have confederation' ]
  },
  logo: {   // Logo icon url
    type: String,
    // default: 'some-link'
  },
  // leagues: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'League',
  //   // required: [ true, 'Match must belong to a league' ]
  // }, 
  // last5matches :   [w,w,l,d]  
  position: {   // Current Position in League Table
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
} )

const Team = mongoose.model( 'Team', teamSchema )
module.exports = Team