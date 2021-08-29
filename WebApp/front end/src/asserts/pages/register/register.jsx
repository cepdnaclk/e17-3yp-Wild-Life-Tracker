import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loader from "react-loader-spinner";

import Template from '../template';
import Logo from '../logo';

import './styles.css'

import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;

const  TITLE = 'Sign-up';

/*export registration page*/
export default function Register() {
  
  const logo = <Logo /> //logo of the page
  const form = <Form /> //registration form

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
function Form() {

  /*initial states*/
   const [data, setData] = useState({

    name : "",
    email : "" ,
    password : "",
    cpassword : "",
   });
   const [file, setfile] = useState ('');


   //update states for changes
   const handleChange = e => {
            const { name, value } = e.target;
            setData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };


  //update file when uploaded
  const handleFileChange = e => {
      setfile(e.target.files[0]);
  }


  //when submit button clicked
  const handleSubmit = (evt) => {

    const fd = new FormData(); //create an form data object
    
    /*append all data*/
    fd.append('name', data['name']);
    fd.append('email', data['email']);
    fd.append('password', data['password']);
    fd.append('verificationLetter', file);

    document.getElementById('button-reg').className += ' disabled';
    document.getElementById('loader').style.display ='block';

    evt.preventDefault(); //keep page without reload

    /*post request*/
    axios.post(`${URL}api/auth/register-user`,fd)
  
    /*if successfull*/
    .then(function (response) {
      document.getElementById('loader').style.display ='none';
      document.getElementById('button-reg').className = document.getElementById('button-reg').className.replace("disabled", "");
      document.getElementById('reg-form').style.display = "none";
      document.getElementById('suc-field').style.display = 'block';
      document.getElementById('suc-icon').style.display = "block";
      document.getElementById('suc-field').innerHTML = "Your data has been sent. It may take 3-5 working days to accept your registration.<br>";

    })
  
    /**if failed*/
    .catch(function (error) {
      document.getElementById('loader').style.display ='none';
      document.getElementById('button-reg').className = document.getElementById('button-reg').className.replace("disabled", "");      
      document.getElementById('reg-form').style.display = "none";
      document.getElementById('reg-error-field').style.display = 'block';
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
        <div id='reg-error-field'></div>
        <div id='suc-field'></div>
      </div>

      <form onSubmit={handleSubmit} id='reg-form'>

        <div className="text-center">
          <h1>Sign-up</h1>

          {/*loding animation - initially it is hidden*/}
          <div id='loader'><Loader type="ThreeDots" color="#00BFFF" height={50} width={50}/></div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input type="Name" className="form-control" id="fullName"
          name="name" onChange={handleChange} required></input>
        </div>

        <div className="mb-3">
          <label htmlFor="Email1" className="form-label">Email</label>
          <input type="email" className="form-control" id="Email1" aria-describedby="emailHelp"
          name="email" onChange={handleChange} required></input>
        </div>
  
        <div className="mb-3">
          <label htmlFor="Password1" className="form-label">Password</label>
          <input type="password" className="form-control" id="Password1"
          name="password" onChange={handleChange} required></input>
        </div>

        <div className="mb-3">
          <label htmlFor="Password2" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="Password2"
          name="cpassword" onChange={handleChange} required></input>
        </div>

        <label className="custom-file-label" htmlFor="validatedCustomFile">Confirmation Letter</label>
        <div className="mb-3">
          <input type="file" className="custom-file-input" id="validatedCustomFile" onChange={handleFileChange} required ></input>
          <div className="invalid-feedback">Choose Correct Format</div>
        </div>
 
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-block btn-primary" id="button-reg">Register</button>
        </div>

        <div>
          {/*<Link> tag is similar to <a> tag in HTML*/}
          <small>Already have an account? <Link to='/Login'>Login</Link></small>
        </div>

      </form>
    </div>
  );
}