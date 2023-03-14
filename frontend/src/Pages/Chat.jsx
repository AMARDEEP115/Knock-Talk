import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {io} from "socket.io-client";
import Msg from "../Components/Msg";
import SingleFriend from "../Components/SingleFriend";
import getAllChat from "../Redux/UserChats/action";
import { IoSend } from "react-icons/io5";
import "./Chatt.css";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const Chat=({dark})=>{
    const [chatbox,setChatbox]=React.useState(false);
    const [chat,setChat]=React.useState([]);
    const [send,setSend]=React.useState("");
    const [frnd,setFrnd]=React.useState("");
    const friends=useSelector(store=>store.UserReducer.friends);
    const to=useSelector(store=>store.UserChats.to);
    const from=useSelector(store=>store.UserChats.from);
    const person=JSON.parse(localStorage.getItem("userLog"));
    const dispatch=useDispatch();
    const toast = useToast();
    const recive=person._id;
    const doChat=(x)=>{
        setFrnd(x);
        setChatbox(!chatbox);
        let allChat=[...to,...from];
        console.log(x);
        allChat=allChat.filter((el)=>el.to===x || el.from===x);
        allChat=allChat.sort((a,b)=>{
            if(a.date[2]===b.date[2]){
                if(a.date[1]===b.date[1]){
                    if(a.date[0]===b.date[0]){
                        if(a.time[0]===b.time[0]){
                            if(a.time[1]===b.time[1]){
                                return b.time[2]-a.time[2];
                            } else {
                                return a.time[1]-b.time[1];
                            }
                        } else {
                            return a.time[0]-b.time[0];
                        }
                    } else {
                        return b.date[0]-a.date[0];
                    }
                } else {
                    return b.date[1]-a.date[1];
                }
            } else {
                return b.date[2]-a.date[2];
            }
        });
        console.log("sorted allChat",allChat);
        setChat(allChat);
    }
    const stopChat=()=>{
        setFrnd("");
        setChatbox(!chatbox);
    }

    const handleSendMessage=()=>{
        console.log(send);
        setSend("");
    }
    const socket=io("http://localhost:8080/",{transports:['websocket']});
    socket.emit("userID",person._id);
    socket.on("message",(msg)=>{
        if(msg.from!==frnd){
            let tem=new Date();
            setChat([...chat,{message:msg,time:[tem.getHours(),tem.getMinutes(),tem.getSeconds()]}]);
        } else {
            let msgComming=friends.filter((el)=>el._id===msg.from);
            toast({
                title: `new mwssage from ${msgComming[0].name}`,
                status: 'info',
                duration: 2000,
                isClosable: true,
                position:"top"
            });
        }
    });
    const handleSend=()=>{
        socket.emit("message",{message:send,to:frnd,from:recive});
        axios.post("http://localhost:8080/message/send",{
            to: frnd,
            from: recive,
            message: send,
        }).then((res)=>res).catch(err=>console.log(err));
        let tem=new Date();
        setChat([...chat,{message:send,time:[tem.getHours(),tem.getMinutes(),tem.getSeconds()]}]);
    };
    socket.on("activeUsers",(activeUsers)=>{
        for(let j=0;j<friends.length;j++){
            for(let i=0;i<activeUsers.length;i++){
                if(friends[j]._id===activeUsers[i].userID){
                    document.getElementById(friends[j]._id).style.background="green.500";
                } else {
                    document.getElementById(friends[j]._id).style.background="tomato";
                }
            }
        }
    });
    
    
    useEffect(()=>{
        dispatch(getAllChat(recive));
    },[dispatch]);
    return <div id="ChatKT">
        <div>
            {friends.map((el,index)=><SingleFriend key={index} name={el.name} photo={el.photo} email={el.email} isActive={el.isActive} mobile={el.mobile} dark={dark} doChat={doChat} stopChat={stopChat} ID={el._id} frnd={frnd}/>)}
        </div>
        {chatbox && <div id="SecondChat">
            <div>
                {chat.map((el,index)=><Msg key={index} side={el.to===frnd?"right":"left"} msg={el.message} time={`${el.time[0]}:${el.time[1]}`}/>)}
            </div>
            <div id="ThirdChat">
                <input type="text" value={send} placeholder="Message" onChange={(e)=>setSend(e.target.value)}/>
                <div onClick={handleSend}><IoSend size="30px" color="teal" onClick={handleSendMessage}/></div>
            </div>
            </div>}
    </div>
}

export default Chat;