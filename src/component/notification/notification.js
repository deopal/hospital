import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'; import { Badge, IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

import * as docactions from "../../store/actions/doc_operation";
import * as patactions from "../../store/actions/pat_operation";

export default function Notification(props) {


    let role = props.role;
    const pat_notification = useSelector(state => state.patauth.notification);
    const doc_notification = useSelector(state => state.docauth.notification);

    const dispatch = useDispatch();

    const tryNotification = useCallback(() => {

        const uid = localStorage.getItem('userId');
        if (role === 'patient') {
            dispatch(patactions.patGetNotification(uid));
        }
        if (role === 'doctor') {
            dispatch(docactions.docGetNotification(uid));
        }
    }, [dispatch, role]);
    useEffect(() => {
        tryNotification();
    }, [tryNotification, role]);

    useEffect(() => {
        if (role === 'patient' && pat_notification) {
            setarray(pat_notification);

        }
        if (role === 'doctor' && doc_notification) {
            setarray(doc_notification);

        }

    }, [role, pat_notification, doc_notification]);

    const [array, setarray] = useState([]);

    const removeNotification = (id) => {
        const userId = localStorage.getItem('userId');
        if (role === 'doctor') {
            dispatch(docactions.removeNotification(userId, id));
        }
        if (role === 'patient') {
            dispatch(patactions.removeNotification(userId, id));
        }
    }



    return (

        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <IconButton aria-label="cart" className="mr-2">
                        <Badge badgeContent={array.length} color="secondary">
                            <NotificationsIcon fontSize="large" color="dark" {...bindTrigger(popupState)} />
                        </Badge>
                    </IconButton>

                    {array.length > 0 ?
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Box p={2}>
                                <Typography>
                                    {array.map((item, j) => (
                                        <React.Fragment>
                                            <div>
                                                <Link 
                                                style={{textDecoration:'none' , fontSize:'15px'}}
                                                to={{
                                                    pathname: "/appointment_details",
                                                    params: {
                                                        id: item.a_id
                                                    }
                                                }}><spin>{item.message}</spin></Link>
                                                <Button size="small" variant="contained" color="secondary" onClick={() => removeNotification(item.a_id)}> <DeleteForeverIcon color='action' /></Button>

                                            </div>
                                            <hr />
                                        </React.Fragment>
                                    ))}

                                </Typography>
                            </Box>
                        </Popover> : ''}
                </div>
            )}
        </PopupState>
    );
};