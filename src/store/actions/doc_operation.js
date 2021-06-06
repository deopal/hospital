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
        axios.get(`/api/doctor/getpatientList/${doc_id}`)
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

export const approveAppointment=(id)=>{
    return dispatch=>{
        axios.post(`/api/doctor/approveAppointments/${id}`)
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
        date:new Date()
    };
    return dispatch=>{
        axios.post(`/api/doctor/addReviews/${id}`,{review})
        .then(res=>{
            if(res.data.error){
                alert(res.data.error);
            }
            else{
                console.log(res.data);
                alert(res.data.message);
                dispatch(setAppointment(res.data.appointment));
            }
        })
    }
}

// export const getPatientListbyId=(id)=>{
//     return dispatch=>{
//         axios.get(`/api/dctor/patientByid/${id}`)
//         .then(res=>{
//             if(res.data.error){
//                 console.log(res.data.error);
//                 alert(res.data.error);
//             }
//             else{
//             const list=res.data;
//             console.log(list);
//             dispatch(setPatientList(list));}
//         })
//         .catch(err=>{
//             alert("something went wrong");
//             console.log(err);
//         })
//     }
// }
