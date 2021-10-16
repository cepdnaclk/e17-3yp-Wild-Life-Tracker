import React from 'react';
import './styles.css';
import { Typography } from '@mui/material';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import { Wave } from 'react-animated-text';
import { Button } from '@mui/material';
import ArrowIcon from '@mui/icons-material/ArrowForward';

//returns logo, you can check style.css to find used styles
export default function Login() {

	return(

		<div >
			<Fab 
				size="large" 
				color="secondary" href="/" 
				id="homeButton"
				>
				<HomeIcon />
			</Fab>
			<Typography variant="h1" component="h1" id="title">
				Wildlife <span>Tracker</span>
			</Typography>
			<Typography variant="h6" component="h6" id="animatedText">
				<Wave text="NEXT GENERATION OF WILDLIFE RESEARCHING" effect="pop" effectChange={2.2} delay={10.0}/>
			</Typography>
			<div id="docButtonCon">
				<Button
					color="primary"
					variant="contained"
					href="http://wildlifetrackeruopintro.com.s3-website-us-east-1.amazonaws.com"
					id="docButton"
					endIcon={<ArrowIcon/>}
				>Explore More</Button>
			</div>
			
		</div>	
	);
}
