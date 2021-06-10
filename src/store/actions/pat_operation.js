import * as actionTypes from '../actionTypes';
import axios from 'axios';


export const make_appointment=(patient,history)=>{


    const pat=patient;
    console.log(patient);
    axios.post("https://your-hospital.herokuapp.com/api/patient/makeAppointment",{...pat})
    .then(res=>{
        if(res.data.error){
            console.log(res.data.error);
            alert(res.data.error);
        }
        else{
            alert(res.data.message);
            history.push("/my-appointment");
        }
    }).catch(err=>{
        console.log(err);
    });

}


export const setDoctorsList=(list)=>{
    return{
        type:actionTypes.PAT_GET_DOCTORLIST,
        docList:list
    };
};


export const getDoctorsList=()=>{
    return dispatch=>{
        axios.get("https://your-hospital.herokuapp.com/api/patient/doctorPresent")
        .then(res=>{
            if(res.data.error){
                console.log(res.data.error);
                alert(res.data.error);
            }
            else{
            const list=res.data.doctorList;
            console.log(list);
            dispatch(setDoctorsList(list));}
        })
        .catch(err=>{
            alert("something went wrong");
            console.log(err);
        })
    }
};

export const setAppointment=(list)=>{
    return{
        type:actionTypes.PAT_GET_APPOINTMENT,
        appointment:list
    };
};





export const getappointment=(id)=>{
    return dispatch=>{
        const pat_id=id;
        console.log(pat_id);
        axios.get(`https://your-hospital.herokuapp.com/api/patient/allAppointments/${pat_id}`)
        .then(res=>{
            console.log(res.data);
            dispatch(setAppointment(res.data));
        })
        .catch(err=>{
            alert(err);
            console.log(err);
        });
    }
};

export const getappointmentbyId=(id)=>{
    return dispatch=>{
        const a_id=id;
        axios.get(`https://your-hospital.herokuapp.com/api/patient/AppointmentById/${a_id}`)
        .then(res=>{
            console.log(res.data);
            dispatch(setAppointment(res.data));
        })
        .catch(err=>{
            alert(err);
            console.log(err);
        });
    }
}

export const getDoctorsListbyId=(id)=>{
    return dispatch=>{
        axios.get(`https://your-hospital.herokuapp.com/api/patient/doctorByid/${id}`)
        .then(res=>{
            if(res.data.error){
                console.log(res.data.error);
                
            }
            else{
            const list=res.data;
            console.log(list);
            dispatch(setDoctorsList(list));}
        })
        .catch(err=>{
            // alert("something went wrong");
            console.log(err);
        })
    }
}


export const endAppointment=(id)=>{
    return dispatch=>{
        axios.post(`https://your-hospital.herokuapp.com/api/patient/completeAppointment/${id}`)
        .then(res=>{
            if(res.data.error){
                console.log(res.data.error);
            }
            else{
                console.log(res.data);
                alert(res.data.message);
                dispatch(setAppointment(res.data.appointment));
            }
        })
    }
};

export const contactUs=(contact)=>{
    return dispatch=>{
    axios.post("https://your-hospital.herokuapp.com/api/patient/contact",{...contact})
    .then(res=>{
        if(res.data.error){
            console.log(res.data.error);
        alert(res.data.error);
        }
        else{
        console.log(res.data);
        alert(res.data.message);
        }
        
    })
    .catch(err=>{
        console.log(err);
        alert(err);
    })
}
};

export const patSetNotification=(note)=>{
    return{
        type:actionTypes.PAT_SET_NOTIFICATION,
        notification:note
    }; 
}
export const patGetNotification=(id)=>{
    return dispatch=>{
        axios.get(`https://your-hospital.herokuapp.com/api/patient/getNotification/${id}`)
        .then(res=>{
            console.log(res.data);
            dispatch(patSetNotification(res.data));
        })
        .catch(err=>{
            console.log(err);
        });
    }
};

export const removeNotification=(userId,a_id)=>{
    const patientId=userId;
    const appointmentId=a_id;
    return dispatch=>{
        axios.post(`https://your-hospital.herokuapp.com/api/patient/removeNotification`,{patientId,appointmentId})
        .then(res=>{
            dispatch(patSetNotification(res.data.notification));
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

