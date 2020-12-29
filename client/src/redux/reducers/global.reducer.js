// import { matches, competitions } from '../../mock-data/data';

const initState = {
  selectedWeek: 'thisWeek',   // match bar default selected week (matches pg)
  sidebar: '',                // dashboard sidebar current tab 
  navbar: 'home',            // Navbar selected table : default homepg
  showAuthModal: false,     // If true show/launch sign up modal
  selectedLig: 'All',       // for ex. prlig or laliga, in order to filter matches
  hideFinished: false,      // hide finished match items
  selected_week_prd: ''    // selected week id in user prds pg inside week selector
}



export default ( state = initState, action ) => {
  switch ( action.type ) {
    case 'SET_SELECTED_WEEK':
      return {
        ...state,
        selectedWeek: action.payload
      }
    case 'SET_SIDEBAR':
      return {
        ...state,
        sidebar: action.payload
      }
    case 'TOGGLE_AUTH_MODAL':
      return {
        ...state,
        // showAuthModal: !state.showAuthModal
        showAuthModal: action.payload   // Boolean
      }
    case 'SET_NAVBAR':
      return {
        ...state,
        navbar: action.payload
      }
    case 'SET_SELECTED_LIG':
      return {
        ...state,
        selectedLig: action.payload
      }
    case 'SET_HIDE_FINISHED_MATCHES':
      return {
        ...state,
        hideFinished: action.payload
      }
    case 'TOGGLE_ALL_TABLE_ROWS':
      return {
        ...state,
        expandAll: !state.expandAll
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter( ( todo ) => todo._id !== action.payload )
      };
    default:
      return state
  }
}