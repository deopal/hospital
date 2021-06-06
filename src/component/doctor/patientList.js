import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {makeStyles } from '@material-ui/core';

import {Table} from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../../store/actions/doc_operation";



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {

    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  media: {
    height: 180,
  },
}));

export default function Patientlist(props) {


  //   const error=useSelector(state => state.patauth.error);
  const list = useSelector(state => state.docauth.patientList);
  const dispatch = useDispatch();

  const tryList = useCallback(() => {
    const id = localStorage.getItem('userId');
    dispatch(actions.getpatientList(id));
  }, [dispatch]);
  useEffect(() => {
    tryList();
  }, [tryList]);




  const classes = useStyles();


  return (
      <div className="container p-2">
        <Table striped bordered hover size="sm" style={{textAlign:'center'}}>
          <thead>
            <tr>
              <th>#</th>
              <th>Patients</th>
              <th>Health problems</th>
              <th>Date</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list ? list.map((pat, i) => {

              return (
                <tr key={pat._id}>
                  <td>{i+1}</td>
                  <td style={{textTransform:'capitalize'}}>{pat.patientName}</td>
                  <td>{pat.healthProblems}</td>
                  <td>{pat.createdAt}</td>
                  <td>{pat.status}</td>
                  <td><Link to={{
                    pathname:"/appointment_details",
                    params:{
                      id:pat._id
                    }
                  }}>View details</Link></td>
                </tr>
              );
            }) : ''}
          </tbody>
        </Table>
      </div>
  );
}