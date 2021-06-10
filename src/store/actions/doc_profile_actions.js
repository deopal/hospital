import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const docSetProfile=(profile)=>{
    localStorage.setItem('username',profile.firstName);
    return{
    type:actionTypes.DOC_SET_PROFILE,
    profile:profile
    }
}

export const docGetProfile=(id)=>{
    const doc_id=id;

    return dispatch=>{
     
    axios.get(`https://your-hospital.herokuapp.com/api/doctor/doctorSetting/${doc_id}` 
    ).then(res=>{
        console.log(res);
        const profile=res.data;
        console.log(profile);
        dispatch(docSetProfile(profile));
    }).catch(err=>{
        console.log(err);
        // alert("something went wrong");
    });
}
}


export const docEditProfile=(profile)=>{
    return dispatch=>{
    const settings=profile.newUser;
    const user=localStorage.getItem('userId');
    console.log(settings);
    dispatch(docSetProfile(settings));
    axios.post(`https://your-hospital.herokuapp.com/api/doctor/updateDoctorSettings/${user}`,{settings}
    ).then(res=>{
        alert("Profile updated successfully");
    }).catch(err=>{
        console.log(err);
        alert("something went wrong");
    });
};
}

export const uploadImage=(image)=>{
    const id=localStorage.getItem('userId');
    return dispatch=>{
        axios.post(`https://your-hospital.herokuapp.com/api/doctor/image/${id}`,{image}
    ).then(res=>{
        console.log(res.data);
        dispatch(docSetProfile(res.data.doctor));
        // alert("Profile updated successfully");
    }).catch(err=>{
        console.log(err);
        alert("something went wrong");
    });
    }
}