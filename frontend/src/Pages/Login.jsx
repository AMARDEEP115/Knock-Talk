import React from "react";
import { Button, Text, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { LoginFailure, LoginRequest, LoginSuccess } from "../Redux/AuthReducer/action";
import "./LogReg.css";

const initialData={
    name:"",
    password:""
};

const Login=()=>{
    const [data,setData]=React.useState(initialData);
    const toast = useToast();
    const Navi=useNavigate();
    const dispatch=useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(data.name==="" || data.password===""){
            toast({
                title: 'Empty Details',
                description: "Please Enter Details Correct",
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position:"top"
            });
            return Navi("/chat");
        } else {
            dispatch(LoginRequest());
            axios.post("http://localhost:8080/user/login",data).then(res=>{
                let msg=res.data.message;
                if(msg==="Login succesfully"){
                    toast({
                        title: 'Logged In.',
                        description: "Login succesfully",
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position:"top"
                    });
                    localStorage.setItem("userLog",JSON.stringify(res.data.user));
                    dispatch(LoginSuccess("loginSuccess"));
                    return Navi("/");
                } else if(msg==="Wrong Password"){
                    toast({
                        title: 'Wrong Password',
                        description: "Please enter correct password",
                        status: 'warning',
                        duration: 2000,
                        isClosable: true,
                        position:"top"
                    });
                } else if(msg==="No users found"){
                    toast({
                        title: 'Error',
                        description: "Users not found, signup first",
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position:"top"
                    });
                } else if(msg==="Something went wrong"){
                    toast({
                        title: 'Error',
                        description: "Something went wrong, please try again after 7 seconds",
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position:"top"
                    });
                };
                setData(initialData);
            }).catch(err=>dispatch(LoginFailure()));
        }
    }
    return <div>
        <div id="Form">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <Text>Name</Text>
                <input type="text" value={data.name} placeholder="Enter Name" onChange={(e)=>setData({...data,name:e.target.value})}/>
                <Text>Password</Text>
                <input type="password" value={data.password} placeholder="Enter Password" onChange={(e)=>setData({...data,password:e.target.value})}/>
                <Button type="submit" colorScheme="blue" >LOGIN</Button>
            </form>
            <Text>Don't have an account ? <Link to="/signup">Signup</Link></Text>
        </div>
    </div>
}

export default Login;