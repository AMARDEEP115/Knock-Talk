import { Button, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import "./SingleUserrr.css";

const SingleUserSent = ({ photo, name, to, from, makeUserRequest }) => {
    const toast = useToast();

    const handleFrndRqst = (e) => {
        axios.post("http://localhost:8080/user/canclefriendrequest", { to: to, from: from }).then((res) => {
            toast({
                title: 'Friend Request Cancled',
                // description: "Friend Request Candled",
                status: 'info',
                duration: 2000,
                isClosable: true,
                position: "top-right"
            });
            makeUserRequest();
        }).catch(err => console.log(err));
    };
    return <div id="Single">
        <img src={photo} alt={name} />
        <div>
            <Text>{name}</Text>
            <Button border="3px solid teal" color="teal" backgroundColor="transparent" onClick={(e) => handleFrndRqst(e)}>Cancle Request</Button>
        </div>
    </div>
}

export default SingleUserSent;