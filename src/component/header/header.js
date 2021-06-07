import React from 'react';

import logo from "../../assets/images/logo.jpg";


import {Navbar,Nav,NavDropdown,Image,Button} from 'react-bootstrap';

import './header.css';
import { useSelector ,useDispatch} from 'react-redux';
import * as doc_actions from "../../store/actions/doc_auth_action";
import * as pat_actions from "../../store/actions/pat_auth_action";





export default function Header(props) {
  const auth=localStorage.getItem('token');
  const role=localStorage.getItem('role');
  const pat_username=useSelector(state=>state.patauth.username);
  const doc_username=useSelector(state=>state.docauth.username);
  const dispatch=useDispatch();

  
   
        return(
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" >
  <Navbar.Brand href="/" className="m-0 h-100" style={{width:'150px'}}><Image src={logo} className="w-75 h-40" /></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="m-auto " style={{fontSize:'1.5em', color:'black'}} activeKey={window.location.pathname}>
      <Nav.Link href="/"  style={{color:'gray'}} >Home</Nav.Link>
      <Nav.Link href="/about"  style={{color:'gray'}}>About</Nav.Link>
      {auth ? <NavDropdown title="Pages" id="collasible-nav-dropdown" style={{color:'gray'}}>
        {role ?
        <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>
        : ''}
        {role && role==='patient' ?
        <NavDropdown.Item href="/my-appointment">My appointment</NavDropdown.Item>
        : ''}
        
      </NavDropdown> :''}
      {!auth || role ==='patient' ? 
      <Nav.Link href="/doctors" style={{color:'gray'}}>Doctors</Nav.Link>
      : ''}
      {auth && role ==='doctor' ? 
      <Nav.Link href="/patient" style={{color:'gray'}}>Patient</Nav.Link>
      : ''}
      <Nav.Link href="/contact" style={{color:'gray'}}>Contact Us</Nav.Link>
    </Nav>
    {!auth ?
      <Nav activeKey={window.location.pathname} >

      <Button className="mr-5" variant="primary">
      <NavDropdown title="Register" id="collasible-nav-dropdown" >
        <NavDropdown.Item href="/doctor_signin">As a doctor</NavDropdown.Item>
        <NavDropdown.Item href="/patient_signin">As a patient</NavDropdown.Item>
        </NavDropdown></Button>
      
    </Nav> 
    : (role==='doctor') ?
    <Nav >

      <h4 style={{color:'black',textTransform:'capitalize'}} className="m-auto mr-4">Dr. {doc_username}</h4>
      <Nav activeKey={window.location.pathname} >
      <Button className="m-2" variant="success" onClick={()=>dispatch(doc_actions.logout())}>
      Logout
      </Button>
      </Nav>
      
    </Nav> 
    :
    <Nav>

      <h4 style={{color:'black',textTransform:'capitalize'}} className="m-auto mr-4">{pat_username}</h4>
      <Nav activeKey={window.location.pathname} >
      <Button className="m-2" variant="primary" onClick={()=>dispatch(pat_actions.logout())}>
        Logout
        </Button>
        </Nav>
        
      
    </Nav> 

    
    }
    
  </Navbar.Collapse>
</Navbar>

        );

};

