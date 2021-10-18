import React,{useState} from 'react';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import Template from '../template';
import Logo from '../logo';

import './styles.css'

import { FaCheckCircle, FaExclamationCircle  } from "react-icons/fa";
import Loader from "react-loader-spinner";

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;

const  TITLE = 'Admin Sign-up';

/*export registration page*/
export default function passwordReset() {
  
  const logo = <Logo /> //logo of the page
  const form = <PWresetForm /> //registration form

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




function PWresetForm() {


    let {email,token} = useParams();
    /*initial states*/
    const [data, setData] = useState({
        password : "",
        cpassword : ""
    });


    //update states for changes
    const handleChange = e => {
                const { name, value } = e.target;
                
                if(data['password'].length===0 || data['cpassword'].length===0){
                    document.getElementById('button-reset-pw').className += ' disabled';
                }

                if(name==="password"){
                    if(value.length>=8){
                        document.getElementById('Password1').classList.remove("is-invalid");      

                        setData(prevState => {
                            return {
                                ...prevState,
                                [name]: value
                            };
                        });
                        
                    }else{
                        document.getElementById('pwmsg').innerHTML ="password must be at least 8 characters";
                        document.getElementById('Password1').className += " is-invalid";
                        document.getElementById('button-reset-pw').className += ' disabled';
                    }

                }
                else if(name==="cpassword"){
                    if(data['password'] === value){
                        document.getElementById('button-reset-pw').classList.remove("disabled");
                        document.getElementById('Password1').classList.remove("is-invalid");
                        document.getElementById('Password2').classList.remove("is-invalid");
                        
                        setData(prevState => {
                            return {
                                ...prevState,
                                [name]: value
                            };
                        });    
                    }
                    else{
                        document.getElementById('pwmsg').innerHTML = "";
                        document.getElementById('Password1').className += " is-invalid";
                        document.getElementById('Password2').className += " is-invalid";
                        document.getElementById('button-reset-pw').className += ' disabled';
                    }

                }
                
            };



    //when submit button clicked
    const handleSubmit = (evt) => {

        evt.preventDefault(); //keep page without reload
        document.getElementById('loader').style.display ='block';
        document.getElementById('button-reset-pw').className += ' disabled';
        /*post request*/
        axios.post(`${URL}api/auth/password-reset/${email}/${token}`,data)
    
        /*if successfull*/
        .then(function (response) {
            document.getElementById('loader').style.display ='none';
            document.getElementById('pw-reset-form').style.display = "none";
            document.getElementById('suc-icon').style.display = "block";
            document.getElementById('suc-field').innerHTML = "The new password is set. You can now login using new credentials.";
        })
    
        /**if failed*/
        .catch(function (error) {
            document.getElementById('loader').style.display ='none';
            document.getElementById('pw-reset-form').style.display = "none";
            document.getElementById('fail-icon').style.display = "block";
            document.getElementById('reset-error-field').innerHTML = "The link is not valid or expiered. Submit a new request.";
        });

    }


    /*password reset form*/
    return (
        <div id='pwr'>
            <div id='msg-field'>
                <div id='suc-icon'><FaCheckCircle size={70}/></div>
                <div id='fail-icon'><FaExclamationCircle size={70}/></div>
                <div id='reset-error-field'></div>
                <div id='suc-field'></div>
            </div>
            <form onSubmit={handleSubmit} id='pw-reset-form'>

                <div className="text-center">
                <h1>Change Password</h1>
                <p>Enter your new password.</p>
                <div id='loader'><Loader type="ThreeDots" color="#00BFFF" height={50} width={50}/></div>
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
        
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-block btn-primary" id="button-reset-pw">Change Password</button>
                </div>
            </form>
        </div>
    );
}