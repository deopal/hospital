import * as actionTypes from "../actionTypes";

const initialState={
    token:null,
    userId:null,
    error:null,
    profile:null,
    username:null,
    role:null,
    docList:null,
    appointment:null,
    notification:null,
    authRedirect:'/'
}

const patAuthSuccess=(state,action)=>{
    return{
        ...state,
        token:action.token,
        userId:action.userId,
        username:action.username,
        role:action.role,
        error:null
    }
};

const patAuthFail=(state,action)=>{
    return{
        ...state,
        error:action.error

    };
}

const patAuthLogout=(state,action)=>{
    return{
        ...state,
        error:null,
        token:null,
        userId:null,
        username:null,
        role:null
    }
}

const patAuthRedirect=(state,action)=>{
    return{
        ...state,
        authRedirect:action.path

    }
}

const patSetProfile=(state,action)=>{
    return{
        ...state,
        profile:action.profile,
        username:action.profile.firstName
    }
}


 const patSetDoctorlist=(state,action)=>{
    return{
        ...state,
        docList:action.docList
    }
};

const patSetAppointment=(state,action)=>{
    return{
        ...state,
        appointment:action.appointment
    }
}
const patSetNotification=(state,action)=>{
    return{
        ...state,
        notification:action.notification
    }
}

const reducer=(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.PAT_AUTH_SUCCESS: return patAuthSuccess(state,action);
        case actionTypes.PAT_AUTH_FAIL: return patAuthFail(state,action);
        case actionTypes.PAT_AUTH_LOGOUT: return patAuthLogout(state,action);
        case actionTypes.PAT_AUTH_REDIRECT: return patAuthRedirect(state,action);
        case actionTypes.PAT_SET_PROFILE: return patSetProfile(state,action);
        case actionTypes.PAT_GET_DOCTORLIST: return patSetDoctorlist(state,action);
        case actionTypes.PAT_GET_APPOINTMENT: return patSetAppointment(state,action);
        case actionTypes.PAT_SET_NOTIFICATION: return patSetNotification(state,action);
        default: return state;
    }
};


export default reducer;

