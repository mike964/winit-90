const colors = require( 'colors' )
const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../utils/asyncHandler' )
const Karname = require( '../models/Karname' )
const Week = require( '../models/Week' )
const Ulist = require( '../models/Ulist' )
const { qrFunc } = require( '../utils/queryFunction.js' )
const { sendMsgToUser } = require( './msg.cont.js' )
const { updateUserBalance } = require( './user.cont' )
const axios = require( 'axios' )
const Odds = require( '../models/Odds' )





// (Build / See) Top Users List (Ulist) of weekId [] by Admin
const getTopUsersOfWeek = asyncHandler( async ( req, res, next ) => {
  console.log( '----- getTopUsersOfWeek() -----'.yellow )
  // 1.First get all karnames of this week
  // 2. Then Sort them by points  

  // console.log( req.params )   // { weekId: '456346457' }
  const { weekId } = req.params

  console.log( req.query.updateWeek )   // true   (very good)  // url?updateWeek=true

  // Get all karnames and see which one is highest points 

  const karnames = await Karname.find( { week: weekId } )
    .populate( 'user' )
    .sort( '-points' )

  // console.log( karnames )

  let users = []  // Array of Strings of participated users 'ide's
  let groups = null  // if req.qur.splitInto exist , means number of ligs u wanna divide users 

  // Specify Positions for users
  const filteredKarnames = karnames.map( ( karname ) => {
    // If user[1] and user[2] have same points, prevent increasing position in newKarname
    // position++  

    if ( karname.user ) {
      newKarname = {
        name: karname.fake ? karname.user._id : karname.user.name,
        email: karname.fake ? karname.email : karname.user.email,
        // userId: karname.user._id,  // for security
        ide: karname.user.ide,
        karnameId: karname._id,
        nCorrectPredictions: karname.nCorrectPredictions,
        nPredictions: karname.nPredictions,
        points: karname.points,
        position: karname.position,
        prize: karname.reward
      }
    }

    // filteredKarnames.push( newKarname )
    // prevKarname = karname
    return newKarname
  } )

  // Update week.topUsers[] after sorting top users  

  // console.log( filteredKarnames )
  let g1 = {   // Group1
    users: users,
    topUsers: filteredKarnames    // top users - karnames filtered and sorted    
  }

  let weekUpdated = false   // false by default

  if ( req.query.updateWeek === 'true' ) {    // req.query is string 
    const updatedWeek = await Week.findByIdAndUpdate( weekId, {
      topUsers: { ...g1 },
      topUsersUpdated: true
    }, { new: true } )
    // console.log( updatedWeek )
    weekUpdated = true
  }

  res.status( 200 ).json( {
    success: true,
    nUsers: filteredKarnames.length,
    weekUpdated,
    // groups, 
    g1
  } )
  // HHH, MOTHERFUCKER 😎😎😎😂
} )


// Update winners of week id balance
const payWeeklyWinners = asyncHandler( async ( req, res, next ) => {
  console.log( '----- getTopUsersOfWeek() -----'.yellow )
  // 1.First get all karnames of weekId
  // 2. Then loop and update asociated user.balance for each karname
  // 3. Send congrats msg to winners + Trophy 

  console.log( req.params )   // { weekId: '456346457' }
  const { weekId } = req.params
  const { rewards } = req.body

  // Convert object to array  
  const rewardsArr = Object.values( rewards )     // output: [ 100, 50, 25, 15, 10, 5 ]
  rewardsArr.unshift( "zero" )   // In order to take array[0]
  console.log( rewardsArr )
  // console.log( req.query.updateWeek )   // true   (very good)  // url?updateWeek=true

  if ( rewardsArr.length < 11 ) {
    // Rewards array should at least has 10 elements in order to work properly
    // return Error
  }

  // const karnames = await Karname.find( { week: weekId } ).sort( '-points' )
  const week = await Week.findById( weekId ).populate( 'karnames' )
  const { karnames } = week

  karnames.map( async karname => {
    let prize = rewardsArr[ karname.position ]
    // console.log( 'prize :' + prize )
    // updateUserBalance( karname.user, 10 )   // FOR TEST

    if ( karname.position >= 1 && karname.position < 11 ) {   // [1 - 10] 
      // let updateUserBalance_success =  updateUserBalance( karname.user, rewardsArr[ karname.position ] ) (DO THIS LATER)
      // updateUserBalance( karname.user, rewardsArr[ karname.position ] )

      // First send congratulaion msg 
      // sendMsgToUser( karname.user, getMsgTxt( prize, karname.position, week.number, week.year ) )
      // console.log( getMsgTxt( prize, karname.position, week.number, week.year ) )
      // Then Send Trophy to Winners
      // sendTrophyToUser( { ...user, weekId } ) 

      // ** UPDATE karname.gotPaid = true + prize
      await Karname.findByIdAndUpdate( karname._id, { gotPaid: true, prize: prize }, { new: true } )
    }
  } )


  await Week.findByIdAndUpdate( weekId, { winnersGotPaid: true } )

  res.status( 200 ).json( {
    status: 'success',
    nResults: karnames.length,
    karnames
  } )
} )


