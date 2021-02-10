import { axos } from '../../utils'
import store from '../store'
import { setReqHeaders } from './auth.actions'
const { dispatch } = store

const getOdds_DB = async () => {


  try {

    setReqHeaders()   // SET TOKEN

    const response = await axos.get( `/api/adm/odds` )

    console.log( response.data )

    dispatch( {
      type: 'SET_ODDS',
      payload: response.data.odds
    } )


  } catch ( error ) {
    console.log( error )
  }

}

export { getOdds_DB }