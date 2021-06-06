import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {NavLink} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


import {useDispatch} from 'react-redux';
import * as actions from "../../store/actions/doc_auth_action";




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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {


  // const error=useSelector(state => state.docauth.error);
  const dispatch=useDispatch();



  const [firstname,setfirstname] =useState('');
    const [lastname,setlastname] =useState('');
    const [email,setemail] =useState('');
    const [number,setnumber] =useState('');
    const [gender,setgender] =useState('');
    const [password,setpassword] =useState('');
   

    

    const Ref = React.createRef();

    const changefirstname = (event) => {
        setfirstname(event.target.value);
    }
    const changelastname = (event) => {
        setlastname(event.target.value);
    }
    const changeemail = (event) => {
        setemail(event.target.value);
    }
    const changenumber = (event) => {
        setnumber(event.target.value);
    }
    const changegender = (event) => {
        setgender(event.target.value);
    }
    const changepassword= (event) => {
      setpassword(event.target.value);
    }
 
    

  const submitHandler=(e)=>{
    e.preventDefault();
    
    const authData={
      firstName:e.target.firstName.value,
      lastName:e.target.lastName.value,
      email:e.target.email.value,
      password:e.target.password.value,
      gender:e.target.gender.value,
      number:e.target.number.value

  };
    dispatch(actions.doc_auth_signup(authData,props.history));
    
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" style={{border:'2px solid gray'}} >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <ValidatorForm className={classes.form} instantValidate={false} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                ref={Ref}
                value={firstname}
                onChange={changefirstname}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                ref={Ref}
                value={lastname}
                onChange={changelastname}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                ref={Ref}
                value={email}
                onChange={changeemail}
                validators={['required','isEmail']}
                errorMessages={['this field is required','Invalid mail']}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                id="number"
                label="Contact number"
                name="number"
                autoComplete="number"
                ref={Ref}
                onChange={changenumber}
                value={number}
                validators={['required','isNumber']}
                errorMessages={['this field is required','Invalid number']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                ref={Ref}
                onChange={changepassword}
                value={password}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/doctor_signin" variant="body2">
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}