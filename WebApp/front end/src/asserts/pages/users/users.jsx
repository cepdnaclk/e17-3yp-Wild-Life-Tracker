import React from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import ReactDOM from 'react-dom';
import Zoom from 'react-reveal/Zoom';

import ListItems from './listItems';

import './styles.css';

/*cookies*/
const cookies = new Cookies();

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;

var users = [];

export default function Users() {

	function getRequests(){

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
<Zoom>
	<div onClick={getRequests()}>

		<div className='row' id="profiles">
			<div className='col-12 col-md-4 text-center' id="requests">
				<h5>REQUESTS<br/></h5>
				<div className="list-unstyled text-center" id='requests-list'>
				{/*all the requested profiles are dislayed in there*/}
				</div>

			</div>

			<div className="col-12 col-md-8" id="profile-informations">
			{/*profile informations are displayed in there*/}
			</div>

		</div>
	</div>
</Zoom>
	);
}
