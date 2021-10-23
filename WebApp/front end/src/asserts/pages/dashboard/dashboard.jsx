import { Link , BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProSidebar, SidebarFooter, SidebarContent, Menu, MenuItem} from 'react-pro-sidebar';
import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import Cookies from 'universal-cookie';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import ButtonGroup from "react-bootstrap/ButtonGroup";

//import components
import Profile from '../profile/profile';
import Devices from '../devices/devices';
import Logout from '../logout/logout';
import SimpleMap from '../maps/SimpleMap';
import Contact from '../contact/Contact';

import './styles.css';

//import icons from react icons
import { FaImage, FaBars, FaTimes, FaPhone, FaMapMarker, FaUser} from "react-icons/fa";
import { FiHome, FiLogOut} from "react-icons/fi";

const  TITLE = 'Dashboard';
const cookies = new Cookies();
var name = cookies.get('name');
var email = cookies.get('email');

//Modal.setAppElement('root');

export default function Dashboard() {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function active(id){
    
    document.getElementById('a').style.backgroundColor = '#205C41';
    document.getElementById('b').style.backgroundColor = '#205C41';
    document.getElementById('c').style.backgroundColor = '#205C41';
    document.getElementById('d').style.backgroundColor = '#205C41';
    document.getElementById(id).style.backgroundColor = '#7eb9a3';
  }

   //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false);

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa

        if(menuCollapse){
          setMenuCollapse(false);
          document.getElementById("content-body").style.marginLeft = "0px";
          document.getElementById("sidebar").style.width = "0px";
          document.getElementById("usr-x").style.display = 'none';
          document.getElementById("usr-=").style.display = 'inline';

          var list = document.getElementsByClassName("leaflet-container");
          if(list.length>0) list[0].style.width = '95vw';
        }
        else{
          setMenuCollapse(true);
          document.getElementById("sidebar").style.width = "15vw";
          document.getElementById("content-body").style.marginLeft = "15vw";
          document.getElementById("usr-x").style.display = 'inline';
          document.getElementById("usr-=").style.display = 'none';

          var list = document.getElementsByClassName("leaflet-container");
          if(list.length>0) list[0].style.width = '80vw';
        } 
            
      };

  return (

  <div>

      {/*logout message box*/}
      <Logout handleClose={handleClose} handleShow={handleShow} show={show}/>
      
      <Helmet>
        <title>{ TITLE }</title>
      </Helmet>

      <Router>
       
        <div className='row' id='content-header'>
          <div className='col-4 col-md-2'>
            <button onClick={menuIconClick} className='btn btn-secondary' id='button-user'>
            <FaTimes id='usr-x'/> 
            <FaBars id='usr-='/> Menu</button>
          </div>

          <div className='col-8 text-center'>
            <h1 id='content-logo'><a href="/" target="_blank">WildLife Tracker</a></h1>
          </div>

          <div className='col-8 offset-sm-1 col-md-1 text-center'>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic-button" variant="success"><FaUser/></Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu">
                  <small>{name}<br/>
                  {email}</small>
              </Dropdown.Menu>
            </Dropdown> 
          </div>
        </div>

        <div id="usr-header">
        <ProSidebar id="sidebar">
          
          <SidebarContent>
            <Menu iconShape="square">

              <MenuItem icon={<FiHome />} id='a' className='active-tab'>Home
              <Link to='/dashboard/profile' onClick={()=>{active('a')}}></Link>
              </MenuItem>
            
              <MenuItem icon={<FaImage />} id='b'>Photos 
               <Link to='/dashboard/devices' onClick={()=>{active('b')}}></Link>
              </MenuItem>

              <MenuItem icon={<FaMapMarker />} id='c'>Locations
              <Link to='/dashboard/locations' onClick={()=>{active('c')}}></Link>
              </MenuItem>              
            
              <MenuItem icon={<FaPhone />} id='d'>Contact us
              <Link to='/dashboard/contactus' onClick={()=>{active('d')}}></Link>
              </MenuItem>
            
            </Menu>
          </SidebarContent>
          
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} variant="primary" onClick={handleShow}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        
        </ProSidebar>

      </div>

      <div id='content'>

          <div className='row' id='content-body'>
            <Switch>
              <Route exact path="/dashboard/profile" component={Profile}/>
              <Route exact path="/dashboard/devices" component={Devices}/>
              <Route exact path="/dashboard/locations" component={SimpleMap} id='mp'/>
              <Route exact path="/dashboard/contactus" component={Contact}/>
            </Switch>
          </div>

      </div>

      </Router>

  </div>
  );
}
