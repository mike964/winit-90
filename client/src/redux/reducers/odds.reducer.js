
const initState = {
  // isEditing: null, 
  epl: [],
  splig: []
}


export default ( state = initState, action ) => {
  switch ( action.type ) {



    // check msg as read


    case 'SET_ODDS':
      return {
        // ...state,
        // odds: action.payload 
        ucl: action.payload.ucl,
        uel: action.payload.uel,
        prlig: action.payload.epl,
        splig: action.payload.la_liga,
        itlig: action.payload.it_lig,
        frlig: action.payload.fr_lig
      }

    default:
      return state
  }
}


