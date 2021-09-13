import React from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import ReactDOM from 'react-dom';

import ListItems from './listItems';

import './styles.css';

/*cookies*/
const cookies = new Cookies();

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;

var users = [];

const Accept = (evt) =>{
	axios.delete(`${URL}api/auth/accept-reg`, {
		headers: {
			'x-auth-token' : cookies.get('token')
		},
		data: {
			'email': cookies.get('selected')
		}
	})
    .then(function (response) {
		console.log(response);
      	document.getElementById('requests-list').innerHTML = "successfull";
    })
  
    .catch(function (error) {
		console.log(error);
      //cookies.set('user', admin , { path: '/' });
      //document.getElementById('requests-list').innerHTML = "!!!Something went to wrong. Plesse try again later!!!";
      //document.getElementById('requests-list').className ='token-error';
    }); 

}

export default function Users() {

	function getRequests(){

		console.log(1);

    /*change this*/
    axios.get(`${URL}api/auth/all-user-admin`,{

      headers: {
        'x-auth-token' : cookies.get('token')
      },

    })
    .then(function (response) {

    	for(var i=0; i<response.data.length; i++){
    		users[i]={
    			'name' : response.data[i].name,
    			'email' : response.data[i].email,
    			'letter': response.data[i].verificationLetter 
    		}
    	}

    	ReactDOM.render(  <ListItems data={users}/>, document.getElementById('requests-list') );
    	


    })
  
    .catch(function (error) {
      //cookies.set('user', admin , { path: '/' });
      document.getElementById('requests-list').innerHTML = "!!!Something went to wrong. Plesse try again later!!!";
      document.getElementById("requests-list").style = "color:red; padding:10px; margin-top:50px; border-style:solid; border-color:red; border-radius:10px; background-color:pink;";
    }); 
}

	return(

	<div onClick={getRequests()}>

			<div className='row' id='buttons'>
				<div className='col-6'>
				</div>	
				<div className='col-6'>
					<button className='btn control' onClick={Accept}>Accept</button>	
					<button className='btn control' >Reject</button>
				</div>
			</div>

		<div className='row' id="profiles">
			<div className='col-11 col-md-4' id="requests">
				
				<div className="list-unstyled" id='requests-list'>
				{/*all the requested profiles are dislayed in there*/}
				</div>

			</div>

			<div className="col-11 col-md-8" id="profile-informations">
			{/*profile informations are displayed in there*/}
			</div>

		</div>
	</div>

	);
}
