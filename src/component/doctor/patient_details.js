import React, { useCallback, useEffect } from 'react';
import {  Redirect } from 'react-router-dom';
import Spinner from "../spinner/spinner";




import { Table ,Form , Col , Button} from 'react-bootstrap';
import {
    Card,
    CardContent,
    Typography,
    Paper,
    CardActionArea,
    Divider,
    CardActions
} from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../../store/actions/doc_operation";




export default function Appointmentdetail(props) {


    const list = useSelector(state => state.docauth.appointment);
    const dispatch = useDispatch();

    let param;

    if (props.location.params && props.location.params.id) {
        localStorage.setItem('param', props.location.params.id);
        param = props.location.params.id;
    }
    else {
        param = localStorage.getItem('param');
        if (param == null) {
            <Redirect to="/" />
        }
    }

    const a_id = param;

    const tryList = useCallback(() => {

        dispatch(actions.getappointmentbyId(a_id));

    }, [dispatch, a_id]);



    useEffect(() => {
        tryList();
    }, [tryList]);

    const approveAppointment = (id) => {
        const pat_id=list.patientId;
        dispatch(actions.approveAppointment(id,pat_id));
    }

    const reviewSubmitHandler=(e)=>{
        e.preventDefault();
        const review=e.target.review.value;
        dispatch(actions.addReview(list._id,review));
    }



let loader =<Spinner />;




    return (
        <div>
            {!list ? loader :
        
        <div className="container p-2">
        
            <div className=" m-4 p-2">



                <Paper elevation={3}>
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

                        {list.status === 'pending' ?
                            <CardActions className="row m-auto" style={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
                                <Typography
                                    className="col-lg-5 col-md-12 col-sm-12"
                                    style={{ textAlign: 'center' }}
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    <h5> Status : Pending</h5>
                                </Typography>
                                <Button size="medium" style={{ backgroundColor: 'green', width: '100%', textAlign: 'center', textTransform: 'capitalize' }} className="btn btn-primary col-lg-5 col-md-12 col-sm-12" onClick={() => approveAppointment(list._id)}>
                                    Approve appointment
                                </Button>
                            </CardActions>

                            :
                            <CardActions className="row">

                                <Typography
                                    className="col-lg-12 col-md-12"
                                    style={{ textAlign: 'center' }}
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    <h5> Status : Approved</h5>
                                </Typography>
                            </CardActions>}


                    </Card>
                </Paper>

            </div>

            {list.status === 'approved' ? 
            <Form onSubmit={reviewSubmitHandler} className="p-4">
                <Form.Row className="align-items-center mb-4">
                    <Col xs="auto" md={8} lg={8} className="align-items-center m-auto" >
                        
                        <Form.Control
                            style={{border:'2px solid pink'}}
                            className='m-2'
                            name="review"
                            id="review"
                            required
                        />
                    </Col>
                    <Col xs="auto" md={4} lg={4} className="align-items-center m-auto">
                        <Button type="submit" className=" btn btn-info" >
                            Add review
                     </Button>
                    </Col>
                </Form.Row>
            </Form> :''}


            <div>
                {list.reviews ? <Table striped bordered hover size="sm" style={{ textAlign: 'center' }}>
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
                                    <td  colSpan='2'>{rev.detail}</td>
                                    <td>{rev.date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table> : ''}
            </div>
        </div>}
        </div>
    );
};