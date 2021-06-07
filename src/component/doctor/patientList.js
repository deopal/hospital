import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';


import {Table} from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../../store/actions/doc_operation";





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
            }) : '' }
          </tbody>
        </Table>
      </div>
  );
}