import { Link , BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem} from 'react-pro-sidebar';
import React, { useState } from "react";

//import components
import Profile from '../profile/profile';
import Users from '../users/users';

//import stylesheets
import 'react-pro-sidebar/dist/css/styles.css';
import "./styles.css";

//import icons from react icons
import { FaUsers, FaBars, FaTimes } from "react-icons/fa";
import { FiHome, FiLogOut} from "react-icons/fi";


/*export admin component*/
export default function Admin() {
  
   //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false);

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa

        (menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true));
              
      };

  return (

  <div onLoad={function(){document.title = 'Admin-panel'}}>
    <Router>

      <div id="header">
        <ProSidebar collapsed={menuCollapse}>

          <SidebarHeader>
            <div className="closemenu" onClick={menuIconClick}>
              <FaTimes/>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <Menu iconShape="square">

              <MenuItem active={true} icon={<FiHome />}>Home
              <Link to='/Admin/profile'></Link>
              </MenuItem>
            
              <MenuItem icon={<FaUsers />}>Users
               <Link to='/Admin/users'></Link>
              </MenuItem>          
            
            </Menu>
          </SidebarContent>
          
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        
        </ProSidebar>

      </div>

      <div id='content' className='container-fluid'>

          <div className='row' id='content-header'>
            <div className='col-4 col-md-1'>
              <button onClick={menuIconClick} className='btn' id='button'> <FaBars/> Menu</button>
            </div>

            <div className='col-8 col-md-9 text-center'>
              <h1 id='content-logo'>WildLife Tracker</h1>
            </div>

          </div>

          <div className='row' id='content-body'>
            <Switch>
              <Route exact path="/Admin/profile" component={Profile}/>
              <Route exact path="/Admin/users" component={Users}/>
            </Switch>
          </div>

      </div>

    </Router>
  </div>
  );
}
