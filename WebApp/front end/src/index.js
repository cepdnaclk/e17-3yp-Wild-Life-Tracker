import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './asserts/pages/login';
import Register from './asserts/pages/register';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <Router>
       <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/Register" component={Register}/>
      </Switch>
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
