import * as actionTypes from '../actionTypes';
import axios from 'axios';



export const authsuccess=(token,userid,username,role)=>{
    return{
        type:actionTypes.PAT_AUTH_SUCCESS,
        token:token,
        userId:userid,
        username:username,
        role:role
    };
};

export const authFail=(error)=>{
    return{
        type:actionTypes.PAT_AUTH_FAIL,
        error:error
    };
};

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expireDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    window.location.reload();
    return{
        type:actionTypes.PAT_AUTH_LOGOUT
    };
};

export const checkAuthTimeout=(expireTime)=>{
    return dispatch=>{
        setTimeout(() => {
            dispatch(logout());
        }, expireTime*1000);
    };
};

export const pat_auth_signin=(email,password,history)=>{
    return dispatch=>{
        const authData={
            email:email,
            password:password,
        };
        
       
        axios.post('https://your-hospital.herokuapp.com/api/patient/signin',authData)
        .then(response =>{
            console.log(response);
            if(response.data.error){
                alert(response.data.error);
            }
            else{
                const expirationDate= new Date(new Date().getTime() + 24*60*60*1000);
                localStorage.setItem('token',response.data.token);
                localStorage.setItem('expireDate',expirationDate);
                localStorage.setItem('userId',response.data.user._id);
                localStorage.setItem('username',response.data.user.firstName);
                localStorage.setItem('role',response.data.user.role);
                const token=localStorage.getItem('role');
                console.log(token);
                dispatch(authsuccess(response.data.token,response.data.user._id,response.data.user.fullName));
                dispatch(checkAuthTimeout(24*60*60));
                // alert(response.data.message);
                history.push("/");
            }
        })
        .catch(err=>{
            console.log(err);
            alert("something went wrong");
            // dispatch(authFail(err.response.data.error));
        });
    };
};




export const pat_auth_signup=(authData,history)=>{
    return dispatch=>{
        
        axios.post('https://your-hospital.herokuapp.com/api/patient/signup',authData)
        .then(response =>{
            console.log(response);
            if(response.data.error){
                alert(response.data.error);
            }
            else{ 
                alert(response.data.message);
                dispatch(setAuthRedirect('/patient_signin'));
                history.push("/patient_signin");
            }
        })
        .catch(err=>{
            alert(err);
            // dispatch(authFail(err.response.data.error));
        });
    };
};

export const setAuthRedirect=(path)=>{
    return{
        type:actionTypes.PAT_AUTH_REDIRECT,
        path:path
    };
};

export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expiryDate=new Date(localStorage.getItem('expireDate'));
            if(expiryDate > new Date()){
                const userId=localStorage.getItem('userId');
                const username=localStorage.getItem('username');
                const role=localStorage.getItem('role');
                dispatch(authsuccess(token,userId,username,role));
                dispatch(checkAuthTimeout((expiryDate.getTime() - new Date().getTime())/1000));
            }
            else{
                dispatch(logout());
            }
            

        }
    }
}