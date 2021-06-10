import React, { useEffect, useState, useCallback } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import * as actions from "../../store/actions/pat_profile_actions";
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../firebase';
import Spinner from "../spinner/spinner";


import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Avatar,
  Typography,
  CardActions
} from '@material-ui/core';




export default function PatProfile() {
  // const id=localStorage.getItem('userId');
  const user = useSelector(state => state.patauth.profile);

  const dispatch = useDispatch();

  const tryProfile = useCallback(() => {
    const uid = localStorage.getItem('userId');
    dispatch(actions.patGetProfile(uid));
  }, [dispatch]);
  useEffect(() => {
    tryProfile();
  }, [tryProfile]);

  useEffect(() => {
    if (user) {
      setfirstname(user.firstName);
      setlastname(user.lastName);
      setemail(user.email);
      setnumber(user.number);
      setcountry(user.country);
      setstate(user.state);
      setaddress(user.address);
      setpincode(user.pincode);
    }
  }, [user]);











  const [firstname, setfirstname] = useState(user ? user.firstName : '');
  const [lastname, setlastname] = useState(user ? user.lastName : '');
  const [email, setemail] = useState(user ? user.email : '');
  const [number, setnumber] = useState(user ? user.number : '');
  const [state, setstate] = useState(user ? user.state : '');
  const [country, setcountry] = useState(user ? user.country : '');
  const [address, setaddress] = useState(user ? user.address : '');
  const [pincode, setpincode] = useState(user ? user.pincode : '');
  const [load, setload] = useState(false);



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
  const changestate = (event) => {
    setstate(event.target.value);
  }
  const changecountry = (event) => {
    setcountry(event.target.value);
  }
  const changepincode = (event) => {
    setpincode(event.target.value);
  }
  const changeaddress = (event) => {
    setaddress(event.target.value);
  }




  const handleSubmit = () => {
    const newUser = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      number: number,
      state: state,
      country: country,
      address: address,
      pincode: pincode,

    }
    dispatch(actions.patEditProfile({ newUser }));
  }


  const hiddenFileInput = React.useRef();

  let loading=<h5 style={{color:'red' ,margin:'auto'}}>...Uploading</h5>;

  const uploadImage = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const pat_id=localStorage.getItem('userId');
    const file = event.target.files[0];
    console.log(file);

    const uploadTask = firebase.storage().ref().child(`files/${pat_id}/${file.name}`).put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (snapshot.state === firebase.storage.TaskState.RUNNING) {
          setload(true);
          console.log(`Progress: ${progress}%`);
        }
      },
      error => console.log(error.code),
      async () => {
        const imageURL = await uploadTask.snapshot.ref.getDownloadURL();
        console.log(imageURL);
        
        dispatch(actions.uploadImage(imageURL));
        setload(false);
      }
    );



  };


let loader = <Spinner />;




  return (
    <div>
    {!user ? loader :
    <div className="row m-2">
    
      <div className="col-sm-12 col-md-5 col-lg-5 ">
        <Card >
          <CardContent>
            <Box
              style={{
                margin: 'auto',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {user ? user.image ? 
                <Avatar
                  src={user.image}
                  style={{
                    height: 100,
                    width: 100,
                    marginBottom: '10px'
                  }}
                /> : 
                <Avatar
                  src=""
                  style={{
                    height: 100,
                    width: 100,
                    marginBottom: '10px'
                  }}
                /> :
                <Avatar
                  src=""
                  style={{
                    height: 100,
                    width: 100,
                    marginBottom: '10px'
                  }}
                /> }
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h5"
                style={{ textTransform: 'capitalize',margin:'auto' }}
              >
                {`${user ? user.firstName : ''} ${user ? user.lastName : ''}`}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body1"
                style={{margin:'auto'}}
              >
                {`${user ? user.address ? user.address : '' : ''} ${user ? user.pincode ? user.pincode : '' : ''}`}

              </Typography>
              <Typography
                color="textSecondary"
                variant="body1"
                style={{margin:'auto'}}
              >
                {`${user ? user.state ? user.state : '' : ''} ${user ? user.country ? user.country : '' : ''}`}
              </Typography>

              
        <Typography
          color="textSecondary"
          className="row"
          variant="body1"
         
        >       
                    <h5  style={{textAlign:'center' ,margin:'auto'}} className='m-2'><FontAwesomeIcon icon={faPhoneAlt} /> {user ? user.number : ''} </h5>
                    <h5  style={{textAlign:'center' ,margin:'auto'}} className='m-2' ><FontAwesomeIcon icon={faEnvelope} /> {user ? user.email : ''} </h5>

        </Typography>


              {/* <Typography
                className="row"
                color="textSecondary"
                variant="body1"
                style={{margin:'auto'}}
              >
                <h5 className='m-2'><FontAwesomeIcon icon={faEnvelope} /> {user ? user.email : ''} </h5>
              </Typography> */}
            </Box>
          </CardContent>
          <Divider />
          <CardActions >

          {!load ? 
          <React.Fragment>
            <Button
              onClick={uploadImage}
              color="primary"
              fullWidth
              variant="text"
            >
              Upload picture
      </Button>
            <input type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: 'none' }}
            />
            </React.Fragment> : loading}
            

          </CardActions>
        </Card>
      </div>
      <div className="col-sm-12 col-md-7 col-lg-7 ">
        <ValidatorForm
          onSubmit={handleSubmit}
          instantValidate={false}
        >
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextValidator
                    ref={Ref}
                    onChange={changefirstname}
                    fullWidth
                    label="First name"
                    name="firstName"
                    value={firstname}
                    variant="outlined"
                    validators={['required']}
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
                    label="Last name"
                    name="lastname"
                    value={lastname}
                    variant="outlined"
                    validators={['required']}
                    ref={Ref}
                    onChange={changelastname}
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
                    label="Email Address"
                    name="email"
                    value={email}
                    variant="outlined"
                    ref={Ref}
                    onChange={changeemail}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextValidator
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={number}
                    type="number"
                    variant="outlined"
                    ref={Ref}
                    onChange={changenumber}
                    validators={['required', 'isNumber']}
                    errorMessages={['this field is required', 'invalid number']}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextValidator
                    fullWidth
                    label="Country"
                    name="country"
                    value={country}
                    variant="outlined"
                    ref={Ref}
                    onChange={changecountry}
                    validators={['required']}
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
                    label="State"
                    name="state"
                    value={state}
                    variant="outlined"
                    ref={Ref}
                    onChange={changestate}
                    validators={['required']}
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
                    multiline
                    label="Address"
                    name="address"
                    value={address}
                    variant="outlined"
                    ref={Ref}
                    onChange={changeaddress}
                    validators={['required']}
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
                    label="pincode"
                    name="pincode"
                    type="number"
                    value={pincode}
                    variant="outlined"
                    ref={Ref}
                    onChange={changepincode}
                    validators={['required', 'isNumber']}
                    errorMessages={['this field is required', 'Invalid pincode']}
                  />

                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 4
              }}
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
              >
                Save details
          </Button>
            </Box>
          </Card>
        </ValidatorForm>
      </div>
    </div> }
    </div>
  );
};










