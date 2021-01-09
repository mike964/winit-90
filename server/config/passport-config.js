const passport = require( "passport" )
const GoogleStrategy = require( "passport-google-oauth20" )
const User = require( '../models/User' )
// const JwtStrategy = require( 'passport-jwt' ).Strategy, ExtractJwt = require( 'passport-jwt' ).ExtractJwt


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async ( accessToken, refreshToken, profile, done ) => {

      // console.log( profile )

      const newUser = {
        googleId: profile.id,
        name: profile.displayName,
        displayName: profile.displayName,
        email: profile._json.email,
        image: profile._json.picture
      }

      try {
        let user = await User.findOne( { googleId: profile.id } )

        if ( user ) {
          done( null, user )
        } else {
          user = await User.create( newUser )
          done( null, user )
        }
      } catch ( err ) {
        console.error( err )
      }
    }
  )
)



// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser( ( user, done ) => {
  done( null, user.id )
} )

// deserialize the cookieUserId to user in the database
// which means: Get {...user} from user.id
passport.deserializeUser( ( id, done ) => {
  User.findById( id )
    .then( user => {
      done( null, user )
    } )
    .catch( e => {
      done( new Error( "Failed to deserialize an user" ) )
    } )
} )


//////////////////
// *** JWT *** //
////////////////==========================================================================
// Not implemented yet - No need for passport jwt
// Authorization: Barear <token> 



// 2020-1-9
// const FacebookStrategy = strategy.Strategy;

// dotenv.config();
// passport.serializeUser( function ( user, done ) {
//   done( null, user );
// } );

// passport.deserializeUser( function ( obj, done ) {
//   done( null, obj );
// } );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//       profileFields: [ "email", "name" ]
//     },
//     function ( accessToken, refreshToken, profile, done ) {
//       const { email, first_name, last_name } = profile._json;
//       const userData = {
//         email,
//         firstName: first_name,
//         lastName: last_name
//       };
//       new userModel( userData ).save();
//       done( null, profile );
//     }
//   )
// );