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
	 "https://previews.123rf.com/images/tamara1k/tamara1k1904/tamara1k190400158/120290893-gran-canaria-march-landscapes-of-strict-nature-reserve-inagua-reforested-areas.jpg",
	 "https://previews.123rf.com/images/synell/synell2001/synell200100044/139094100-stone-wall-wall-of-stones-as-a-texture-wall-of-stones-wall-of-a-medieval-fortress-with-mainly-white-.jpg",
	 "https://previews.123rf.com/images/utrasto/utrasto1910/utrasto191000026/134616504-watermelon-the-size-of-an-apricot-lie-together-in-one-hand-.jpg",
	 "https://previews.123rf.com/images/artursz/artursz1910/artursz191015430/131344711-handwriting-text-writing-be-consistent-conceptual-photo-uniform-persistent-firm-unalterable-even-unc.jpg",
	 "https://previews.123rf.com/images/ammit/ammit2005/ammit200500200/147598154-tungurahua-volcano-view-from-the-same-level-as-the-erupting-point-small-amount-of-noise-may-be-visib.jpg",
	 "https://previews.123rf.com/images/tamara1k/tamara1k1904/tamara1k190400158/120290893-gran-canaria-march-landscapes-of-strict-nature-reserve-inagua-reforested-areas.jpg",
	 "https://previews.123rf.com/images/synell/synell2001/synell200100044/139094100-stone-wall-wall-of-stones-as-a-texture-wall-of-stones-wall-of-a-medieval-fortress-with-mainly-white-.jpg",
	 "https://previews.123rf.com/images/utrasto/utrasto1910/utrasto191000026/134616504-watermelon-the-size-of-an-apricot-lie-together-in-one-hand-.jpg",
	 "https://previews.123rf.com/images/artursz/artursz1910/artursz191015430/131344711-handwriting-text-writing-be-consistent-conceptual-photo-uniform-persistent-firm-unalterable-even-unc.jpg",
	 "https://previews.123rf.com/images/ammit/ammit2005/ammit200500200/147598154-tungurahua-volcano-view-from-the-same-level-as-the-erupting-point-small-amount-of-noise-may-be-visib.jpg"
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

		<div className='row'>
		</div>

		<div className='row' id='photos'>
		</div>
	</div>

	);
}
