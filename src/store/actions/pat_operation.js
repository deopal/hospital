import * as actionTypes from '../actionTypes';
import axios from 'axios';


export const make_appointment=(patient,history)=>{


    const pat=patient;
    axios.post("/api/patient/makeAppointment",{...pat})
    .then(res=>{
        if(res.data.error){
            console.log(res.data.error);
            alert(res.data.error);
        }
        else{
            alert(res.data.message);
            history.push("/");
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
        axios.get("/api/patient/doctorPresent")
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
        axios.get(`/api/patient/allAppointments/${pat_id}`)
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
        axios.get(`/api/patient/AppointmentById/${a_id}`)
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
        axios.get(`/api/patient/doctorByid/${id}`)
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
            alert("something went wrong");
            console.log(err);
        })
    }
}


export const endAppointment=(id)=>{
    return dispatch=>{
        axios.post(`/api/patient/completeAppointment/${id}`)
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
    axios.post("/api/patient/contact",{...contact})
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

