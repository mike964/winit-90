const mongoose = require( 'mongoose' )
// require( 'dotenv' ).config()

// const mongoURI = process.env.MONGO_URI
// const mongoURI = "mongodb://localhost/moslm-roadmap"

let mongoURI
let connectionMsg



if ( process.env.LOCAL_DB === "YES" ) {
  // mongoURI = "mongodb://localhost/moslm-roadmap"
  mongoURI = process.env.LOCAL_DB_URI
  connectionMsg = "Local DB connected ..."
} else {
  // mongoURI = "mongodb+srv://mike:mike1234@cluster0-gpzsv.mongodb.net/roadmap-db?retryWrites=true&w=majority"
  mongoURI = process.env.ATLAS_URI
  connectionMsg = "ATLAS DB connected ..."
}




const connectDB = () => {
  mongoose.connect( mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  } )
    .then( () => console.log( connectionMsg ) )
    .catch( err => console.log( err ) )
}



module.exports = connectDB