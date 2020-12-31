// {{URL}}/api/v1/karnames/me

const initState = {
  karnames: [],  // My Karnames of Year 2020 (year filter not implemented yet)
  current: {}    // Current Karname in order to display details in My Predictions table footer
  // selected: {}
}


export default ( state = initState, action ) => {
  switch ( action.type ) {
    case 'SET_KARNAMES':
      return {
        ...state,
        karnames: action.payload
      }

    case 'SET_CURRENT_KARNAME':
      console.log( '--- SET_CURRENT_KARNAME' )
      console.log( action )
      let currentKarname = state.karnames.filter( ( kar ) => kar.week._id === action.weekId )

      return {
        //   var marvelHeroes =  heroes.filter(function(hero) {
        //     return hero.franchise == “Marvel”;
        // })
        ...state,
        // current: currentKarname
        current: currentKarname.length ? currentKarname[ 0 ] : {}
      }

    default:
      return state
  }
}