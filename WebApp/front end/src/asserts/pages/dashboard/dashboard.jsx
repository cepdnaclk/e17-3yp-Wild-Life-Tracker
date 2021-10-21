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

import './styles.css';

//import icons from react icons
import { FaImage, FaBars, FaTimes, FaPhone, FaMapMarker, FaUser} from "react-icons/fa";
import { FiHome, FiLogOut} from "react-icons/fi";

const  TITLE = 'Dashboard';
const cookies = new Cookies();
var name = 'User Name'//cookies.get('name');
var email = 'Email@email.com'//cookies.get('email');

//Modal.setAppElement('root');

export default function Dashboard() {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        }
        else{
          setMenuCollapse(true);
          document.getElementById("sidebar").style.width = "200px";
          document.getElementById("content-body").style.marginLeft = "200px";
          document.getElementById("usr-x").style.display = 'inline';
          document.getElementById("usr-=").style.display = 'none';
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
            <h1 id='content-logo'>WildLife Tracker</h1>
          </div>

          <div className='col-8 offset-sm-1 col-md-1 text-center'>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic-button" variant="success"><FaUser/></Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu">
                  {name}<br/>
                  {email}
              </Dropdown.Menu>
            </Dropdown> 
          </div>
        </div>

        <div id="usr-header">
        <ProSidebar id="sidebar">
          
          <SidebarContent>
            <Menu iconShape="square">

              <MenuItem icon={<FiHome />} active={true} >Home
              <Link to='/dashboard/profile'></Link>
              </MenuItem>
            
              <MenuItem icon={<FaImage />}>Photos 
               <Link to='/dashboard/devices'></Link>
              </MenuItem>

              <MenuItem icon={<FaMapMarker />}>Locations
              <Link to='/dashboard/locations'></Link>
              </MenuItem>              
            
              <MenuItem icon={<FaPhone />}>Contact us
              <Link to=''></Link>
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
              <Route exact path="/dashboard/locations" component={SimpleMap}/>
            </Switch>
          </div>

      </div>

      </Router>

  </div>
  );
}
