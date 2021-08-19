import './styles.css'
import React,{useState} from 'react';
import Template from '../template';
import Logo from '../logo';
import { Link } from 'react-router-dom';
import axios from 'axios';

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;




/*export registration page*/
export default function Register() {
  
  const logo = <Logo /> //logo of the page
  const form = <Form /> //registration form

  //return template --> left side = logo , right side = registration form 
  return (
    <div>
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
    fd.append('file', file);

    evt.preventDefault(); //keep page without reload

    /*post request*/
    axios.post(`${URL}api/auth/register-user`,fd)
  
    /*if successfull*/
    .then(function (response) {
      console.log(response);
    })
  
    /**if failed*/
    .catch(function (error) {
      console.log(error);
    });

  }


  /*registration form*/
  return (
      <form onSubmit={handleSubmit}>

        <div className="text-center">
          <h1>Register</h1>
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
  );
}