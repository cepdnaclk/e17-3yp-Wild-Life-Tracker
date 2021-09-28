import React from "react";
import Cookies from 'universal-cookie';

import './styles.css';

//var name = '';
//var email = '';
//var joined : '';
//var photos : 0;


export default function Profile(props) {

	const cookies = new Cookies();
	var name = cookies.get('name');
	var email = cookies.get('email');


	return(

	<div>
		<div className='row' id="Home">
			<div className='col-4' id='profile'>
				<img src="https://www.pngitem.com/pimgs/b/146-1468479_profile-icon-png.png" className="rounded-circle" id="pic" alt="pp"></img>
					<div>
	  					<h3>{name}</h3>
						<h4>{email}</h4>
					{/*	<li>Joined: {joined}</li>
						<li>Photos: {photos}</li>*/}
					</div>

			</div>
			<div className='col-8'>
				<h3>Features</h3><br/>
				<table>
					<tr>
						<td>
							<h5>Remotely Controlable</h5>
							<p>Researcher can monitor the station through the web app after it is successfully established in researching area.</p>
						</td>
						<td>
							<h5>Solar Power</h5>
							<p>The stations are powerd by battaries. A solar cell system is used to recharge them.</p>
						</td>
					</tr>

					<tr>
						<td>
							<h5>High Performance Camera Module</h5>
							<p>A powerful camera unit to capture perfect photos in any lighting condition.
								Also provides video recording facilities, recorded videos are stored in the own memory of station.</p>							
						</td>
						<td>
							<h5>Durable</h5>
							<p>Can be set up in any environment. Made with highly durable and waterproof materials so that animals and unforgiving weather can't damage it.</p>							
						</td>
					</tr>

					<tr>
						<td>
							<h5>Tracking System</h5>
							<p>Pinpoint the exact location of the station. The most active station can be observed by the Web App.</p>							
						</td>
						<td>
							<h5>Self Storage In Stations</h5>
							<p>Data obtained by the system is stored in itself when there is no connection with the database.</p>							
						</td>
					</tr>
				</table>
			</div>

		</div>
	</div>

	);
}
