import React from 'react';
import ReactDOM from 'react-dom';
// import './css/bootstrap.css' 
import 'bootstrap/dist/js/bootstrap.bundle'   // include popperjs
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './css/bootstrap-fix.css'
import './css/style.css'
import './css/vip-golden.css'
import './css/moslm-css.css'
import './css/colors.css'
import './css/navbar.css'
import './css/sidebar.css'
import './css/logo-box.css'
import './css/clock.css'
import './css/homepage.css'
import './css/dashboard.css'
import './css/tables.css'
import './css/buttons.css'
import './css/counter.css'
import './css/week-selector.css'
import './css/flip-card.css'
import './css/admin.css'
import './css/responsive.css'
import { Provider } from 'react-redux';
import store from './redux/store'
import App from './App';


ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>
  ,
  document.getElementById( 'root' )
)
