import './styles.css';

//import icons from react icons
import { FaPhone, FaMapMarker, FaEnvelope,  } from "react-icons/fa";
import Zoom from 'react-reveal/Zoom';

export default function Contact(){

	function getsize(){
		if(window.screen.width>600){
			return(60);
		}

		return(25);
	}

	return(
	
	<div id='contact-us-bg'>
		<Zoom>
		<div className='container col-12' id='contact-us'>
			<div className='row'>
				<div className='col-12 text-center'>
					<h1 id='title-contact'>Contact Us</h1>
					<div className='offset-2 offset-md-5 text-center'><hr id='hr'/></div>
				</div>	
			</div>
			<div className='row'>
				
			</div>
			<div className='row'>
				<div className='col-12 col-md-4 tile text-center'>
					<div className='icon'><FaMapMarker size={getsize()} color={'#e9c437'}/>
						<h5>Address</h5>
						<h6>Department of Computer Engineering,<br/>Faculty of Engineering,<br/>University of Peradeniya</h6>
					</div>
				</div>
				<div className='col-12 col-md-4 tile text-center'>
					<div className='icon'><FaEnvelope size={getsize()} color={'#e9c437'}/>
						<h5>Email</h5>
						<a href="mailto:wildlifetrackeruop@gmail.com">wildlifetrackeruop@gmail.com</a>
					</div>
				</div>
				<div className='col-12 col-md-4 tile text-center'>
					<div className='icon'><FaPhone size={getsize()} color={'#e9c437'}/>
						<h5>Call Us</h5>
						<h6>+94 776396597<br/>+94 719777032<br/>+94 766595991</h6>
					</div>
				</div>
			</div>
		</div>
		</Zoom>
	</div>
	
	);
}