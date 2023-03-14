import * as auth from "./actionTypes";

let authen=JSON.parse(localStorage.getItem("userLog")) || {};

const initialState={
    isLoading:false,
    isAuth:authen.name===undefined?false:true,
    isFailure:false,
};

const reducer=(state=initialState,action)=>{
    const {type}=action;
    switch(type){
        case auth.LOGINREQUEST: return {...state,isLoading:true};
        case auth.LOGINSUCCESS: return {...state,isLoading:false,isAuth:true};
        case auth.LOGINFAILURE: return {...state,isLoading:false,isFailure:true};
        case auth.LOGOUT: return {...state,isAuth:false};
        default: return state;
    }
}

export {reducer};