const sendTrophyToUser = async ( user ) => {
  // position is winner position  
  console.log( '--- sendTrophyToUser() ---' )
  // console.log( user )

  // Get trophy.title   // Do this in frontend is better
  // const getTitle = (pos) => {
  //   if (pos === 1) {
  //     return '1st place'
  //   } 
  //   if (pos === 2) {
  //     return '1st place'
  //   } 
  //   if (pos === 3) {
  //     return '1st place'
  //   } 
  //   if (pos === 4) {
  //     return '1st place'
  //   } 
  //   if (pos === 5) {
  //     return '1st place'
  //   } 
  //   if (pos === 6) {
  //     return '1st place'
  //   } 
  //   if (pos > 6 && pos <= 10) {
  //     return 'top '
  //   } 
  // } 

  const trophy = await Trophy.create( {
    user: user.id,
    // position: user.position,
    // week: user.weekId
  } )

  console.log( trophy )
}


const getMsgTxt = ( prize, position ) => {
  // return `مبروک! لفد ربحت ${ prize } دولار لفوزک بالمرکز ${ position } لمسابقة الاسبوع ${ weekNumber } من سنة ${ year } `
  return `مبروک! لفد ربحت ${ prize } دولار لفوزک بالمرکز ${ position }`
}


// POST : /api/adm/pay-winner-by-karname-id
const payWinrByKarnameId = asyncHandler( async ( req, res, next ) => {
  console.log( '--- payWinnerByKarnameId' )
  // First. Get karname object by id 
  // Then. update karname.user._id  balance 
  // update karname.gotPaid , karname.reward
  // send congrats msg to user
  // 3. Return new user.balance

  // console.log( req.body )                // { karnameId: 'x', amount: '50' } 
  const { karnameId, amount } = req.body


  // ** STEP 1 - Get karname object
  let karname = await Karname.findById( karnameId )
  let user_id = karname ? karname.user : ''

  console.log( karname )

  // if ( !karname )
  // return Error

  // ** STEP 2
  let balance_updated = await updateUserBalance( user_id, amount )

  // if ( !balance_updated )
  // return Error

  // ** STEP 
  let updated_karname = await Karname.findByIdAndUpdate( karname._id,
    {
      gotPaid:
        true, reward: amount,
    },
    {
      new: true,
      runValidators: true
    } )

  // ** STEP
  let msg_txt = getMsgTxt( amount, karname.position )

  let msgSent = await sendMsgToUser( user_id, msg_txt )


  console.log( '--- updated_karname' )
  console.log( updated_karname )


  res.status( 200 ).json( {
    success: true,
    balance_updated: balance_updated,
    msg_sent: msgSent,
    updated_karname: updated_karname
  } )
} )


