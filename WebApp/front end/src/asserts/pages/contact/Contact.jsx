import './styles.css';

//import icons from react icons
import { FaPhone, FaMapMarker, FaEnvelope,  } from "react-icons/fa";
import Zoom from 'react-reveal/Zoom';

export default function Contact(){
	return(
	
	<div id='contact-us-bg'>
		<Zoom>
		<div className='container col-12' id='contact-us'>
			<div className='row'>
				<div className='col-12 text-center'>
					<h1 id='title-contact'>Contact Us</h1>
					<div className='offset-sm-5 text-center'><hr id='hr'/></div>
				</div>	
			</div>
			<div className='row'>
				
			</div>
			<div className='row'>
				<div className='col-4 tile text-center'>
					<div className='icon'><FaMapMarker size={60} color={'#e9c437'}/>
						<h5>Address</h5>
						<h6>Department of Computer Engineering,<br/>Faculty of Engineering,<br/>University of Peradeniya</h6>
					</div>
				</div>
				<div className='col-4 tile text-center'>
					<div className='icon'><FaPhone size={60} color={'#e9c437'}/>
						<h5>Email</h5>
						<h6>e17338@eng.pdn.ac.lk<br/>e17338@eng.pdn.ac.lk<br/>e17338@eng.pdn.ac.lk</h6>
					</div>
				</div>
				<div className='col-4 tile text-center'>
					<div className='icon'><FaEnvelope size={60} color={'#e9c437'}/>
						<h5>Call Us</h5>
						<h6>+94 112367763<br/>+94 112367763<br/>+94 112367763</h6>
					</div>
				</div>
			</div>
		</div>
		</Zoom>
	</div>
	
	);
}