import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './asserts/pages/login/login';
import Register from './asserts/pages/register/register';
import Dashboard from './asserts/pages/dashboard/dashboard';
import Admin from './asserts/pages/admin/admin';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <Router>
       <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/Register" component={Register}/>
          <Route path="/Dashboard" component={Dashboard}/>
          <Route path="/Admin" component={Admin}/>
      </Switch>
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
