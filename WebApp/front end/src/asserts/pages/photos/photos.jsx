//import React from "react";
//import axios from 'axios';
//import Cookies from 'universal-cookie';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';

import './styles.css';

/*cookies*/
//const cookies = new Cookies();

/*backend url*/
//const URL = process.env.REACT_APP_BACKEND_URL;

var photos = [
	 "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
	 "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=738&q=80",
	 "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80",
	 "https://images.unsplash.com/photo-1504173010664-32509aeebb62?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=713&q=80",
	 "https://images.unsplash.com/photo-1545063914-a1a6ec821c88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
	 "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=756&q=80",
	 "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=625&q=80",
	 "https://images.unsplash.com/photo-1517486430290-35657bdcef51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80",
	 "https://images.unsplash.com/photo-1543782248-03e2c5a93e18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80"

	 
];

export default function Photos() {

	const [load, setLoad] = useState(0);

	useEffect(() => {

		const photoList = photos.map((val, index) =>

				<div className="col-sm-6 col-md-4 col-lg-2"><img src ={val} key={index} alt={index} className="img-thumbnail"></img>
				<button className='btn delete' onClick={function(){photos.splice(index, 1);setLoad(load+1);}}>Delete</button>
				<button className='btn download'>Download</button>
				</div>
			);
		ReactDOM.render(photoList, document.getElementById('photos'));

	});

	return(

	<div className="container">
		<div className='row' id='photos'>
		</div>
	</div>

	);
}
