import store from '../store'
import axios from 'axios'
import moment from 'moment'
import { updateUserBalanceRedux } from './payment.actions'
import { axos } from '../../utils'
const { dispatch, getState } = store


// Add Prediction to Redux Store
export const addPrediction = ( prd ) => {
  console.log( '--- addPrediction() ---' )
  let randomId = `${ Math.floor( ( Math.random() * 100000 ) + 99999 ) }`

  if ( !prd._id ) {
    prd = { ...prd, id: randomId }
  }

  dispatch( {
    type: 'ADD_PREDICTION',
    payload: prd
  } )
}


// Update Prediction inside Redux Store by match._id
export const updatePrediction_byMatch = ( matchId, _prd ) => {
  // _prd => prediction to be updated

  if ( _prd.goalDifference === 200 ) {
    // _prd = {
    //   ..._prd,
    //   willEndInPenalties: true
    // }
    _prd.willEndInPenalties = true
  }
  if ( _prd.goalDifference === 0 ) {
    _prd.answerKey = 3
  }

  console.log( _prd )   // good

  dispatch( {
    type: 'UPDATE_PREDICTION_BY_MATCH',
    matchId,
    // id: matchId,
    // indx   // answerKey 
    _prd
  } )
}

export const updatePrediction_byId = ( id, indx ) => {
  dispatch( {
    type: 'UPDATE_PREDICTION_BY_ID',
    id,
    indx   // answerKey
  } )
}

// Delete prediction by matchId from redux store
export const deletePrediction = ( matchId ) => {
  dispatch( {
    type: 'DELETE_PREDICTION',
    matchId
  } )
}

export const loadPredictions = async () => {
  console.log( '--- loadPredictions() ---' )
  // Get This & Next week predictions
  // 1.First Get this week and next week prds of current User from db, 
  // Then set them to redux store

  // @Fix later: Only get all prediction once, and fitler them in frontend
  // let res1 = await axios.get( `${ process.env.REACT_APP_SERVER}/api/predictions/me?week=thisweek` )
  // let res2 = await axios.get( `${ process.env.REACT_APP_SERVER}/api/predictions/me?week=nextweek` )

  const startDate = moment().subtract( 15, 'days' )

  // api/predictions/me?createdAt[gte]=2020-12-20
  // let res = await axios.get(
  //   `${ process.env.REACT_APP_SERVER }/api/predictions/me?createdAt[gte]=${ startDate }`,
  //   { withCredentials: true } // Send Cookie along (for Google to get User)
  // )

  let res = await axos.get( `/api/predictions/me?createdAt[gte]=${ startDate }` )

  // console.log( res1 )
  console.log( res )


  dispatch( {
    type: 'SET_PREDICTIONS',
    // payload: [ ...res1.data.data, ...res2.data.data ]
    payload: res.data.data
  } )
}


export const resetPredictions = async () => {
  console.log( '--- resetPredictions() ---' )
  // Remove new prds which are not submitted to the DB yet. Only keep the submitted to the DB

  dispatch( {
    type: 'RESET_PRDS',
  } )
}


export const getAllMyPredictions = async () => {   // Not Used anymore
  console.log( '--- getAllMyPredictions() ---' )
  // 1.First Get all my predictions from DB. In order to display them in Dashboard
  // Don't need to get all prds of user : only get karname

  const response = await axios.get( `${ process.env.REACT_APP_SERVER }/api/predictions/me` )

  // console.log( response )

  // 2. Set to redux store
  dispatch( {
    type: 'SET_ALL_PREDICTIONS',
    payload: response.data.data
  } )
}

// SUBMIT ALL PRDS TO DB
export const submitPredictions = async ( predictionsArr, weekId ) => {
  console.log( '--- submitPredictions() ---' )
  // 1.First get all added predictions from redux state  
  // 2.Filter prediction. Prevent duplicate 
  // first set Processing (like loading)
  // after successl sumission display success msg
  // Then Reload Predictions in matches page and dashboard

  console.log( predictionsArr )   // Good

  // ** 1.First filter prediction - Send only prediction which answerKey !== 0 && !prediction._id
  let filterdPredictions = predictionsArr.filter( ( prd ) => {
    // Filter out prediction if answer key = 0 means if no asnwer by user added
    // (!prd._id) means prediction is new 
    return prd.answerKey && ( prd.goalDifference || prd.goalDifference === 0 ) && !prd._id
  } )


  // *** Add answerKey2 for each prediction obj
  filterdPredictions = filterdPredictions.map( ( item ) => {
    // if ( item.willEndInPenalties === true ) {
    if ( item.goalDifference === 6 ) {
      return {
        ...item,
        answerKey2: `${ item.answerKey }0`,  // 10 - 20 
        goalDifference: 0,
        willEndInPenalties: true
      }
    } else {
      return {
        ...item,
        answerKey2: `${ item.answerKey }${ item.goalDifference }`
      }
    }
  } )


  console.log( '--- Filterd predictions: ' )
  console.log( filterdPredictions )

  // *** SET WEEK - find and set week from redux store ***
  // let weekId
  // // console.log( getState().global )  // {matchbar: "thisWeek", sidebar: ""}

  // if ( getState().global.selectedWeek === 'thisWeek' )
  //   weekId = getState().week.thisWeek._id

  // if ( getState().global.selectedWeek === 'nextWeek' )
  //   weekId = getState().week.nextWeek._id

  // console.log( 'weekId :' + weekId )  // Good



  if ( filterdPredictions.length > 0 ) {

    const req_body = { predictions: filterdPredictions, weekId }

    try {
      // const response = await axios.post( `${ process.env.REACT_APP_SERVER }/api/predictions/multiple`, req_body )
      const response = await axos.post( `/api/predictions/multiple`, req_body )
      console.log( response )   // for test 

      loadPredictions()     // Reload Predictions in matches page and dashboard
      // getAllMyPredictions()

      if ( response.data.newKarname === true )
        updateUserBalanceRedux( -1 )  // Update only frontend => currentUser.balance - $1

      return true   // In order to handle error in frontend  

    } catch ( error ) {
      console.log( '--- U gotta error' )
      console.log( error )
      return false
    }
  } else {
    console.log( '--- No prds to be submitted!' )
    return false  // No valid predictions
  }
}