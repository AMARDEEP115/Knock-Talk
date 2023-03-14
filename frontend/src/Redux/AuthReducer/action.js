import axios from "axios";
import * as auth from "./actionTypes";

const LoginRequest=()=>{
    return {type:auth.LOGINREQUEST};
};

const LoginSuccess=(data)=>{
    console.log(data);
    return {type:auth.LOGINSUCCESS,payload:data};
};

const LoginFailure=()=>{
    return {type:auth.LOGINFAILURE};
};

const Logout=()=>{
    localStorage.removeItem("userLog");
    return {type:auth.LOGOUT};
};

const logingIn=(data)=>{
    return (dispatch)=>{
        dispatch(LoginRequest());
        axios.post("http://localhost:8080/user/login",data).then(res=>{
            localStorage.setItem("userLog",JSON.stringify(res.data.user));
            return dispatch(LoginSuccess(res.data.message));
        }).catch(err=>dispatch(LoginFailure()));
    }
}

export {LoginRequest,LoginSuccess,LoginFailure,Logout,logingIn};