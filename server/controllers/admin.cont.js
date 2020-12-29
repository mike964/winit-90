const colors = require( 'colors' )
const ErrorResponse = require( '../utils/errorResponse' )
const asyncHandler = require( '../utils/asyncHandler' )
const Karname = require( '../models/Karname' )
const Week = require( '../models/Week' )
const Ulist = require( '../models/Ulist' )
const crud = require( '../utils/crudHandler' )
const { qrFunc } = require( '../utils/queryFunction.js' )
const { sendMsgToUser } = require( './msg.cont.js' )
const { updateUserBalance } = require( './user.cont' )





// (Build / See) Top Users List (Ulist) of weekId [] by Admin
exports.getTopUsersOfWeek = asyncHandler( async ( req, res, next ) => {
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

    let _name
    if ( karname.name ) {
      _name = karname.name
    } else {
      _name = karname.user.username
    }

    if ( karname.user ) {
      newKarname = {
        name: _name,
        // userId: karname.user._id,  // for security
        ide: karname.user.ide,
        karnameId: karname._id,
        nCorrectPredictions: karname.nCorrectPredictions,
        nPredictions: karname.nPredictions,
        points: karname.points,
        // position: pos
        position: karname.position,
        prize: karname.prize
      }
    }

    // filteredKarnames.push( newKarname )
    // prevKarname = karname
    return newKarname
  } )

  // Update week.topUsers[] after sorting top users 



  // if ( req.query.splitInto ) {
  // splitInto : number of ligs u wanna split participants into
  // req.query is string 
  // updatedWeek = await Week.findByIdAndUpdate(   weekId, { topUsers: filteredKarnames }, { new: true } )
  // } 

  if ( req.query.splitInto ) {

    groups = [ [], [], [], [], [] ]   // Array of objects (users)
    // participatedUsers of lig (group) - array of user 'ide's
    users = [ [], [], [], [], [] ]  // Array of Strings of users 'ide's

    let splitInto = parseInt( req.query.splitInto )
    // splitInto Should at least be two 
    // - How many ligs u wanna have per week - How many groups u wanna divide participants 

    let j = 0    // group counter

    // const _filteredKarnames = [ ...filteredKarnames ]   // Error: Keeps the refrence - bcuz shallow copy
    // const _filteredKarnames = filteredKarnames.slice(0)   // Error: Keeps the refrence - bcuz shallow copy


    filteredKarnames.map( ( item, index ) => {
      // if ( j > 3 ) j = 1   // return j to 1 - for test
      if ( j >= splitInto ) j = 0   // return j to 0

      groups[ j ].push( item )

      console.log( 'j: ' + j )
      console.log( 'indx: ' + index )

      j++
    } )

    // // If group exist
    // Specify winners positions
    let k = 0   // group counter

    for ( k = 0; k < splitInto; k++ ) {
      if ( groups[ k ].length > 0 ) {

        let pos = 0
        let prevKarname_points = null

        groups[ k ].forEach( ( item, index ) => {

          if ( item.points !== prevKarname_points ) {
            pos++
          }
          // item.position = index + 1
          item.position = pos
          prevKarname_points = item.points

          // Add users to users Array of strings (ide's)
          users[ k ][ index ] = item.ide
        } )
      }
    }

  } else {   // IF (!splitInto)
    // Create Array of strings of users ide's
    filteredKarnames.map( ( karname ) => {
      if ( karname.ide )  // If user not fake
        users.push( karname.ide )
    } )

    // Then 
    // if ( req.query.createUlist === 'true' ) {
    //   const ulist1 = await Ulist.create( {
    //     week: weekId,
    //     topUsers: filteredKarnames,
    //     users
    //   } )
    // }
  }

  // console.log( filteredKarnames )
  let g1 = {   // Group1
    users: users,
    topUsers: filteredKarnames    // top users - karnames filtered and sorted    
  }

  let weekUpdated = false   // false by default

  if ( req.query.updateWeek === 'true' ) {    // req.query is string 
    const updatedWeek = await Week.findByIdAndUpdate( weekId, {
      topUsers: { g1 },
      topUsersUpdated: true
    }, { new: true } )
    console.log( updatedWeek )
    weekUpdated = true
  }

  res.status( 200 ).json( {
    status: 'success',
    nUsers: filteredKarnames.length,
    weekUpdated,
    // groups, 
    g1
  } )
  // HHH, MOTHERFUCKER 😎😎😎😂
} )


// Update winners of week id balance
exports.payWeeklyWinners = asyncHandler( async ( req, res, next ) => {
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


// NOT USED ANYMORE
exports.giveWinnersPrize = asyncHandler( async ( req, res, next ) => {
  console.log( '---- giveWinnersPrize() ----'.yellow )
  // Give winner price
  // Update winner balane + create trophy + congratulation msg

  console.log( req.params )   //  {  weekId}
  const { weekId } = req.params


  // First convert weekNumber to weekId
  // week = await Week.findOne( { number: req.params.weekNumber, year: req.params.year } )


  // Then find The relevant Ulist (top users lig)
  let ulist = await Ulist.find( { week: weekId } )

  // Send Msg to Winners
  ulist[ 0 ].topUsers.map( user => {
    // console.log( item.id )   // Good

    if ( user.position <= 5 ) {
      sendMsgToUser( user.id, 'Congratulations' )   // First send congratulaion msg
      sendTrophyToUser( { ...user, weekId } )       // send Trophy to winner
    }

  } )

  res.status( 200 ).json( {
    success: true,
    ulist: ulist[ 0 ]
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


const getMsgTxt = ( prize, position, weekNumber, year ) => {

  return `مبروک! لفد ربحت ${ prize } دولار لفوزک بالمرکز ${ position } لمسابقة الاسبوع ${ weekNumber } من سنة ${ year } `
}