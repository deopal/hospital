import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const patSetProfile=(profile)=>{
    return{
    type:actionTypes.PAT_SET_PROFILE,
    profile:profile
    }
}

export const patGetProfile=(id)=>{
    const doc_id=id;

    return dispatch=>{
     
    axios.get(`https://your-hospital.herokuapp.com/api/patient/patientSetting/${doc_id}` 
    ).then(res=>{
        
        const profile=res.data;
        console.log(profile);
        dispatch(patSetProfile(profile));
    }).catch(err=>{
        alert("something went wrong");
        console.log(err);
        // alert("something went wrong");
    });
}
}


export const patEditProfile=(profile)=>{
    return dispatch=>{
    const settings=profile.newUser;
    const user=localStorage.getItem('userId');
    console.log(settings);
    dispatch(patSetProfile(settings));
    axios.post(`https://your-hospital.herokuapp.com/api/patient/updateSettings/${user}`,{settings}
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
        axios.post(`https://your-hospital.herokuapp.com/api/patient/image/${id}`,{image}
    ).then(res=>{
        console.log(res.data);
        dispatch(patSetProfile(res.data.patient));
        alert("Profile picture updated successfully");
    }).catch(err=>{
        console.log(err);
        alert("something went wrong");
    });
    }
}