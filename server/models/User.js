const mongoose = require( 'mongoose' )
const bcrypt = require( 'bcryptjs' )
const jwt = require( 'jsonwebtoken' )
const Schema = mongoose.Schema



// Create Schema
const UserSchema = new Schema( {
  name: {    // shold be changed to name lated
    // could be in Arabic or English - could be changed every 30 days
    type: String,
    required: true,
    // unique: true
  },
  displayName: {   // optional
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: [ true, 'Please add an email!' ],
    unique: true
  },
  ide: {   // For Front-end
    type: String,
    // required: true,
    unique: true
  },
  googleId: {   // For Front-end
    type: String,
  },
  // Not yet: After getting at least 100 user
  image: {   // Avatar: profiel picture url  [Optional]
    type: String
  },
  country: {   // [ksa - iraq - algeria - egypt] 
    type: String
  },
  emailVirified: {   // If user is verified (email activated )
    type: Boolean
  },
  verified: {   // If user has proper name and profile picute 
    // If user not verified - he can't submit prds 
    type: Boolean
  },
  role: {
    type: String,
    enum: [ 'user', 'admin', 'superAdmin' ],
    default: 'user'
  },
  password: {
    type: String,
    // required: [ true, 'Please add a password!' ],  // Bcuz some user will login by google
    minlength: 4,
    select: false
  },
  balance: {
    type: Number,
    default: 0
  },
  nPayments: {
    // number of payments user made so far (stripe + paypal)
    type: Number,
    default: 0
  },
  country: {   // optional 
    type: String
  },
  paypalEmail: {   // optional 
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  fake: {   // specified by Admin (In order to take top users first places)
    type: Boolean
  },
} )

// Encrypt (Hash) password using bcrypt before save user to db
UserSchema.pre( 'save', async function ( next ) {
  // Only run this function if password was actually modified
  if ( !this.isModified( 'password' ) ) return next()

  // Hash the password with cost of 10
  this.password = await bcrypt.hash( this.password, 10 );

  // Delete passwordConfirm field
  this.passwordConfirm = undefined
  next()
} )

UserSchema.pre( 'save', async function ( next ) {
  // Add id filed to use in front-end 
  const randomNumber = Math.floor( Math.random() * 900 ) + 100 // randomNumber bw 100 - 999
  this.ide = Date.now() + randomNumber
  console.log( 'user.id: ' + this.id )
  next()
} )

// Generate & Sign JWT Token and return
UserSchema.methods.signJwtToken = function () {
  return jwt.sign( { id: this._id }, process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN } )

  // return this._id   // Return user id as token (before implementing jwt)
}

// Match user entered password to hashed password in database
UserSchema.methods.comparePasswords = async function ( enteredPassword ) {
  // this function only return true or false

  // ** Before implementing bcrypt
  // return enteredPassword === this.password

  // ** After implementing bcrypt
  return await bcrypt.compare( enteredPassword, this.password )
}

module.exports = mongoose.model( 'User', UserSchema )