import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './asserts/pages/login/login';
import AdminLogin from './asserts/pages/adminLogin/adminLogin';
import Register from './asserts/pages/register/register';
import Dashboard from './asserts/pages/dashboard/dashboard';
import Admin from './asserts/pages/admin/admin';
import AdminReg from './asserts/pages/adminReg/adminReg';
import UserPWREmail from './asserts/pages/passwordReset/useremailSubmit';
import AdminPWREmail from './asserts/pages/passwordReset/adminemailSubmit';
import PWreset from './asserts/pages/passwordReset/passwordReset';
import ProtectedRouteAdmin from './protectedRouteAdmin';
import ProtectedRouteUser from './protectedRouteUser';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <Router>
       <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/Register" component={Register}/>
          <ProtectedRouteUser path="/Dashboard" component={Dashboard}/>
          <ProtectedRouteAdmin path="/Admin" component={Admin}/>
          <Route exact path="/AdminLogin" component={AdminLogin}/>
          <Route exact path="/AdminRegister" component={AdminReg}/>
          <Route exact path="/UserPasswordRec" component={UserPWREmail}/>
          <Route exact path="/AdminPasswordRec" component={AdminPWREmail}/>
          <Route exact path="/PasswordReset/:email/:token" component={PWreset}/>
      </Switch>
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
