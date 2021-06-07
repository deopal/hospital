import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import "./appointment.css";
import * as actions from "../../store/actions/pat_operation";

import {useDispatch} from 'react-redux';

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    MenuItem
  } from '@material-ui/core';

export default function Appointment(props){

    const dispatch=useDispatch();

    const doc_id=props.location.id;
    const doc_name=props.location.name;
    // console.log(doc_id);
    const pat_id=localStorage.getItem('userId');

    const [name,setname]=useState('');
    const [age,setage]=useState('');
    const [number,setnumber]=useState('');
    const [gender,setgender]=useState('');
    const [aadhar,setaadhar]=useState('');
    const [problem,setproblem]=useState('');
    const [record,setrecord]=useState('');


    const changename=(e)=>{
        setname(e.target.value);
    }
    const changenumber=(e)=>{
        setnumber(e.target.value);
    }
    const changeaadhar=(e)=>{
        setaadhar(e.target.value);
    }
    const changeage=(e)=>{
        setage(e.target.value);
    }
    const changegender=(e)=>{
        setgender(e.target.value);
    }
    const changeproblem=(e)=>{
        setproblem(e.target.value);
    }
    const changerecord=(e)=>{
        setrecord(e.target.value);
    }


    const Ref = React.createRef();


    const handleSubmit=(e)=>{
        const patient={
            doctorId:doc_id,
            patientId:pat_id,
            patientName:name,
            doctorName:doc_name,
            age:age,
            adharNumber:aadhar,
            gender:gender,
            number:number,
            healthProblems:problem,
            previousRecods:record
        }

        dispatch(actions.make_appointment(patient,props.history));

    }



    return(

      
        
        <div className=" bg ">
          {pat_id ? doc_id ?
            <div className="row main p-4 m-0">
                <div className="col-sm-12 col-lg-7 p-4 slot" >
                <h2>Book You Slot Now and Save your time</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis at lacus at rhoncus. Integer pharetra lacus vitae sapien blandit eleifend. </p>
    <h2>For Help Call : +189-123-453</h2>
    
                </div>
                <div className=" col-sm-12 col-lg-5 p-2">
    <ValidatorForm
    onSubmit={handleSubmit}
    instantValidate={false}
  >
    <Card>
      <CardHeader
        
        title="Make an appointment"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
          >
            <TextValidator
            ref={Ref}
            onChange={changename}
              fullWidth
              label="Patient name"
              name="name"
              value={name}
              variant="outlined"
              validators={['required']}
              errorMessages={['this field is required']}
            />
            
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextValidator
              fullWidth
              label="Aadhar number"
              name="aadhar"
              value={aadhar}
              variant="outlined"
              validators={['required']}
              ref={Ref}
              onChange={changeaadhar}
              errorMessages={['this field is required']}
            />

          </Grid>
          
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextValidator
             fullWidth
              label="Age"
              name="age"
              value={age}
              type="number"
              variant="outlined"
              ref={Ref}
              onChange={changeage}
              validators={['required', 'isNumber']}
              errorMessages={['this field is required','invalid input']}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextValidator
                variant="outlined"
                fullWidth
                select
                id="gender"
                label="Gender"
                name="gender"
                autoComplete="gender"
                ref={Ref}
                onChange={changegender}
                value={gender}
                validators={['required']}
                errorMessages={['this field is required']}
              >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            
               </TextValidator> 
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextValidator
              fullWidth
              label="Contact number"
              name="number"
              type="number"
              value={number}
              variant="outlined"
              ref={Ref}
              onChange={changenumber}
              validators={['required','isNumber']}
              errorMessages={['this field is required','Invalid number']}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextValidator
              fullWidth
              multiline
              label="Health problems"
              name="problem"
              value={problem}             
              variant="outlined"
              ref={Ref}
              onChange={changeproblem}
              validators={['required']}
              errorMessages={['this field is required']}
            />
              
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextValidator
              fullWidth
              multiline
              label="Previous records(if any)"
              name="record"   
              value={record}             
              variant="outlined"
              ref={Ref}
              onChange={changerecord}
            />
              
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p:4
        }}
      >
        <Button
         type="submit"
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </Box>
    </Card>
  </ValidatorForm>
  </div>
  </div> : <Redirect to='doctors' /> : <Redirect to='patient_signin' />}
  </div>
    );
}