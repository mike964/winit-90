const initialState = {
  // loading: true,
  isAuthenticated: false,   // tells us we are logged in or not 
  // isAuthenticated: true,   // tells us we are logged in or not
  currentUser: null,   // current logged in user
  // currentUser: 'Moslm',   // current logged in user
  error: null,
  // loading: false
}

export default ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'SET_USER_LOADING':
      return {
        ...state,
        // loading: !state.loading
        loading: action.payload    // boolean
      }

    // case 'LOGIN_SUCCESS':
    case 'SET_USER':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        currentUser: action.payload
      }

    case 'UPDATE_USER_BALANCE':
      // action.payload could be - or +
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          balance: state.currentUser.balance + action.payload,
        }
      }


    case 'LOGIN_FAIL':
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: action.payload
      }

    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
