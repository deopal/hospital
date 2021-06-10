import React ,{useState,useEffect} from 'react';

import logo from "../../assets/images/logo.png";


import {Navbar,Nav,NavDropdown,Image,Button} from 'react-bootstrap';

import './header.css';
import { useSelector ,useDispatch} from 'react-redux';
import * as doc_actions from "../../store/actions/doc_auth_action";
import * as pat_actions from "../../store/actions/pat_auth_action";
import Notification from "../notification/notification";





export default function Header(props) {
  const [headerClass, setHeader] = useState("header1");
  const [sticky,setsticky]=useState("");

  const listenScrollEvent = event => {
    if (window.scrollY < 73) {
      setHeader("header1");
      setsticky("");
    } else if (window.scrollY > 70) {
      setHeader("header2 ");
      setsticky("top");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  },);

  const auth=localStorage.getItem('token');
  const role=localStorage.getItem('role');
  const pat_username=useSelector(state=>state.patauth.username);
  const doc_username=useSelector(state=>state.docauth.username);
  const dispatch=useDispatch();

  
   
        return(
            <Navbar collapseOnSelect expand="lg"  className={headerClass} sticky={sticky} >
  <Navbar.Brand href="/" className="m-0 p-0" style={{width:'60px',height:'60px'}}><Image src={logo} className="w-100 h-100" /></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="m-auto " style={{fontSize:'1.5em', color:'black'}} activeKey={window.location.pathname}>
      <Nav.Link href="/"  >Home</Nav.Link>
      <Nav.Link href="/about" >About</Nav.Link>
      {auth ? <NavDropdown title="Pages" id="collasible-nav-dropdown">
        {role ?
        <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>
        : ''}
        {role && role==='patient' ?
        <NavDropdown.Item href="/my-appointment">My appointment</NavDropdown.Item>
        : ''}
        
      </NavDropdown> :''}
      {!auth || role ==='patient' ? 
      <Nav.Link href="/doctors">Doctors</Nav.Link>
      : ''}
      {auth && role ==='doctor' ? 
      <Nav.Link href="/patient" >Patient</Nav.Link>
      : ''}
      <Nav.Link href="/contact" >Contact Us</Nav.Link>
    </Nav>
    {!auth ?
      <Nav activeKey={window.location.pathname} >

      <Button className="mr-5" variant="outline-info" style={{border:'1px green solid'}}>
      <NavDropdown title="Login" id="collasible-nav-dropdown" >
        <NavDropdown.Item href="/doctor_signin">As a doctor</NavDropdown.Item>
        <NavDropdown.Item href="/patient_signin">As a patient</NavDropdown.Item>
        </NavDropdown></Button>
      
    </Nav> 
    : (role==='doctor') ?
    <Nav >
    <Notification  role='doctor' />
      <h4 style={{textTransform:'capitalize'}} className=" mr-2 ml-2 mb-auto mt-auto">Dr. {doc_username}</h4>
      <Nav activeKey={window.location.pathname} >
      <Button className="m-2 " variant="danger" onClick={()=>dispatch(doc_actions.logout())}>
      Logout
      </Button>
      </Nav>
      
    </Nav> 
    :
    <Nav>
    <Notification  role='patient' />
      <h4 style={{textTransform:'capitalize'}} className=" mr-2 ml-2 mb-auto mt-auto">{pat_username}</h4>
      <Nav activeKey={window.location.pathname} >
      <Button className="m-2" variant="danger" style={{color:"white"}}  onClick={()=>dispatch(pat_actions.logout())}>
        Logout
        </Button>
        </Nav>
        
      
    </Nav> 

    
    }
    
  </Navbar.Collapse>
</Navbar>

        );

};

