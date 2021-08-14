import React,{useState} from 'react';
import Template from './template';
import Logo from './logo';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ReactDOM from 'react-dom';
const cookies = new Cookies();

export default function Login() {

  const logo = <Logo /> //logo of the page
  const form = <Form /> //login form

  //return template --> left side = logo , right side = login form 
  return (
    <div>
      <Template left={logo} right={form} /> 
    </div>
  );
}

//login form implementation
function Form() {

   const [isSigned, setSign] = useState(0);
   const [user, setUser] = useState("");

   //states
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
    axios.post('http://localhost:5000/api/auth/signin-user',data)
  
    .then(function (response) {
      setUser(response.data.msg.name);
      cookies.set('token', response.data.token , { path: '/' });
      setSign(1);
    })
  
    .catch(function (error) {
      console.log(error);
    }); 
  }

  const authorize = (evt) =>{
    axios.get('http://localhost:5000/api/auth/all-user-admin',{

      headers: {
        'x-auth-token' : cookies.get('token')
      },

    })
    .then(function (response) {
      
      const arr = response.data;
      const listItems = arr.map((val, index) => <li key={index}>{val["name"]}-{val["email"]}</li>);
      ReactDOM.render(<ul>{listItems}</ul>, document.getElementById('list'))


    })
  
    .catch(function (error) {
    console.log(error);
    }); 
  }

  if(isSigned === 1){

    return(

      <div>
      <p>hello {user}</p>
      <button type="submit" className="btn btn-block btn-primary" onClick={authorize} >view users</button>
      <div id="list">
        
      </div>
      </div>

    )

  }

  else{
  return (
      <form onSubmit={handleSubmit}>
        <div className="text-center">
          <h1>Login</h1>
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
          <button type="submit" className="btn btn-block btn-primary" >Login</button>
        </div>

        <div>
          <small>Dont have an account? <Link to='/Register'> Register </Link><br/>
          Forgot password? <a href="#fogotPW">Password Recovery</a></small>
        </div>
      </form>
  );}
}