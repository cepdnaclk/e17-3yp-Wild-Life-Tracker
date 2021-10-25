import React from "react";
//import Cookies from 'universal-cookie';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Zoom from 'react-reveal/Zoom';
import './styles.css';

export default function Profile(props) {

	//const cookies = new Cookies();
	//var name = cookies.get('name');
	//var email = cookies.get('email');


	const slides= [
  {
    header1: 'WELCOME TO',
    header2: 'Wildlife Tracker',
    description: 'Wish you a happy researching with wildlife tracker'
  },
  {
    header1: 'YOU CAN CONNECT YOUR DEVICE WITH YOUR PROFILE FROM',
    header2: 'Photos Tab',
    description: "Click the '+' sign in photos tab to add a new device.Then enter the serial number and the password of your device and submit"

  },
  {
    header1: 'CLICK ON EACH DEVICE IN THE LIST SHOWN IN',
    header2: 'Photos tab',
    description: "To see the photos captured by that device."

  },
  {
    header1: 'YOU CAN SEE THE LOCATION IN',
    header2: 'Location Tab',
    description: "The map provided in location tab will pinpoint each of your device. Click on the pointer to see the device name."

  },
  {
    header1: 'IF YOU WANT ANY GUIDENCE',
    header2: 'From Us',
    description: "Contact details are provided under 'contact us' tab."

  },
];


	return(

	<div>
		<Zoom>
		<div className='row' id="Home">
			<div className='col-12 col-md-8'>

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
