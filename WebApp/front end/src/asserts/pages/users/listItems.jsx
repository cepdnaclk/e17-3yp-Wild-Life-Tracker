import React from "react";
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import './styles.css';

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;

/*cookies*/
const cookies = new Cookies();

function Accept(email){
	axios.delete(`${URL}api/auth/accept-reg`, {
		headers: {
			'x-auth-token' : cookies.get('token')
		},
		data: {
			'email': email
		}
	})
    .then(function (response) {
		console.log(response);
      	document.getElementById('profile-informations').innerHTML = "successfull";
    })
  
    .catch(function (error) {
		console.log(error);
      //cookies.set('user', admin , { path: '/' });
      //document.getElementById('requests-list').innerHTML = "!!!Something went to wrong. Plesse try again later!!!";
      //document.getElementById('requests-list').className ='token-error';
    });

}

function Reject(email){
	axios.post(`${URL}api/auth/reject-reg`,{
		'email': email,
		'reason': document.getElementById("reason").value
	},
	{
		headers: {
			'x-auth-token' : cookies.get('token')
		}
	}
	)
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

    document.getElementById('textarea').style.display='none';
	document.getElementById('2btn').style.display='block'; 
}

function showReason(x){
	if(x==1){
		document.getElementById('2btn').style.display='none';
		document.getElementById('textarea').style.display='block';
	}else{
		document.getElementById('2btn').style.display='block';
		document.getElementById('textarea').style.display='none';
	}
	
}

export default function ListItems(props){

	const users = props.data;

		/*map users list into list*/
    const listItems = users.map((val, index) => 
      	<li className='items' key={index} id={index}
      				onClick={

      					/*onclick function*/
      					function(){

							const user = users[index];
							const userItems =
										<div className='row'>
											<div className='col-12 col-md-4'>
												<b>
												<div className="row">
													<div className='col-4'>
														Name
													</div>
													<div className='col-8'>
														{user["name"]}
													</div>
												</div>
												<div className="row">
													<div className='col-4'>
														Email
													</div>
													<div className='col-8'>
														{user["email"]}
													</div>
												</div>
												<div className="row">
													<div className='col-4'>
														Phone
													</div>
													<div className='col-8'>
														{user["phonenumber"]}
													</div>
												</div>
												</b>
      											<div className="row mt-5">
      												<div className="col-12" id="2btn">
      													
      														<button className='btn control' onClick={() => Accept(user["email"])}>Accept</button>
															<button className='btn control' onClick={() => showReason(1)}>Reject</button>
														
													</div>
													<div id='textarea'>
														<label htmlFor="reason">Reason :</label>
														<textarea id="reason" name="reson" rows="4" cols="35"></textarea>
														<button className='btn control' onClick={() => Reject(user["email"])}>Reject</button>

														<button className='btn control' onClick={() => showReason(0)}>Cancel</button>
													</div>
      											</div>
      										</div>

      										<div className='col-12 col-md-8' id="letter-container">
      											<img className='letter' alt='letter' src={URL+user["letter"]}></img>
      										</div>
      									</div>;
      									
      						/*pass above list into 'profile-info' element in the page*/
							ReactDOM.render(userItems, document.getElementById('profile-informations'));

							/*change all buttons class names to 'items'*/
							for (var i = users.length - 1; i >= 0; i--) {
								document.getElementById(i).className = 'items';
							}

							/*change class names of clicked button to 'items-active'*/	
							document.getElementById(index).className = 'items-active';


      				}

      				}      	> 
      	
      			<b>{val["name"]}</b>
      	</li>);

    return(

    	<ul className='none-style-list'>{listItems}</ul>

    	);

}