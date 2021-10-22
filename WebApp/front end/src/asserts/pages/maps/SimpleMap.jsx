import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './map.css';

const positions = [[6.416809206663523, 81.35046167593366],
                  [6.420562083627918, 81.34805841681332],
                  [6.38132609674358, 81.38445062634995],
                  [6.3929266152799205, 81.41912622222918],
                  [6.403162148410246, 81.48504418667288],
                  [6.3291205194141655, 81.42736596778464],
                  [6.323319573216925, 81.46547479097866]]; 

const listItems = positions.map((val, index) => 
        <Marker position={val}>
          <Popup>
            Device {index+1}
          </Popup>
        </Marker>);

export default function SimpleMap() {
        
return(

  <MapContainer center={positions[0]} zoom={10} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {listItems}

  </MapContainer>
);
  
}


