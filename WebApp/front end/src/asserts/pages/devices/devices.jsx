import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ReactDOM from 'react-dom';
//import listReactFiles from 'list-react-files';
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import './styles.css';
import { FaPlus } from "react-icons/fa";
import Zoom from 'react-reveal/Zoom';
import Tada from 'react-reveal/Tada';
/*cookies*/
const cookies = new Cookies();

/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;

var deviceIdList = [];

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
		let data = {
			serial_number : device['serial_number'],
			password : device['password'],
			email : cookies.get('email')
		};
		axios.put(`${URL}api/auth/connect-device`, data,{
			headers: {
				'x-auth-token' : cookies.get('token')
			}
		})
    
    	.then(function (response) {
			console.log(response);
			if(document.getElementById('addDevice')){
				document.getElementById('addDevice').style.display = 'block';
				document.getElementById('suc-field-dev').style.display = 'block';
      			document.getElementById('suc-icon-dev').style.display = "block";
      			document.getElementById('suc-field-dev').innerHTML = "Successfull<br>";

				//document.getElementById('addDevice').innerHTML = "Successfull";
			}
			window.location.reload(false);
    	})
  
    	.catch(function (error) {
			console.log(error);
			if(document.getElementById('addDevice')){
				document.getElementById('addDevice').style.display = 'block';
				document.getElementById('error-field-dev').style.display = 'block';
      			document.getElementById('fail-icon-dev').style.display = "block";
				document.getElementById('error-field-dev').innerHTML = "The device is not connected. Try Again.";
				//document.getElementById('addDevice').innerHTML = "";
			}
			window.location.reload(false);
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
						<div className='col-12 col-md-4 text-center' id='connected'>

							<DeviceUl data={devices} />
							<button className="btn btn-success" id='add-btn' onClick={() => toggleform()}><FaPlus /></button>
							<div id='deviceadd-msg-field'>
									<Tada>
									<div id='suc-icon-dev'><FaCheckCircle size={50}/></div>
									<div id='fail-icon-dev'><FaExclamationCircle size={50}/></div> 
									<div id='error-field-dev'></div>
									<div id='suc-field-dev'></div>
									</Tada>
							</div>
							<div id="addDevice">
								<AddDeviceForm handleSubmit={addDevice} />
							</div>							
						</div>
						<div className='col-12 col-md-8 text-center'>

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


			axios.get("https://www.googleapis.com/drive/v2/files?q='1VTWwurgdrB8iIUMHgBwgnbV_TT2qOV2C'+in+parents&key=AIzaSyBKBh-L51SIkTYtUovN9GFlDbPsqWknhXA")
    		.then(function (response) {

    			const photos = response.data.items;

    			console.log(photos);

    			const photoList = photos.map((val, index) =>

				<div className="col-md-6">
					<Zoom><img src ={"https://drive.google.com/uc?export=view&id="+val.id} alt={index} key={index} className="img-thumbnails"></img></Zoom>
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
			<div className="ml-md-3">
			{/*<table>
				<tr>
					<td><label htmlFor="id">Serial Number :</label></td>
					<td><input type="text" id="id" name="serial_number" onChange={handleChange}></input></td>
				</tr>
				<tr>
					<td><label htmlFor="pw">Password :</label></td>
					<td><input type="text" id="pw" name="password" onChange={handleChange}></input></td>
				</tr>
			</table>*/}	
				<div className="form-group row">
               <label htmlFor="id" class="col-md-4 col-form-label">Serial Number</label>
               <div class="col-md-8">
                  <input type="text" id="id" name="serial_number" onChange={handleChange} placeholder="Serial Number"></input>
               </div> 
				</div>
				<div className="form-group row">
               <label htmlFor="pw" class="col-md-4 col-form-label">Password</label>
               <div class="col-md-8">
                  <input type="password" id="pw" name="password" onChange={handleChange} placeholder="Password"></input>
               </div> 
				</div>
			</div>
			<button className="btn btn-success download" type="submit">Add</button>
		</form>
	); 
 }
