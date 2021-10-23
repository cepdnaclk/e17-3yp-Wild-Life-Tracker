import "./styles.css";

import {Modal,Button} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";

import {FaTimesCircle} from "react-icons/fa";

const cookies = new Cookies();

export default function Logout(props){

  const history = useHistory();

  //const redirect = <Redirect push to="/Login" />;

  const logout = () =>{
    cookies.remove("isSigned", { path: '/' });
    cookies.remove("name", { path: '/' });
    cookies.remove("email", { path: '/' });
    cookies.set('isSigned', false , { path: '/' });
    props.handleClose();
    history.push('/');
      
  }

  return (
      <Modal 
          show={props.show} 
          onHide={props.handleClose}
          size="sm"
          contentClassName="mymodal"
          centered
      >
      
        <Modal.Header>
          <Modal.Title>Logout</Modal.Title>
          <FaTimesCircle onClick={props.handleClose} size={20} id='close-btn'/>
        </Modal.Header>
        <Modal.Body>Do you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" id='modal-button' onClick={logout}>Yes</Button>
          <Button variant="primary" id='modal-button' onClick={props.handleClose}>No</Button>
        </Modal.Footer>
      
      </Modal>
  );
}

