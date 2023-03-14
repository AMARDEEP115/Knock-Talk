import React from "react";
import { Button, Text, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "./LogReg.css";
import axios from "axios";

const initialData = {
    name: "",
    email: "",
    mobile: "",
    photo: "",
    password: "",
};

const Register = () => {
    const [data, setData] = React.useState(initialData);
    const toast = useToast();
    const Navi=useNavigate();

    const handleSubmit = (e) => {
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
        } else {
            axios.post("http://localhost:8080/user/register",data).then(res=>{
                let msg=res.data.message;
                if(msg==="Register Succesfully"){
                    toast({
                        title: 'Account created.',
                        description: "We've created your account for you.",
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position:"top"
                    });
                    return Navi("/login");
                } else if(msg==="User already present"){
                    toast({
                        title: 'Account alredy pressent',
                        description: "Already a user is present with this name or email, please register with another name or email",
                        status: 'warning',
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
                }
                setData(initialData);
            }).catch(err=>console.log(err));
        }
    }
    return <div>
        <div id="Form">
            <form onSubmit={(e) => handleSubmit(e)}>
                <Text>Name</Text>
                <input type="text" value={data.name} placeholder="Enter Name" onChange={(e)=>setData({...data,name:e.target.value})}/>
                <Text>Email<span>(optional)</span></Text>
                <input type="email" value={data.email} placeholder="Enter Email" onChange={(e)=>setData({...data,email:e.target.value})}/>
                <Text>Mobile<span>(optional)</span></Text>
                <input type="number" value={data.mobile} placeholder="Enter Mobile" onChange={(e)=>setData({...data,mobile:e.target.value})}/>
                <Text>Photo<span>(optional)</span></Text>
                <input type="text" value={data.photo} placeholder="Enter Photo" onChange={(e)=>setData({...data,photo:e.target.value})}/>
                <Text>Password</Text>
                <input type="password" value={data.password} placeholder="Enter Password" onChange={(e)=>setData({...data,password:e.target.value})}/>
                <Button type="submit" colorScheme="blue">Signup</Button>
            </form>
            <Text>Have an account ? <Link to="/login">Login</Link></Text>
        </div>
    </div>
}

export default Register;