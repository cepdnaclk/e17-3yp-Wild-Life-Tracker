import React, { useState} from 'react';
//import React from "react";
//import axios from 'axios';
//import Cookies from 'universal-cookie';
//import ReactDOM from 'react-dom';
import './styles.css';


export default function Devices(){

	const deviceIdList = ['12345'];

  	const [devices, setDevices] = useState(deviceIdList);

  	function addDevice(device) {
    	if(device.localeCompare('')!==0)setDevices([...devices, device]);
  	}

  	return (
    	<div className='row' id='device-tab'>
			<div className='col-11 col-md-8 text-center' id='connected'>
				<h2>Devices</h2>
      			<DeviceUl data={devices} />
    		</div>
    		<div className='col-11 col-md-4' id='new-dev'>
				<AddDeviceForm handleSubmit={addDevice} />
      		</div>
    	</div>
  	);
}

//converts array into <ul>
function DeviceUl(props){

	const arr = props.data;
	const deviceList = arr.map((val, index) =><li key={index} className='device'>Device: {val}</li>);
	return <ul id='device-list'>{deviceList}</ul>;

};

//form
function AddDeviceForm(props) {

  	const [id, setId] = useState('');
  	const [pw, setPw] = useState('');

  	function handleChange(e){ 
		const { name, value } = e.target;
		if(name.localeCompare('id')===0){setId(value);}
		if(name.localeCompare('pw')===0){setPw(value);}
	} 

	function handleSubmit(e){ 
		
		props.handleSubmit(id);
		setId('');
		setPw('');
		e.preventDefault();
	}

	return(
		<form onSubmit={handleSubmit} id='dev-form'>
			<h2>Add New Device</h2><br/>
  			<label htmlFor="id">Device id : &nbsp;</label>
  			<input type="text" id="id" name="id" onChange={handleChange}></input><br/><br/>
  			<label htmlFor="pw">Password : &nbsp; </label>
  			<input type="text" id="pw" name="pw" onChange={handleChange}></input><br/>
				
			<button className='btn download' type="submit">Add</button>
		</form>
	); 
 }
