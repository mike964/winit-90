const initState = {
  // 35: []  //    weekNumber : [winners list]
  loading: false,
  selectedWeek: null,   // st selected week of WinnersPg week bar
  // winners: null    ,
  winners: []
}


export default ( state = initState, action ) => {
  switch ( action.type ) {
    case 'SET_WINNERS':
      return {
        ...state,
        winners: action.payload
      }
    case 'ST_WINNERS_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'ST_WINNERS_SELECTED_WEEK':
      return {
        ...state,
        selectedWeek: action.payload
      }

    default:
      return state
  }
}