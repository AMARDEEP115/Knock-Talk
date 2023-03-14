import * as users from "./actionTypes";

const initialState={
    isLoading:false,
    users:[],
    friends:[],
    frndRequestSent:[],
    frndRequestCame:[],
    notFriends:[],
    isFailure:false,
};

const reducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case users.USERSREQUEST: return {...state,isLoading:true};
        case users.USERSSUCCESS: return {...state,isLoading:false,users:payload[0],friends:payload[1],frndRequestSent:payload[2],frndRequestCame:payload[3],notFriends:payload[4]};
        case users.USERSFAILURE: return {...state,isLoading:false,isFailure:true};
        default: return state;
    }
}

export {reducer};