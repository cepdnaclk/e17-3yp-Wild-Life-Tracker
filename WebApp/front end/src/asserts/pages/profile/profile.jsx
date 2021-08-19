import React from "react";
import './styles.css'

const profile = {
	name : 'Jacob Byrd',
	email : 'erat.eget.tincidunt@risusDonec.edu',
	joined : '2020/10/11',
	photos : 12
}

export default function Profile() {
	return(

	<div className="container">
		<div className='row'>

			<div className='col-10 col-md-5' id="profile">
				
				<div className='row'>
					<div className='col-12 col-md-4'>
						<img src="https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg" className="pic" alt="pp"></img>
					</div>

					<div className='col-12 col-md-8'>
						<ul className="list-unstyled">
							<li>Name  : {profile.name}</li>
							<li>Email : {profile.email}</li>
							<li>Joined: {profile.joined}</li>
							<li>Photos: {profile.photos}</li>
						</ul>
						
					</div>
				</div>

			</div>

			<div className="col-10 col-md-5" id="profile-info">

				<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

</p>

			</div>

		</div>
	</div>

	);
}
