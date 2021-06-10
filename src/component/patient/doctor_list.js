import React,{useCallback,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Spinner from "../spinner/spinner";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt , faEnvelope ,faUserTie} from '@fortawesome/free-solid-svg-icons';

import {
    Button,
    Card,
    CardContent,
    Avatar,
    Typography,
    CardActions,
    makeStyles,
    Paper,
    CardActionArea,
    CardMedia,
    Divider
  } from '@material-ui/core';


import {useSelector,useDispatch} from 'react-redux';
import * as actions from "../../store/actions/pat_operation";



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

export default function Doctorlist(props) {


//   const error=useSelector(state => state.patauth.error);
  const list=useSelector(state => state.patauth.docList);
  const dispatch=useDispatch();

  const tryList = useCallback(() =>{
    dispatch(actions.getDoctorsList());
    },[dispatch]);
  useEffect(()=>{
    tryList();
  },[tryList]);

  


  const classes = useStyles();

  let loader=<Spinner />;


  return (
    <div>
    {!list ? loader :''}
        <div className="row p-2">
            {list ? list.map(doc=>{
              
                return(
                  
                    <div  className="col-sm-12 col-md-4 col-lg-3 p-4" key={doc._id}>
                      
                    <Paper elevation={3}>
                        <Card>
                        
      <CardActionArea style={{cursor:'inherit'}}>
        <CardMedia
          className={classes.media}
        >
        <Avatar 
        src={doc.image ? doc.image :''}
        variant='square' className="w-100 h-100" style={{alignSelf: 'center'}}>
        </Avatar>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{textTransform:'capitalize', textAlign:'center'}}>
           Dr. {`${doc.firstName} ${doc.lastName}`}
          </Typography>
          <Typography
          style={{textAlign:'center'}}
          color="textSecondary"
          variant="body1"
        >
          <h5 style={{textTransform:'capitalize'}}> <FontAwesomeIcon icon={faUserTie} /> {doc.speciality ? doc.speciality :''} </h5>
        </Typography>
          <Divider />
          <Typography
          color="textSecondary"
          variant="h5"
          style={{textAlign:'center',margin:'auto'}}
        >
          <h5 className='m-2'><FontAwesomeIcon icon={faPhoneAlt} /> {doc.number} </h5>
        </Typography>
          <Typography
          color="textSecondary"
          variant="h5"
          style={{textAlign:'center',margin:'auto'}}
        >
          <h5 className='m-2'><FontAwesomeIcon icon={faEnvelope} /> {doc.email} </h5>
        </Typography>
        </CardContent>
      </CardActionArea>
     
      <CardActions style={{backgroundColor:'rgb(220, 220, 220)'}}>
      <Link to={{
                pathname:'/appointment', 
                id:doc._id,
                name:doc.firstName
              }}  style={{textDecoration:'none',margin:'auto'}}>
        <Button size="medium" color="primary" >
          Make an appointment
        </Button>
        </Link>
        
      </CardActions>
    </Card>
                    </Paper>
                    </div>
                );
            }) : ''}
        </div>
    </div>
  );
}