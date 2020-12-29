
const initState = {
  finished: false,
  notFinished: false,
  thisWeek: false,
  // In order to filter prediction in dashboard by week
  weekNumber: null,
  year: 2020
}


// Reducer
export default ( state = initState, action ) => {
  switch ( action.type ) {

    case 'SET_FILTER':
      return {
        ...state,
        // Line below can both set filter to true or false - No need for removeFilter
        [ action.payload ]: !state[ action.payload ]
      }
    case 'SET_WEEK_NUMBER':
      return {
        ...state,
        weekNumber: action.payload
      }


    case 'CLEAR_FILTERS':
      return {}

    case 'COMPLETE_':
      return {
        ...state,
        todos: state.todos.map( ( todo ) =>
          todo._id === action.payload ?
            { ...todo, complete: !todo.complete } : todo )
      }
    default:
      return state
  }
}