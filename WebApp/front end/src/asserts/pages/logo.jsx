import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

//returns logo, you can check style.css to find used styles
export default function Login() {

	return(

		<div ><Link to='/' className="logo"> WildLife<br/>Tracker </Link></div>	
	);
}