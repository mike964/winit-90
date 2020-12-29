import { createStore, combineReducers } from 'redux'
import globalReducer from './reducers/global.reducer';
import { matchReducer } from './reducers/match.reducer';
import predictions from './reducers/prd.reducer';
import auth from './reducers/auth.reducer';
import clock from './reducers/clock.reducer';
import week from './reducers/week.reducer';
import filters from './reducers/filter.reducer';
import vip from './reducers/vip.reducer';
import karname from './reducers/karname.reducer';
import wnr from './reducers/winners.reducer';
import msg from './reducers/msg.reducer';


const rootReducer = combineReducers( {
  global: globalReducer,
  auth,
  match: matchReducer,
  //match_adm: adminMatchReducer,
  // user: adminMatchReducer,
  prd: predictions,
  week,
  clock,
  filters,
  vip,
  karname,
  wnr,    // winners
  msg,    // messages
  // trof:

} )

const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store


// why combineReducers doesn't work ?