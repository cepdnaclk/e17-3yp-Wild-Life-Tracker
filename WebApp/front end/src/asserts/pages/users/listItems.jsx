import React from "react";
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';

import './styles.css';


/*cookies*/
const cookies = new Cookies();

export default function ListItems(props){

	const users = props.data;

		/*map users list into list*/
    const listItems = users.map((val, index) => 
      	<li className='items' key={index} id={index}> 
      	
      		<div className='row'>
      			<div className='col-6 text-center'>
      				{val["name"]}<br/>
      				{val["country"]}
      			</div>
      			<div className='col-6 text-center'>

      				<button className='btn view' onClick={

      					/*onclick function*/
      					function(){

							const user = users[index];
							const userItems =
										<div className='row'>
											<div className='col-12 col-md-6'>
												<ul>  
								      			<li>Name    : {user["name"]}</li>
      											<li>Email   : {user["email"]}</li>
      											<li>Address : {user["address"]}</li>
      											<li>Country : {user["country"]}</li> 
      									</ul>
      								</div>
      								<div className='col-12 col-md-6'>
      										<img className='letter' alt='letter' src={URL+user["letter"]}></img>
      								</div>
      							</div>;
      									
      						/*pass above list into 'profile-info' element in the page*/
							ReactDOM.render(userItems, document.getElementById('profile-informations'));
							cookies.set('selected', user["email"] , { path: '/' });

							/*change all buttons class names to 'items'*/
							for (var i = users.length - 1; i >= 0; i--) {
								document.getElementById(i).className = 'items';
							}

							/*change class names of clicked button to 'items-active'*/	
							document.getElementById(index).className = 'items-active';


      				}

      				}> View </button>
      			</div>
      		</div>
      	</li>);

    return(

    	<ul className='none-style-list'>{listItems}</ul>

    	);

}