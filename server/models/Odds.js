const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema


const oddsSchema = new Schema( {
  ucl: {
    type: String
  },
  uel: {
    type: String
  },
  epl: {  // england pr lig
    type: String
  },
  laliga: {
    type: String
  },
  italy_lig: {
    type: String
  },
  france_lig: {
    type: String
  },
  bundesliga: {
    type: String
  },


  createdAt: {   // var d = new Date("2015-03-25T12:00:00Z")
    type: Date,
    default: Date.now
  }
}
  ,
  {
    timestamps: true,
  } )



const Odds = mongoose.model( 'Odds', oddsSchema )
module.exports = Odds




