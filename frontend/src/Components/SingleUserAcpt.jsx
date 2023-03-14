import { Button, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import "./SingleUserrr.css";

const SingleUserAcpt=({photo,name,to,from,makeUserRequest})=>{
    const toast = useToast();

    const handleFrndRqstAcpt=(e)=>{
        axios.post("http://localhost:8080/user/acceptfriend",{user:from,from:to}).then((res)=>{
            makeUserRequest();
            toast({
                title: "Friend Requested Accepted",
                status: 'info',
                duration: 2000,
                isClosable: true,
                position:"top-right"
            });
        }).catch(err=>{
            toast({
                title: "Something went wrong",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:"top-right"
            })
        });
    };
    const handleFrndRqstRemv=(e)=>{
        axios.post("http://localhost:8080/user/canclefriendrequest",{to:from,from:to}).then((res)=>{
            makeUserRequest();
            toast({
                title: "Cancled Friend Requested",
                status: 'info',
                duration: 2000,
                isClosable: true,
                position:"top-right"
            });
        }).catch(err=>{
            toast({
                title: "Something went wrong",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:"top-right"
            })
        });
    };

    return <div id="Single">
        <img src={photo} alt={name}/>
        <div>
            <Text>{name}</Text>
            <div>
                <Button border="3px solid teal" color="teal" backgroundColor="transparent" onClick={(e)=>handleFrndRqstAcpt(e)}>Accept</Button>
                <Button border="3px solid teal" color="teal" backgroundColor="transparent" onClick={(e)=>handleFrndRqstRemv(e)}>Remove</Button>
            </div>
        </div>
    </div>
}

export default SingleUserAcpt;