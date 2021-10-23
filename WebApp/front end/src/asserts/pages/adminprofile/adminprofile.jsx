import React from "react";
import Cookies from 'universal-cookie';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Zoom from 'react-reveal/Zoom';
import './styles.css';

export default function Profile(props) {

	const cookies = new Cookies();
	var name = cookies.get('name');
	var email = cookies.get('email');


	const slides= [
  {
    header1: 'WELCOME TO',
    header2: 'Wildlife Tracker',
    description: 'Administration window.'
  },
  {
    header1: 'ALL THE CLIENT REQUESTS ARE LISTED UNDER',
    header2: 'Users Tab',
    description: "Click on each request to see the details entered by client."

  },
  {
    header1: 'READ THE DATA ENTERED BY CLIENT',
    header2: 'Before Accept',
    description: "Its your responsibility to accept request with only valid proofs.Life of some innocent animals might in your hands."

  },
  {
    header1: 'DO NOT FORGET TO ENTER THE REASON WHEN YOU ARE',
    header2: 'Rejecting A Request',
    description: "Your feedback is directly sent to the client. So you have to provide the reason for rejecting a request.Type the request in the textbox before reject.It might help client when they are reregistering"

  },
  {
    header1: 'YOU CAN ADD A NEW ADMIN USING THE TAB',
    header2: 'New Admin',
    description: "Submit the email of the person you want to add as an admin of our system."

  },
];


	return(

	<div>
		<Zoom>
		<div className='row' id="Home">
			<div className='col-8'>

				<div className="slide-container">
        			<Slide>
         				{slides.map((slideImage, index)=> (
            				<div className="each-slide" key={index}>
              					<div style={{'background': `rgba(76, 175, 80, 0)`}} className="pict">
              							<div className="content">
                							<div style={{'fontSize': `30px` , 'color':`#000`}}>{slideImage.header1}</div>
                							<div style={{'fontSize': `60px` , 'color':`#000`}}>{slideImage.header2}</div>
                							<div style={{'fontSize': `20px` , 'color':`#000`}}>{slideImage.description}</div>
              							</div>
              					</div>
            				</div>
          				))} 
        			</Slide>
      			</div>
			</div>

		</div>
		</Zoom>
	</div>

	);
}
