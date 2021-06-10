import React, { useCallback, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope, faUserTie } from '@fortawesome/free-solid-svg-icons';
import Spinner from "../spinner/spinner";

import { Table } from 'react-bootstrap';
import {
    Button,
    Card,
    CardContent,
    Typography,
    CardActions,
    Paper,
    CardActionArea,
    Divider
} from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../../store/actions/pat_operation";





export default function Appointmentdetail(props) {
    console.log(props.location);
    const doc = useSelector(state => state.patauth.docList);

    const list = useSelector(state => state.patauth.appointment);
    const dispatch = useDispatch();

    let param;

    if(props.location.params && props.location.params.id){
        localStorage.setItem('param',props.location.params.id);
        param=props.location.params.id;
    }
    else{
        param=localStorage.getItem('param');
    }
    const a_id=param;
    
    console.log(param);

    const tryList = useCallback(() => {

        dispatch(actions.getappointmentbyId(a_id));

    }, [dispatch, a_id]);

    const doc_id = list ? list.doctorId : '';
    console.log(list);

    const trydocList = useCallback(() => {

        dispatch(actions.getDoctorsListbyId(doc_id));

    }, [dispatch, doc_id]);

    useEffect(() => {
        tryList();
        trydocList();
    }, [tryList, trydocList]);

    

    const endAppointment=(id)=>{
        dispatch(actions.endAppointment(id));
    }



let loader=<Spinner />;


    return (
        <div>
        {doc && list ?
        <div className="container p-2">
        
            <div className="row m-4">
                <div className="col-md-6 col-lg-6 col-sm-12 p-2">

                    {doc ? <Paper elevation={3}>
                        <Card>

                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{ textTransform: 'capitalize', textAlign: 'center' }}>
                                        Doctor details
                                        </Typography>
                                    <Divider className="mb-2" />
                                    <Typography gutterBottom color="textSecondary" variant="h5" component="h2" style={{ textTransform: 'capitalize', textAlign: 'center' }}>
                                        Dr. {`${doc.firstName} ${doc.lastName}`}
                                    </Typography>
                                    <Typography
                                        style={{ textAlign: 'center' }}
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        <h5 style={{ textTransform: 'capitalize' }}> <FontAwesomeIcon icon={faUserTie} /> {doc.speciality ? doc.speciality : ''} </h5>
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="h5"
                                        
                                    >
                                        <h5 className='m-2' style={{margin:'auto',textAlign:'center'}}><FontAwesomeIcon icon={faPhoneAlt} /> {doc.number} </h5>
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        variant="h5"
                                        
                                    >
                                        <h5 className='m-2' style={{margin:'auto',textAlign:'center'}}><FontAwesomeIcon icon={faEnvelope} /> {doc.email} </h5>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                            {list.status==='approved' || list.status==='pending'? 

                            <CardActions className="row m-auto" style={{ width: '50%' }}>
                                
                            <Button size="medium" style={{ backgroundColor: 'orange',width:'100%',textAlign:'center',textTransform:'capitalize'}} className="btn btn-danger col-lg-12 col-md-12 col-sm-12" onClick={()=>endAppointment(list._id)}>
                                    End appointment
                                </Button>

                            </CardActions> : ''}
                        </Card>
                    </Paper> : ''}
                </div>

                <div className="col-md-6 col-lg-6 col-sm-12 p-2">

                    {list ? <Paper elevation={3}>
                        <Card>
                            <CardActionArea>

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{ textTransform: 'capitalize', textAlign: 'center' }}>
                                        Patient details
                                        </Typography>
                                    <Divider className="mb-2" />
                                    <Typography gutterBottom color="textSecondary" variant="h5" component="h2" style={{ textTransform: 'capitalize', textAlign: 'center' }}>
                                        {list.patientName}
                                    </Typography>
                                    <Typography
                                    
                                        style={{ textAlign: 'center' }}
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        <h5 style={{ textTransform: 'capitalize' }}> Aadhar number: {list.adharNumber} </h5>
                                        <h5 style={{ textTransform: 'capitalize' }}> Age: {list.age} years</h5>

                                    </Typography>
                                    <Typography
                                    
                                        style={{ textAlign: 'center' }}
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        <h5 style={{ textTransform: 'capitalize' }}> Contact number: +91 {list.number} </h5>
                                        <h5 style={{ textTransform: 'capitalize' }}> Gender: {list.gender} </h5>
                                    </Typography>
                                    <Typography
                                        style={{ textAlign: 'center' }}
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        <h5 style={{ textTransform: 'capitalize' }}> Health problems: {list.healthProblems} </h5>
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                            <CardActions className="row">

                                <Typography
                                className="col-lg-12 col-md-12"
                                    style={{ textAlign: 'center' }}
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    <h5> Status : {list.status}</h5>
                                </Typography>
                            </CardActions>

                        </Card>
                    </Paper> : ''}
                </div>

            </div>
            <div>
                {list ? list.reviews ? <Table striped bordered hover size="sm" style={{ textAlign: 'center' , marginTop:'4rem'}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th colSpan='2'>Reviews</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.reviews.map((rev, i) => {

                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td colSpan='2'>{rev.detail}</td>
                                    <td>{rev.date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table> : '' : ''}
            </div> 
        </div> : loader }
        </div>
    );
};