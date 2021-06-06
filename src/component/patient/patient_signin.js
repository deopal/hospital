import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import {NavLink} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


import {useSelector,useDispatch} from 'react-redux';
import * as actions from "../../store/actions/pat_auth_action";



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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {


  const error=useSelector(state => state.patauth.error);
  const dispatch=useDispatch();

  const Ref = React.createRef();


  const [email,setemail] =useState('');
  const [password,setpassword] =useState('');

  const changeemail = (event) => {
    setemail(event.target.value);
}

const changepassword = (event) => {
  setpassword(event.target.value);
}

  const submitHandler=(e)=>{
    e.preventDefault();
    var email=e.target.email.value;
    var password=e.target.password.value;
    // console.log(email);
    dispatch(actions.pat_auth_signin(email,password,props.history));
  }

  

  const classes = useStyles();

  let err=null;
  if(error!=null){
    err=error;
  }

  return (
    <Container component="main" maxWidth="xs" style={{border:'2px solid gray'}} >
      <h2>{err}</h2>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <ValidatorForm className={classes.form} instantValidate={false} onSubmit={submitHandler}>
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            ref={Ref}
            value={email}
            onChange={changeemail}
            validators={['required','isEmail']}
            errorMessages={['this field is required','Invalid mail']}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            ref={Ref}
            value={password}
            onChange={changepassword}
            validators={['required']}
            errorMessages={['this field is required']}
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink to="#" variant="body2">
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/patient_signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}