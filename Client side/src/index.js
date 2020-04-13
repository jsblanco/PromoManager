import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
//import history from './history';
import AuthProvider from "./lib/AuthProvider";
import App from './App';

ReactDOM.render(

<AuthProvider>
  <Router //history={history}
  >
    <App />
  </Router>
</AuthProvider>
, document.getElementById('root')
);
