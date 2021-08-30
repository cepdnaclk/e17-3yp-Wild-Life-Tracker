import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import Template from '../template';
import Logo from '../logo';

import './styles.css'

import { FaCheckCircle, FaExclamationCircle  } from "react-icons/fa";

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;

const  TITLE = 'Admin Sign-up';

/*export registration page*/
export default function AdminRegister() {
  
  const logo = <Logo /> //logo of the page
  const form = <AdminForm /> //registration form

  //return template --> left side = logo , right side = registration form 
  return (
    <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <Template left={logo} right={form} />
    </div>
  );
}



/*registration form component*/
function AdminForm() {

  /*initial states*/
   const [data, setData] = useState({

    name : "",
    email : "" ,
    password : "",
    cpassword : "",
   });


   //update states for changes
   const handleChange = e => {
            const { name, value } = e.target;
            setData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };


  //when submit button clicked
  const handleSubmit = (evt) => {

    evt.preventDefault(); //keep page without reload

    /*post request*/
    axios.post(`${URL}api/auth/register-admin`,data)
  
    /*if successfull*/
    .then(function (response) {
      document.getElementById('admin-reg-form').style.display = "none";
      document.getElementById('msg').id ='suc-field';
      document.getElementById('suc-icon').style.display = "block";
      document.getElementById('suc-field').innerHTML = "You have successfully regitered as an admin";
    })
  
    /**if failed*/
    .catch(function (error) {
      document.getElementById('admin-reg-form').style.display = "none";
      document.getElementById('msg').id ='reg-error-field';
      document.getElementById('fail-icon').style.display = "block";
      document.getElementById('reg-error-field').innerHTML = "!!!Something went to wrong. Plesse try again later!!!";
     });

  }


  /*registration form*/
  return (
    <div>

      <div id='msg-field'>
        <div id='suc-icon'><FaCheckCircle size={70}/></div>
        <div id='fail-icon'><FaExclamationCircle size={70}/></div>
        <div id='msg'></div>
      </div>
      <form onSubmit={handleSubmit} id='admin-reg-form'>

        <div className="text-center">
          <h1>Admin Sign-up</h1>
        </div>
        
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input type="Name" className="form-control" id="fullName"
          name="name" onChange={handleChange}></input>
        </div>

        <div className="mb-3">
          <label htmlFor="Email1" className="form-label">Email</label>
          <input type="email" className="form-control" id="Email1" aria-describedby="emailHelp"
          name="email" onChange={handleChange}></input>
        </div>
  
        <div className="mb-3">
          <label htmlFor="Password1" className="form-label">Password</label>
          <input type="password" className="form-control" id="Password1"
          name="password" onChange={handleChange}></input>
        </div>

        <div className="mb-3">
          <label htmlFor="Password2" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="Password2"
          name="cpassword" onChange={handleChange}></input>
        </div>
 
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-block btn-primary" id="admin-button-reg">Register</button>
        </div>

        <div>
          {/*<Link> tag is similar to <a> tag in HTML*/}
          <small>Already have an account? <Link to='/AdminLogin'>Login</Link></small>
        </div>

      </form>
    </div>
  );
}