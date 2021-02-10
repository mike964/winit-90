const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema


const oddsSchema = new Schema( {
  ucl: {
    type: Array
  },
  uel: {
    type: Array
  },
  epl: {  // england pr lig
    type: Array
  },
  la_liga: {
    type: Array
  },
  it_lig: {
    type: Array
  },
  fr_lig: {
    type: Array
  },
  bundesliga: {
    type: Array
  }
}
  ,
  {
    timestamps: true,
  } )



const Odds = mongoose.model( 'Odds', oddsSchema )
module.exports = Odds




