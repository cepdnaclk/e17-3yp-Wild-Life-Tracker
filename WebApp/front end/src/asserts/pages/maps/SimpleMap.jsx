import React/*, { useState, useEffect }*/ from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ReactDOM from 'react-dom';
import './map.css';
import Zoom from 'react-reveal/Zoom';
import Loader from "react-loader-spinner";

/*cookies*/
const cookies = new Cookies();


/*backend url*/
const URL = process.env.REACT_APP_BACKEND_URL;

var device_list = [];

export default function SimpleMap() {

  const location_list = [];

  function fetchStationsData() {
    axios.get(`${URL}api/auth/devices_list`, {
        headers: {
          'x-auth-token' : cookies.get('token')
        }
      })
    
        .then(function (response) {
          
          cookies.set('newtoken', response.data.token , { path: '/' });
          device_list = response.data.deviceArray;

          for(var i=0 ; i<device_list.length ; i++){

            axios.get(`${URL}api/auth/device_photos/${i}`, {
              headers: {
                'x-auth-token' : cookies.get('newtoken')
              }
            })
        
              .then(function (response) {
                
                  var loc = response.data.device.location;
                  var temp = [loc.longitude,loc.latitude ];
                  location_list.push(temp);
                       
              })
  
            .catch(function (error) {
        
                console.log(error);
                //cookies.set('user', admin , { path: '/' });
                //document.getElementById('requests-list').innerHTML = "!!!Something went to wrong. Plesse try again later!!!";
                //document.getElementById('requests-list').className ='token-error';
            });

      }

      
      })
  
        .catch(function (error) {
        console.log(error);
          //cookies.set('user', admin , { path: '/' });
          //document.getElementById('requests-list').innerHTML = "!!!Something went to wrong. Plesse try again later!!!";
          //document.getElementById('requests-list').className ='token-error';
        });
      
       setTimeout(() => {  

        if(document.getElementById('map-loader')!==null && document.getElementById('map-container')!==null){
                    document.getElementById('map-loader').style.display='none';
                    ReactDOM.render(<MapUl data={location_list}/>, document.getElementById('map-container'));}

      }, 3000);

  }
    
  return(
    <div>
      <div id='map-container' onLoad={fetchStationsData()}>
      </div>
      <div className="offset-md-5 col-2 text-center" id='map-loader'>
        <Loader
          type="Puff"
          color=" #188459"
          height={100}
          width={100}
        />
        <h3>Please Wait....</h3>
      </div>
    </div>
    );

  
}

function MapUl(props){

  const arr = props.data;
  const listItems = arr.map((val, index) => 
    <Marker position={val}>
      <Popup>
        Device {device_list[index]}
      </Popup>
    </Marker>);
  
  return(
  
  <div>
    <Zoom>
      <MapContainer center={arr[0]} zoom={9.5} scrollWheelZoom={true}>
    
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listItems}
      </MapContainer>
    </Zoom>
  </div>
  );
}


