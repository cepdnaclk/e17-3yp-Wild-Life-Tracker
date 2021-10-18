import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loader from "react-loader-spinner";
import Fade from 'react-reveal/Fade';
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Tada from 'react-reveal/Tada';
//material UI components
import Typography from '@mui/material/Typography';



//import components
import Template from '../template';
import Logo from '../logo';

//import stylesheet
import './styles.css'

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;

/*page title*/
const  TITLE = 'Password Reset';




export default function adminEmailSubmit() {

  const logo = <Logo /> //logo of the page
  const form = <Fade bottom><Form/></Fade>;

  //return template --> left side = logo , right side = login form 
  return (
    <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <Template left={logo} right={form} /> 
    </div>
  );
}


/*login form implementation*/
function Form() {

   //states
   const [data, setData] = useState({

    email : "" 

   });

   //update changes
   const handleChange = e => {
            const { name, value } = e.target;
            //eslint-disable-next-line
            let emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(data['email'].length===0){
              document.getElementById('button-submit').className += ' disabled';
            }

            if(emailCheck.test(value)){
                document.getElementById('button-submit').classList.remove("disabled");
                document.getElementById('exampleInputEmail1').classList.remove("is-invalid");
                setData(prevState => ({
                ...prevState,
                [name]: value
                }));
            }
            else{
                document.getElementById('emailmsg').innerHTML ="email is not valid! enter a valid email";
                document.getElementById('exampleInputEmail1').className += " is-invalid";
                document.getElementById('button-submit').className += ' disabled';
            }
        };

  //submit - post
  const handleSubmit = (evt) => {

    evt.preventDefault();

    document.getElementById('button-submit').className += ' disabled';
    document.getElementById('error-field').style.display ='none';
    document.getElementById('loader').style.display ='block';

    axios.post(`${URL}api/auth/admin-password-reset-rq`,data)
  
    .then(function (response) {
        document.getElementById('loader').style.display ='none';
        document.getElementById('button-submit').className = document.getElementById('button-submit').className.replace("disabled", "");
        document.getElementById('pw-reset-rq-form').style.display = "none";
        document.getElementById('suc-field').style.display = 'block';
        document.getElementById('suc-icon').style.display = "block";
        document.getElementById('suc-field').innerHTML = "The password reset request has been sent. Check your emails to proceed<br>";
    })
  
    .catch(function (error) {

        if(error.response){
          if(error.response.status===401){
            document.getElementById('loader').style.display ='none';
            document.getElementById('pw-reset-rq-form').style.display = "none";
            document.getElementById('button-submit').className = document.getElementById('button-submit').className.replace("disabled", "");
            document.getElementById('error-field').style.display ='block';
            document.getElementById('fail-icon').style.display ='block';
            document.getElementById('contactus').style.display ='block';
            document.getElementById('resendUR').style.display ='block';
            document.getElementById('error-field').innerHTML = "The email you entered is not valid!!!";
          }
        }else{
            document.getElementById('loader').style.display ='none';
            document.getElementById('pw-reset-rq-form').style.display = "none";
            document.getElementById('button-submit').className = document.getElementById('button-submit').className.replace("disabled", "");
            document.getElementById('error-field').style.display ='block';
            document.getElementById('fail-icon').style.display ='block';
            document.getElementById('contactus').style.display ='block';
            document.getElementById('resendUR').style.display ='block';
            document.getElementById('error-field').innerHTML = "An unexpected error occured.Try again.";  
        }
        
    }); 
  }

  //material UI
  
  
  return (
    
    <div id='pwr'>
        <div id='msg-field'>
            <Tada>
              <div id='suc-icon'><FaCheckCircle size={70}/></div>
              <div id='fail-icon'><FaExclamationCircle size={70}/></div>
              <div id='suc-field'></div>
              <div id='error-field'></div>
              <small>
                <a id='resendUR' href='/UserPasswordRec'>Resubmit a request.</a>
                <div id='contactus'>
                  Do you want guidance from us?
                  <a href='mailto: wildlifetreackeruop@gmail.com'>contact us</a>
                </div>
              </small>
            </Tada>
        </div>
        <form onSubmit={handleSubmit} id='pw-reset-rq-form'>
            <div className="text-center">
            
              <h1>
                  Password Reset
              </h1>
              <br></br>
              <Typography component="p" variant="p">
                  Enter the email that you have used to register in wildlife tracker to
                  proceed.
              </Typography>
              <br></br>
              {/*loding animation - initially it is hidden*/}
            <div id='loader'>
                <Loader type="ThreeDots" color="#188459" height={50} width={50}/></div>
            </div>
            
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                name="email" onChange={handleChange} required></input>
                <div className="invalid-feedback" id='emailmsg'></div>
            </div>
    
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-block" id="button-submit">Submit</button>
            </div>

            <div>
                <small>Back to <Link to='/AdminLogin'> Login </Link></small>
            </div>
        </form>
     </div> 
    );
  }
  