const updateOdds = asyncHandler( async ( req, res, next ) => {
  // ** 1st get odds from external api

  const api_url = ( sport_key ) => `https://api.the-odds-api.com/v3/odds/?sport=${ sport_key }&region=uk&apiKey=b1b905be8592f1f23055592b8b4a268c&mkt=h2h`

  // const api_url =  `https://api.the-odds-api.com/v3/odds/?sport=soccer_epl&region=uk&apiKey=b1b905be8592f1f23055592b8b4a268c&mkt=h2h`  
  // const response = await axios.get( api_url )
  // const matches = response.data.success ? response.data.data : ''


  // * Filtered & Modified Matches
  // let matches_ = matches.map( ( item, index ) => {

  //   let team_away = item.teams[ 0 ] === item.home_team ? item.teams[ 1 ] : item.teams[ 0 ]

  //   let odds_ = item.sites.find( ( item ) => item.site_key === "onexbet" )
  //   console.log( odds_ )

  //   return {
  //     teams: item.teams,
  //     team_home: item.home_team,
  //     team_away,
  //     odds: odds_
  //   }
  // } )

  // let updatedOdds = await Odds.findByIdAndUpdate( matchId, _match, { new: true, runValidators: true } )


  // "key": "soccer_uefa_champs_league",
  // "key": "soccer_uefa_europa_league",
  // "key": "soccer_spain_la_liga",
  // "key": "soccer_italy_serie_a",
  // "key": "soccer_germany_bundesliga",
  // "key": "soccer_france_ligue_one",
  // "key": "soccer_fa_cup",
  // "key": "soccer_epl",
  // "key": "soccer_efl_champ",

  // * EPL Stage 1
  const epl_st_1 = await axios.get( api_url( "soccer_epl" ) )
  const epl_st_2 = epl_st_1.data.success ? epl_st_1.data.data : ''

  // let epl_st_3 = 

  const getOdds = async ( sport_key ) => {
    const api_url = `https://api.the-odds-api.com/v3/odds/?sport=${ sport_key }&region=uk&apiKey=b1b905be8592f1f23055592b8b4a268c&mkt=h2h`
    const response = await axios.get( api_url )
    const games = response.data.success ? response.data.data : []

    // * Filtered & Modified Matches
    let games_ = games.map( ( item, index ) => {
      let team_away = item.teams[ 0 ] === item.home_team ? item.teams[ 1 ] : item.teams[ 0 ]
      let odds_onexbet = item.sites.find( ( item ) => item.site_key === "onexbet" )
      let odds_betway = item.sites.find( ( item ) => item.site_key === "betway" )
      let odds_unibet = item.sites.find( ( item ) => item.site_key === "unibet" )
      let odds_ = odds_onexbet ? odds_onexbet : ( odds_betway ? odds_betway : odds_unibet )

      return {
        sport: item.sport_nice,
        teams: item.teams,
        team_home: item.home_team,
        team_away,
        odds: odds_ ? odds_.odds.h2h : [],
        last_update: odds_ ? odds_.last_update : ''
      }
    } )

    return games_
  }



  let ucl_odds = await getOdds( "soccer_uefa_champs_league" )
  let uel_odds = await getOdds( "soccer_uefa_europa_league" )
  let epl_odds = await getOdds( 'soccer_epl' )
  let splig_odds = await getOdds( 'soccer_spain_la_liga' )
  let itlig_odds = await getOdds( 'soccer_italy_serie_a' )
  let frlig_odds = await getOdds( 'soccer_france_ligue_one' )

  // let newOdds = await Odds.create( { epl: [] } )

  const odds_id = "6024309eaa5a162990d0bd4f"  // odds _id in DB

  const doc = await Odds.findByIdAndUpdate( odds_id, {
    ucl: ucl_odds,
    uel: uel_odds,
    epl: epl_odds,
    la_liga: splig_odds,
    itlig: itlig_odds,
    frlig: frlig_odds
  }, {
    new: true,
    runValidators: true
  } )


  // ** FUK YES
  res.json( {
    success: true,
    msg: 'All six top leagues odds updated.'
    // doc
    // lenth: data.length,
    // data
    // matches: matches_, 
    // ucl_odds,
    // epl_odds,
    // splig_odds
  } )
} )



module.exports = {
  getTopUsersOfWeek, payWeeklyWinners, payWinrByKarnameId, updateOdds
}