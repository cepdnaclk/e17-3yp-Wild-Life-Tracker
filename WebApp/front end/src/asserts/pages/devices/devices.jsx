import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ReactDOM from 'react-dom';
import listReactFiles from 'list-react-files';

import './styles.css';
import { FaPlus } from "react-icons/fa";
import Zoom from 'react-reveal/Zoom';
/*cookies*/
const cookies = new Cookies();

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;

var deviceIdList = [];

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

export default function Devices(){

	useEffect(() => {
		

			
			axios.get(`${URL}api/auth/devices_list`, {
				headers: {
					'x-auth-token' : cookies.get('token')
				}
			})
    
    		.then(function (response) {
  				cookies.set('newtoken', response.data.token , { path: '/' });
				for(var i=response.data.deviceArray.length-1 ; i>=0 ; i--){
					if(devices.indexOf(response.data.deviceArray[i]) === -1){  
						setDevices([...devices, response.data.deviceArray[i]]);}
				}
    		})
  
    		.catch(function (error) {
				console.log(error);
      			//cookies.set('user', admin , { path: '/' });
      			//document.getElementById('requests-list').innerHTML = "!!!Something went to wrong. Plesse try again later!!!";
      			//document.getElementById('requests-list').className ='token-error';
    		}); 
		

  	});

	function toggleform(){
		document.getElementById('addDevice').style.display==='block' ? 
		document.getElementById('addDevice').style.display = 'none' : 
		document.getElementById('addDevice').style.display = 'block';
	}

  	const [devices, setDevices] = useState(deviceIdList);

  	function addDevice(device) {
		axios.put(`${URL}api/auth/connect-device`, device ,{
			headers: {
				'x-auth-token' : cookies.get('token')
			}
		})
    
    	.then(function (response) {
			console.log(response);
    	})
  
    	.catch(function (error) {
			console.log(error);
      		//cookies.set('user', admin , { path: '/' });
      		//document.getElementById('requests-list').innerHTML = "!!!Something went to wrong. Plesse try again later!!!";
      		//document.getElementById('requests-list').className ='token-error';
    	});
    	document.getElementById('addDevice').style.display='none';
  	}

  	return (
			<div>
				<Zoom>
					<div className='row' id='device-tab'>
						<div className='col-11 col-md-4 text-center' id='connected'>

							<DeviceUl data={devices} />
							<button className="btn btn-success" id='add-btn' onClick={() => toggleform()}><FaPlus /></button>
							<div id="addDevice">
								<AddDeviceForm handleSubmit={addDevice} />
							</div>
						</div>
						<div className='col-11 col-md-8 text-center'>

							<div className='row' id='photos'></div>
						</div>
					</div>
				</Zoom>
			</div>
  	);
}

//converts array into <ul>
function DeviceUl(props){

	const arr = props.data;
	const deviceList = arr.map((val, index) =><li key={index} className='device' id={index}

		onClick={()=>{
			for (var i = arr.length - 1; i >= 0; i--) {
				document.getElementById(i).classList.remove("activedev");
			}document.getElementById(index).className+=' activedev';

			axios.get(`${URL}api/auth/device_photos/${index}`, {
				headers: {
					'x-auth-token' : cookies.get('newtoken')
				}
			})
    
    		.then(function (response) {
  		
    			const photoList = photos.map((val, index) =>

				<div className="col-md-6">
					<Zoom><img src ={val} key={index} alt={index} className="img-thumbnails"></img></Zoom>
				</div>
				);

				ReactDOM.render(photoList, document.getElementById('photos'));
				
   	 	})
  
    		.catch(function (error) {
				console.log(error);
      		//cookies.set('user', admin , { path: '/' });
      		//document.getElementById('requests-list').innerHTML = "!!!Something went to wrong. Plesse try again later!!!";
      		//document.getElementById('requests-list').className ='token-error';
    		}); 


			}			
		}

		><b>Device: {val}</b></li>);
	return <ul id='device-list'>{deviceList}</ul>;

};

//form
function AddDeviceForm(props) {

   const [newDev, setNewDev] = useState({

    serial_number : "" ,
    password : ""

   });

  	function handleChange(e){ 
		const { name, value } = e.target;
        setNewDev(prevState => ({
            ...prevState,
            [name]: value
        }));
	} 

	function handleSubmit(e){ 
		
		props.handleSubmit(newDev);
		setNewDev({
		    serial_number : "" ,
    		password : "" });
		e.preventDefault();
	}

	return(
		<form onSubmit={handleSubmit} id='dev-form'>
			<br/>
			<div className="d-flex justify-content-center">
			<table>
				<tr>
					<td><label htmlFor="id">Serial Number :</label></td>
					<td><input type="text" id="id" name="serial_number" onChange={handleChange}></input></td>
				</tr>
				<tr>
					<td><label htmlFor="pw">Password :</label></td>
					<td><input type="text" id="pw" name="password" onChange={handleChange}></input></td>
				</tr>
			</table>	
			</div>
			<button className="btn btn-success download" type="submit">Add</button>
		</form>
	); 
 }
