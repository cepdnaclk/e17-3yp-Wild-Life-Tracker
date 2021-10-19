import { Link , BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProSidebar, SidebarFooter, SidebarContent, Menu, MenuItem} from 'react-pro-sidebar';
import React, { useState } from "react";
import { Helmet } from 'react-helmet';

//import components
import Profile from '../profile/profile';
import Users from '../users/users';
import Logout from '../logout/logout';
import NewAdmin from '../NewAdmin/NewAdmin';

//import stylesheets
import 'react-pro-sidebar/dist/css/styles.css';
import "./styles.css";

//import icons from react icons
import { FaUsers, FaBars, FaTimes, FaPlus} from "react-icons/fa";
import { FiHome, FiLogOut} from "react-icons/fi";

const  TITLE = 'Admin panel';

/*export admin component*/
export default function Admin() {

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
          document.getElementById("admin-content").style.marginLeft = "0px";
          document.getElementById("admin-sidebar").style.width = "0px";
          document.getElementById("admin-usr-x").style.display = 'none';
          document.getElementById("admin-usr-=").style.display = 'inline';
        }
        else{
          setMenuCollapse(true);
          document.getElementById("admin-sidebar").style.width = "200px";
          document.getElementById("admin-content").style.marginLeft = "200px";
          document.getElementById("admin-usr-x").style.display = 'inline';
          document.getElementById("admin-usr-=").style.display = 'none';
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

       <div className='row' id='admin-content-header'>
          <div className='col-4 col-md-1'>
            <button onClick={menuIconClick} className='btn' id='button-user'>
            <FaTimes id='admin-usr-x'/> 
            <FaBars id='admin-usr-='/> Menu</button>
          </div>

          <div className='col-8 col-md-9 text-center'>
            <h1 id='content-logo'>WildLife Tracker</h1>
          </div>
        </div>

      <div id="header-admin">
        <ProSidebar id='admin-sidebar'>
          
          <SidebarContent>
            <Menu iconShape="square">

              <MenuItem active={true} icon={<FiHome />}>Home
              <Link to='/Admin/profile'></Link>
              </MenuItem>
            
              <MenuItem icon={<FaUsers />}>Users
               <Link to='/Admin/users'></Link>
              </MenuItem>

              <MenuItem icon={<FaPlus />}>New Admin
               <Link to='/Admin/newadmin'></Link>
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

      <div id='admin-content'>

          <div className='row' id='admin-content-body'>
            <Switch>
              <Route exact path="/Admin/profile" component={Profile}/>
              <Route exact path="/Admin/users" component={Users}/>
              <Route exact path="/Admin/newadmin" component={NewAdmin}/>
            </Switch>
          </div>

      </div>

    </Router>
  </div>
  );
}
