import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loader from "react-loader-spinner";

import Template from '../template';
import Logo from '../logo';
import Fade from 'react-reveal/Fade';
import Tada from 'react-reveal/Tada';
import './styles.css'

import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;

const  TITLE = 'Sign-up';

/*export registration page*/
export default function Register() {
  
  const logo = <Logo /> //logo of the page
  const form = <Fade bottom><Form/></Fade> //registration form

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
            //eslint-disable-next-line
            let emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let namecheck = /^[a-zA-Z\s]*$/;
            if(name==="name"){
              if(value.length>40){
                document.getElementById('namemsg').innerHTML ="The name must be less than 40 characters.";
                document.getElementById('fullName').className += " is-invalid";
                document.getElementById('button-reg').className += ' disabled';
              }else{
                if(namecheck.test(value)){
                  document.getElementById('button-reg').classList.remove("disabled");
                  document.getElementById('fullName').classList.remove("is-invalid");      
       
                  setData(prevState => ({
                    ...prevState,
                    [name]: value
                  }));
                }else{
                  document.getElementById('namemsg').innerHTML ="The name can only contain letters";
                  document.getElementById('fullName').className += " is-invalid";
                  document.getElementById('button-reg').className += ' disabled';
                }
              }
            }
            else if(name==="password"){

                if(value.length>=8){
                  document.getElementById('button-reg').classList.remove("disabled");
                  document.getElementById('Password1').classList.remove("is-invalid");      
       
                  setData(prevState => ({
                  ...prevState,
                  [name]: value
                }));

              }else{
                document.getElementById('pwmsg').innerHTML ="password must be at least 8 characters";
                document.getElementById('Password1').className += " is-invalid";
                document.getElementById('button-reg').className += ' disabled';
              }

            }else if(name==="email"){
              if(emailCheck.test(value)){
                document.getElementById('button-reg').classList.remove("disabled");
                document.getElementById('Email1').classList.remove("is-invalid");
                setData(prevState => ({
                ...prevState,
                [name]: value
                }));
              }
              else{
                document.getElementById('emailmsg').innerHTML ="email is not valid! enter a valid email";
                document.getElementById('Email1').className += " is-invalid";
                document.getElementById('button-reg').className += ' disabled';
              }
            }
            else if(name==="cpassword"){

              if(data['password'] === value){
                document.getElementById('button-reg').classList.remove("disabled");
                document.getElementById('Password1').classList.remove("is-invalid");
                document.getElementById('Password2').classList.remove("is-invalid");
            
                setData(prevState => ({
                ...prevState,
                [name]: value
                }));
         
              }else{
                document.getElementById('pwmsg').innerHTML = "";
                document.getElementById('Password1').className += " is-invalid";
                document.getElementById('Password2').className += " is-invalid";
                document.getElementById('button-reg').className += ' disabled';
              }

            }else{
                setData(prevState => ({
                ...prevState,
                [name]: value
                }));
            }

            if(data['name'].length===0 || data['email'].length===0 || data['password'].length===0){
              document.getElementById('button-reg').className += ' disabled';
            }
        };

  //update file when uploaded
  const handleFileChange = e => {
      var extension = e.target.files[0].name.split('.').pop()
      
      if(extension === "png" || extension === "jpg" || extension === "jpeg"){
        setfile(e.target.files[0]);
        document.getElementById('validatedCustomFile').classList.remove("is-invalid");
        document.getElementById('button-reg').classList.remove("disabled");  
      }else{
        document.getElementById('validatedCustomFile').className += " is-invalid";
        document.getElementById('button-reg').className += ' disabled';
      }
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
      document.getElementById('ureg-error-field').style.display = 'block';
      document.getElementById('fail-icon').style.display = "block";
      document.getElementById('backToRegister').style.display ='block';
      document.getElementById('ureg-error-field').innerHTML = "An unexpected error occured. Plesse try again.";
    });
  }


  /*registration form*/
  return (
    <div id='reg'>

      <div id='urmsg-field'>
        <Tada>
          <div id='suc-icon'><FaCheckCircle size={70}/></div>
          <div id='fail-icon'><FaExclamationCircle size={70}/></div> 
          <div id='ureg-error-field'></div>
          <div id='suc-field'></div>
          <small><a id='backToRegister' href='/Register'>Register Again</a></small>
        </Tada>
      </div>

      <form onSubmit={handleSubmit} id='reg-form'>

        <div className="text-center">
          <h1>Sign-up</h1>

          {/*loding animation - initially it is hidden*/}
          <div id='loader'><Loader type="ThreeDots" color="#188459" height={50} width={50}/></div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input type="Name" className="form-control" id="fullName"
          name="name" onChange={handleChange} required></input>
          <div className="invalid-feedback" id='namemsg'></div>
        </div>

        <div className="mb-3">
          <label htmlFor="Email1" className="form-label">Email</label>
          <input type="email" className="form-control" id="Email1" aria-describedby="emailHelp"
          name="email" onChange={handleChange} required></input>
          <div className="invalid-feedback" id='emailmsg'></div>
        </div>
  
        <div className="mb-3">
          <label htmlFor="Password1" className="form-label">Password</label>
          <input type="password" className="form-control" id="Password1"
          name="password" onChange={handleChange} required></input>
          <div className="invalid-feedback" id='pwmsg'>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="Password2" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="Password2"
          name="cpassword" onChange={handleChange} required></input>
          <div className="invalid-feedback">
            password doesn't match          
          </div>
        </div>

        <label className="custom-file-label" htmlFor="validatedCustomFile">Confirmation Letter</label>
        <div className="mb-3">
          <input type="file" className="custom-file-input" id="validatedCustomFile" onChange={handleFileChange} required ></input>
          <div className="invalid-feedback">Choose Correct Format (File allowed: png, jpg or jpeg)</div>
        </div>
 
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-block" id="button-reg">Register</button>
        </div>

        <div>
          {/*<Link> tag is similar to <a> tag in HTML*/}
          <small>Already have an account? <Link to='/Login'>Login</Link></small>
        </div>

      </form>
    </div>
  );
}