import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from 'react-helmet';
import Loader from "react-loader-spinner";
import Fade from 'react-reveal/Fade';
import Tada from 'react-reveal/Tada';
import { FaExclamationCircle , FaEye  } from "react-icons/fa";
//import components
import Template from '../template';
import Logo from '../logo';

//import stylesheet
import './styles.css'

/*cookies*/
const cookies = new Cookies();

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;

/*page title*/
const  TITLE = 'Admin Sign-in';





/*export login page*/
export default function Login() {

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
   const history = useHistory();

   //states
   const [data, setData] = useState({

    email : "" ,
    password : ""

   });

   //update changes
   const handleChange = e => {
            const { name, value } = e.target;
            //eslint-disable-next-line
            let emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(name==="email"){
              if(emailCheck.test(value)){
                document.getElementById('button-admin-login').classList.remove("disabled");
                document.getElementById('exampleInputEmail1').classList.remove("is-invalid");
                setData(prevState => ({
                ...prevState,
                [name]: value
                }));
              }
              else{
                document.getElementById('emailmsg').innerHTML ="email is not valid! enter a valid email";
                document.getElementById('exampleInputEmail1').className += " is-invalid";
                document.getElementById('button-admin-login').className += ' disabled';
              }
            }else{
              setData(prevState => ({
                ...prevState,
                [name]: value
              }));
            }

            if(data['email'].length===0 || data['password'].length===0){
              document.getElementById('button-admin-login').className += ' disabled';
            }else{
              document.getElementById('button-admin-login').classList.remove("disabled");
            }
    };

  //submit - post
  const handleSubmit = (evt) => {

    evt.preventDefault();
    document.getElementById('button-admin-login').className += ' disabled';
    document.getElementById('alogin-error-field').style.display ='none';
    document.getElementById('loader').style.display ='block';

    axios.post(`${URL}api/auth/signin-admin`,data)
  
    .then(function (response) {
        cookies.set('name', response.data.msg.name, { path: '/' });
        cookies.set('email', response.data.msg.email , { path: '/' });
        cookies.set('token', response.data.token , { path: '/' });
        cookies.set('isSigned', true , { path: '/' });
        history.push('/Admin/profile');
    })
  
    .catch(function (error) {
        cookies.set('isSigned', false , { path: '/' });
        if(error.response){
          if(error.response.status===401){
            document.getElementById('loader').style.display ='none';
            document.getElementById('al-form').style.display ='none';
            document.getElementById('fail-icon').style.display ='block';
            document.getElementById('button-admin-login').className = document.getElementById('button-admin-login').className.replace("disabled", "");
            document.getElementById('alogin-error-field').style.display ='block';
            document.getElementById('backToALogin').style.display ='block';
            document.getElementById('resetPWAdmin').style.display ='block';
            document.getElementById('alogin-error-field').innerHTML = "The username and password incorrecet. Try again.";
          }
        }else{
            document.getElementById('loader').style.display ='none';
            document.getElementById('al-form').style.display ='none';
            document.getElementById('button-admin-login').className = document.getElementById('button-admin-login').className.replace("disabled", "");
            document.getElementById('fail-icon').style.display ='block';
            document.getElementById('alogin-error-field').style.display ='block';
            document.getElementById('backToALogin').style.display ='block';
            document.getElementById('alogin-error-field').innerHTML = "An Unexpected error occured. Try Again.";
        }
        
    });
  }

  const showPW = (evt) =>{
    var x = document.getElementById("exampleInputPassword1");
    if (x.type === "password") {
      x.type = "text";
    }
    else {
      x.type = "password";
    }
  }
  
  
  return ( 
    
    <div id='admin-log-form'>
      <div id='alogin-msg-field'>
        <Tada>
        <div id='fail-icon'><FaExclamationCircle size={70}/></div>
        <div id='alogin-error-field'></div>
        <small>
          <a id='backToALogin' href='/AdminLogin'>Login Again</a>
          <div id='resetPWAdmin'>
            Forgot password?
            <a href='/AdminPasswordRec'>Change Password</a>
          </div>
        </small> 
        </Tada>
      </div>
      
      <form onSubmit={handleSubmit} id='al-form'>
        <div className="text-center">
          <h1>Admin Sign-in</h1>
          <br></br>
          {/*loding animation - initially it is hidden*/}
          <div id='loader'><Loader type="ThreeDots" color="#188459" height={50} width={50}/></div>
          <br></br>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          name="email" onChange={handleChange} required></input>
          <div className="invalid-feedback" id='emailmsg'></div>
        </div>
  
        <div className="mb-3" id="aloginPW-field">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
           name="password" onChange={handleChange} required></input>
           <FaEye id="togglePW" size={25} onClick={showPW}/>
        </div>
 
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-block btn-primary" id="button-admin-login">Login</button>
        </div>

        <div>
          <small>
            Forgot password? <a href="/AdminPasswordRec">Password Recovery</a>
          </small>
        </div>
      </form>
    </div> 
    );
  }
