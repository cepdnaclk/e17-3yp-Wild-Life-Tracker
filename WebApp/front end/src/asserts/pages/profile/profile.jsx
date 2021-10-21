import React from "react";
import Cookies from 'universal-cookie';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import './styles.css';

export default function Profile(props) {

	const cookies = new Cookies();
	var name = cookies.get('name');
	var email = cookies.get('email');


	const slides= [
  {
    header1: 'NEXT GENERATION OF WILDLIFE RESEARCHING',
    header2: 'Wildlife Tracker',
    description: 'A remote wildlife tracking system for researchers.'
  },
  {
    header1: 'OUR SYSTEM MAKES IT',
    header2: 'Easy and Safe',
    description: "This system provides facilities to analyse the behaviour of wild animals remotely. You don't have to stay in your researching area all the time anymore. You can do your research while you are in your sweet home."

  },
  {
    header1: 'OUR SYSTEM IS',
    header2: 'Reliable',
    description: "Don't worry about the connectivity and power issues. Our device will look after all of these things. It has own storage facilities and automatic charging with solar power."

  },
];


	return(

	<div>
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
	</div>

	);
}
