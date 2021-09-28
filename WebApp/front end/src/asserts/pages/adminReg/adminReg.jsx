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
            //eslint-disable-next-line
            let emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let namecheck = /^[a-zA-Z\s]*$/;
            
            if(name==="name"){
              if(value.length>40){
                document.getElementById('admin-namemsg').innerHTML ="The name must be less than 40 characters.";
                document.getElementById('fullName').className += " is-invalid";
                document.getElementById('admin-button-reg').className += ' disabled';
              }else{
                if(namecheck.test(value)){
                  document.getElementById('admin-button-reg').classList.remove("disabled");
                  document.getElementById('fullName').classList.remove("is-invalid");      
       
                  setData(prevState => ({
                    ...prevState,
                    [name]: value
                  }));
                }else{
                  document.getElementById('admin-namemsg').innerHTML ="The name can only contain letters";
                  document.getElementById('fullName').className += " is-invalid";
                  document.getElementById('admin-button-reg').className += ' disabled';
                }
              }
            }
            else if(name==="password"){

                if(value.length>=8){
                  document.getElementById('admin-button-reg').classList.remove("disabled");
                  document.getElementById('Password1').classList.remove("is-invalid");      
       
                  setData(prevState => ({
                  ...prevState,
                  [name]: value
                }));

              }else{
                document.getElementById('admin-pwmsg').innerHTML ="password must be at least 8 characters";
                document.getElementById('Password1').className += " is-invalid";
                document.getElementById('admin-button-reg').className += ' disabled';
              }

            }
            else if(name==="email"){
              if(emailCheck.test(value)){
                document.getElementById('admin-button-reg').classList.remove("disabled");
                document.getElementById('Email1').classList.remove("is-invalid");
                setData(prevState => ({
                ...prevState,
                [name]: value
                }));
              }
              else{
                document.getElementById('admin-emailmsg').innerHTML ="email is not valid enter a valid email";
                document.getElementById('Email1').className += " is-invalid";
                document.getElementById('admin-button-reg').className += ' disabled';
              }
            }
            else if(name==="cpassword"){

              if(data['password'] === value){
                document.getElementById('admin-button-reg').classList.remove("disabled");
                document.getElementById('Password1').classList.remove("is-invalid");
                document.getElementById('Password2').classList.remove("is-invalid");
            
                setData(prevState => ({
                ...prevState,
                [name]: value
                }));
         
              }else{
                document.getElementById('admin-pwmsg').innerHTML = "";
                document.getElementById('Password1').className += " is-invalid";
                document.getElementById('Password2').className += " is-invalid";
                document.getElementById('admin-button-reg').className += ' disabled';
              }

            }else{
                setData(prevState => ({
                ...prevState,
                [name]: value
                }));
            }

            if(data['name'].length===0 || data['email'].length===0 || data['password'].length===0 || data['password']!==data['cpassword']){
              document.getElementById('admin-button-reg').className += ' disabled';
            }else{
              document.getElementById('admin-button-reg').classList.remove("disabled");
            }
        };



  //when submit button clicked
  const handleSubmit = (evt) => {

    evt.preventDefault(); //keep page without reload

    /*post request*/
    axios.post(`${URL}api/auth/register-admin`,data)
  
    /*if successfull*/
    .then(function (response) {
      document.getElementById('admin-reg-form').style.display = "none";
      document.getElementById('suc-icon').style.display = "block";
      document.getElementById('suc-field').innerHTML = "You have successfully regitered as an admin";
    })
  
    /**if failed*/
    .catch(function (error) {
      document.getElementById('admin-reg-form').style.display = "none";
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
      <form onSubmit={handleSubmit} id='admin-reg-form'>

        <div className="text-center">
          <h1>Admin Sign-up</h1>
        </div>
        
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input type="Name" className="form-control" id="fullName"
          name="name" onChange={handleChange}></input>
          <div className="invalid-feedback" id='admin-namemsg'></div>
        </div>

        <div className="mb-3">
          <label htmlFor="Email1" className="form-label">Email</label>
          <input type="email" className="form-control" id="Email1" aria-describedby="emailHelp"
          name="email" onChange={handleChange}></input>
          <div className="invalid-feedback" id='admin-emailmsg'></div>
        </div>
  
        <div className="mb-3">
          <label htmlFor="Password1" className="form-label">Password</label>
          <input type="password" className="form-control" id="Password1"
          name="password" onChange={handleChange}></input>
          <div className="invalid-feedback" id='admin-pwmsg'>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="Password2" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="Password2"
          name="cpassword" onChange={handleChange}></input>
          <div className="invalid-feedback">
            password doesn't match          
          </div>
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