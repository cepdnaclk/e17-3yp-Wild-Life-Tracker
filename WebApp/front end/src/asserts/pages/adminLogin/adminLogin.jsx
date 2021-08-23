import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';

//import components
import Template from '../template';
import Logo from '../logo';

//import stylesheet
import './styles.css'

/*cookies*/
const cookies = new Cookies();

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;


/*export login page*/
export default function Login() {

  const logo = <Logo /> //logo of the page
  const form = <Form /> //login form

  //return template --> left side = logo , right side = login form 
  return (
    <div onLoad={function(){document.title = 'Admin Login'}}>
      <Template left={logo} right={form} /> 
    </div>
  );
}


/*login form implementation*/
function Form() {

   //states
   const [isSigned, setSign] = useState(false);
   const [data, setData] = useState({

    email : "" ,
    password : ""

   });

   //update changes
   const handleChange = e => {
            const { name, value } = e.target;
            setData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

  //submit - post
  const handleSubmit = (evt) => {

    evt.preventDefault();
    axios.post(`${URL}api/auth/signin-admin`,data)
  
    .then(function (response) {
        cookies.set('name', response.data.msg.name, { path: '/' });
        cookies.set('email', response.data.msg.email , { path: '/' });
        cookies.set('token', response.data.token , { path: '/' });
        setSign(true);
    })
  
    .catch(function (error) {
        setSign(false);
        if(error.response){
          if(error.response.status===401){
            document.getElementById('admin-error-field').innerHTML = "!!!Wrong username & password. Plesse try again!!!";
            console.log(error);
          }
        }else{
            document.getElementById('admin-log-form').innerHTML = "!!!Something went to wrong. Plesse try again later!!!";
            document.getElementById('admin-log-form').className ='error';
        }
        
    });
  }


  //if logged in
  if(isSigned){

    return(
        <Redirect to="Admin/profile" />
      )

  }

  //otherwise
  else{
  
    return (
    <div id='admin-log-form'>
      <form onSubmit={handleSubmit}>
        <div className="text-center">
          <h1>Login</h1>
        </div>

        <div id='admin-error-field'>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          name="email" onChange={handleChange}></input>
        </div>
  
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
           name="password" onChange={handleChange}></input>
        </div>
  
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
          <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
        </div>
 
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-block btn-primary" id="button-admin-login">Login</button>
        </div>

        <div>
          <small>Dont have an account? <Link to='/Register'> Register </Link><br/>
          Forgot password? <a href="#fogotPW">Password Recovery</a></small>
        </div>
      </form>
     </div> 
    );
  }
}