import { Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { BsWechat } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getUsers } from "../Redux/UsersReducer/action";
import "./Homee.css";

const Home=()=>{
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getUsers());
    },[dispatch]);
    return <div id="Home">
        <Text>Welcome to</Text>
        <Heading>Knock Talk ! <BsWechat/></Heading>
    </div>
}

export default Home;