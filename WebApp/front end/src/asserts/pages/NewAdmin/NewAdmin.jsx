import React,{useState} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from 'react-helmet';
import Loader from "react-loader-spinner";
import { FaExclamationCircle  } from "react-icons/fa";
import Tada from 'react-reveal/Tada'


//import stylesheet
import './styles.css'

/*cookies*/
const cookies = new Cookies();

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;

/*page title*/
const TITLE = 'Add-New-Admin';


export default function NewAdmin(){

   //states
   const [data, setData] = useState({

    email : "" ,
    cemail : ""

   });

 //update changes
   const handleChange = e => {

            const { name, value } = e.target;
            //eslint-disable-next-line
            let emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            if(name==="email"){

              if(emailCheck.test(value)){
                
                document.getElementById('button-add').classList.remove("disabled");
                document.getElementById(e.target.id).classList.remove("is-invalid");
                
                setData(prevState => ({
                ...prevState,
                [name]: value
                }));

              }
              else{
                document.getElementById('emailmsg1').innerHTML ="email is not valid! enter a valid email";
                document.getElementById(e.target.id).className += " is-invalid";
                document.getElementById('button-add').className += ' disabled';
              }
            
            }else if(name==="cemail"){

              setData(prevState => ({
                ...prevState,
                [name]: value
              }));

              if(data['email'].localeCompare(value)!==0){
                document.getElementById('emailmsg2').innerHTML ="email doesn't match";
                document.getElementById(e.target.id).className += " is-invalid";
                document.getElementById('button-add').className += ' disabled';                
              }else{
                document.getElementById('button-add').classList.remove("disabled");
                document.getElementById(e.target.id).classList.remove("is-invalid");

              }

            }
        };

  //submit - post
  const handleSubmit = (evt) => {

    evt.preventDefault();

    document.getElementById('button-add').className += ' disabled';
    document.getElementById('loader').style.display ='block';

    /*post request*/
    axios.post(`${URL}api/auth/register-user`,{
      headers: {
        'x-auth-token' : cookies.get('token')
      },
      data: data
    })
  
    /*if successfull*/
    .then(function (response) {
      document.getElementById('loader').style.display ='none';
      document.getElementById('button-add').classList.remove("disabled");
      document.getElementById('newadminform').style.display = "none";
      //document.getElementById('suc-field').style.display = 'block';
      //document.getElementById('suc-icon').style.display = "block";
      //document.getElementById('suc-field').innerHTML = "Your data has been sent. It may take 3-5 working days to accept your registration.<br>";

    })
  
    /**if failed*/
    .catch(function (error) {
      document.getElementById('newadminform').style.display ='none';
      document.getElementById('button-add').classList.remove("disabled"); 
      document.getElementById('add-error-field').style.display = 'block';
      document.getElementById('add-msg-field').innerHTML = "An unexpected error occured. Plesse try again.";
    });

   
  }

	return(
<div>     

    <div className='row d-flex justify-content-center align-items-center' id='newadminform-window'>

      <div className="col-11 col-md-4 text-center" id='add-error-field'>
        <Tada>
        <div id='fail-icon-2'><FaExclamationCircle size={70}/></div>
        <div id='add-msg-field'></div>
        <small>
          <a href='/Admin/newadmin'>Retry</a>
        </small> 
        </Tada>
      </div>  

      <div className="col-11 col-md-4" id='newadminform'>
      <form onSubmit={handleSubmit}>
        <div className="text-center"> 
          <h1>
              Add New Admin
          </h1>
          {/*loding animation - initially it is hidden*/}
          <div id='loader'><Loader type="ThreeDots" color="#188459" height={50} width={50}/></div>
          <br></br>
        </div>
        
        <div className="mb-3">
          <label htmlFor="Email1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="Email1" aria-describedby="emailHelp"
          name="email" onChange={handleChange} required></input>
          <div className="invalid-feedback" id='emailmsg1'></div>
        </div>
  
        <div className="mb-3">
          <label htmlFor="Email2" className="form-label">Confirm Email address</label>
          <input type="email" className="form-control" id="Email2" aria-describedby="emailHelp"
          name="cemail" onChange={handleChange} required></input>
          <div className="invalid-feedback" id='emailmsg2'></div>
        </div>
        <br></br>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-block" id="button-add">Add</button>
        </div>
      </form>
      </div>
    </div>
     </div> 
	);
}