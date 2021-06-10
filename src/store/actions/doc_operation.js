import * as actionTypes from '../actionTypes';
import axios from 'axios';



export const setPatientList=(list)=>{
    return{
        type:actionTypes.DOC_SET_PATIENTLIST,
        patientList:list
    };
};





export const getpatientList=(id)=>{
    return dispatch=>{
        const doc_id=id;
        console.log(doc_id);
        axios.get(`https://your-hospital.herokuapp.com/api/doctor/getpatientList/${doc_id}`)
        .then(res=>{
            console.log(res.data);
            dispatch(setPatientList(res.data));
        })
        .catch(err=>{
            alert(err);
            console.log(err);
        });
    }
};

export const setAppointment=(list)=>{
    return{
        type:actionTypes.DOC_GET_APPOINTMENT,
        appointment:list
    };
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

export const approveAppointment=(id,pat_id)=>{
    const patientId=pat_id;
    return dispatch=>{
        axios.post(`https://your-hospital.herokuapp.com/api/doctor/approveAppointments/${id}`,{patientId})
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

export const addReview=(id,reviews)=>{
    const review={
        detail:reviews,
        date:new Date().toLocaleString('en-IN').split(',')[0]
    };
    return dispatch=>{
        axios.post(`https://your-hospital.herokuapp.com/api/doctor/addReviews/${id}`,{review})
        .then(res=>{
            if(res.data.error){
                alert(res.data.error);
            }
            else{
                console.log(res.data);
                dispatch(setAppointment(res.data.appointment));
            }
        })
    }
};


export const contactUs=(contact)=>{
    return dispatch=>{
    axios.post("https://your-hospital.herokuapp.com/api/doctor/contact",{...contact})
    .then(res=>{
        console.log(res.data);
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

export const docSetNotification=(note)=>{
    return{
        type:actionTypes.DOC_SET_NOTIFICATION,
        notification:note
    }; 
}
export const docGetNotification=(id)=>{
    return dispatch=>{
        axios.get(`https://your-hospital.herokuapp.com/api/doctor/getNotification/${id}`)
        .then(res=>{
            console.log(res.data);
            dispatch(docSetNotification(res.data));
        })
        .catch(err=>{
            console.log(err);
        });
    }
}

export const removeNotification=(userId,a_id)=>{
    const doctorId=userId;
    const appointmentId=a_id;
    return dispatch=>{
        axios.post(`https://your-hospital.herokuapp.com/api/doctor/removeNotification`,{doctorId,appointmentId})
        .then(res=>{
            dispatch(docSetNotification(res.data.notification));
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
}




