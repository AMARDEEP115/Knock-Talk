import { Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleUserAcpt from "../Components/SingleUserAcpt";
import SingleUserAdd from "../Components/SingleUserAdd";
import SingleUserSent from "../Components/SingleUserSent";
import { getUsers } from "../Redux/UsersReducer/action";

const styling={
    border:"3px solid teal",
    borderRadius:"10px",
    padding:"20px",
    margin:"auto",
    marginTop:"15px",
    width:"99%"
}

const Users=()=>{
    const [xy,setXy]=React.useState(0);
    const dispatch=useDispatch();
    const person=JSON.parse(localStorage.getItem("userLog")) || {};
    // let users=useSelector(store=>store.UserReducer.users);
    let frndRequestSent=useSelector(store=>store.UserReducer.frndRequestSent);
    let frndRequestCame=useSelector(store=>store.UserReducer.frndRequestCame);
    let notFriends=useSelector(store=>store.UserReducer.notFriends);    
    let loading=useSelector(store=>store.UserReducer.isLoading);
    const makeUserRequest=()=>{
        setXy(pre=>pre+1);
    }
    useEffect(()=>{
        dispatch(getUsers());
    },[xy,dispatch]);
    return <div style={{paddingBottom:"20px"}}>
        {loading && <img style={{display:"block",margin:"auto",width:"30vw",marginTop:"30vh"}} src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700" alt="loading"/>}
        {frndRequestSent.length===0 && frndRequestCame.length===0 && notFriends.length===0 && <Heading color="teal" mt="20vh">No New Users Found...<img src="https://i.gifer.com/9TFY.gif" style={{display:"block",margin:"auto"}} alt="ufo"/></Heading>}
        {frndRequestCame.length>0 && <div style={styling}>
            <Text color="teal" textAlign="left">Friend Requests</Text>
            <hr/>
            {frndRequestCame.map((el,index)=><SingleUserAcpt key={index} photo={el.photo} name={el.name} to={el._id} from={person._id} makeUserRequest={makeUserRequest}/>)}
        </div>}
        {frndRequestSent.length>0 && <div style={styling}>
            <Text color="teal" textAlign="left">Requested Friends</Text>
            <hr/>
            {frndRequestSent.map((el,index)=><SingleUserSent key={index} photo={el.photo} name={el.name} to={el._id} from={person._id} makeUserRequest={makeUserRequest}/>)}
        </div>}
        {notFriends.length>0 && <div style={styling}>
            <Text color="teal" textAlign="left">New People</Text>
            <hr/>
            {notFriends.map((el,index)=><SingleUserAdd key={index} photo={el.photo} name={el.name} to={el._id} from={person._id} makeUserRequest={makeUserRequest}/>)}
        </div>}
    </div>
}

export default Users;