import React,{useCallback,useEffect} from 'react';
import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt , faEnvelope ,faUserTie} from '@fortawesome/free-solid-svg-icons';

import {
    Button,
    Card,
    CardContent,
    Image,
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


  return (
    <div>
        <div className="row p-2">
            {list ? list.map(doc=>{
              
                return(
                  
                    <div  className="col-sm-12 col-md-4 col-lg-3 p-4" key={doc._id}>
                      
                    <Paper elevation={3}>
                        <Card>
                        
      <CardActionArea>
        <CardMedia
          className={classes.media}
        >{doc.image ? '' 
        : <Avatar variant='square' className="w-100 h-100" style={{alignSelf: 'center'}}>
        </Avatar>}
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
          className="row"
          color="textSecondary"
          variant="body1"
        >
          <h5 className='m-2'><FontAwesomeIcon icon={faPhoneAlt} /> {doc.number} </h5>
          <h5 className='m-2'><FontAwesomeIcon icon={faEnvelope} /> {doc.email} </h5>
        </Typography>
        </CardContent>
      </CardActionArea>
     
      <CardActions>
      <Link to={{
                pathname:'/appointment', 
                id:doc._id
              }}  style={{textDecoration:'none'}}>
        <Button size="small" color="primary">
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