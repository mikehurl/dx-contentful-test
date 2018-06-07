import React from 'react';
import { render } from 'react-dom';
import { Router } from "@reach/router";

import App from './components/App';
import Admin from './components/Admin';
import './utils/globalCSS';

render(
  <Router>
    <App path='/' />
    <Admin path='/create'></Admin>
  </Router>,
  document.getElementById('root')
);
