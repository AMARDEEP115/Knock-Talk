import axios from "axios";
import * as chat from "./actionTypes";

const ChatRequest=()=>{
    return {type:chat.CHATREQUEST};
}

const ChatSuccess=(data)=>{
    return {type:chat.CHATSUCCESS,payload:data};
}

const ChatFailure=()=>{
    return {type:chat.CHATFAILURE};
}

const getAllChat=(id)=>{
    return (dispatch)=>{
        dispatch(ChatRequest());
        axios.get(`http://localhost:8080/message/allmsg/${id}`).then(res=>{
            let to=res.data.to;
            let from=res.data.from;
            console.log(to,from);
            to=to.sort((a,b)=>{
                if(a.date[2]===b.date[2]){
                    if(a.date[1]===b.date[1]){
                        if(a.date[0]===b.date[0]){
                            if(a.time[0]===b.time[0]){
                                if(a.time[1]===b.time[1]){
                                    return b.time[2]-a.time[2];
                                } else {
                                    return b.time[1]-a.time[1];
                                }
                            } else {
                                return b.time[0]-a.time[0];
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
            from=from.sort((a,b)=>{
                if(a.date[2]===b.date[2]){
                    if(a.date[1]===b.date[1]){
                        if(a.date[0]===b.date[0]){
                            if(a.time[0]===b.time[0]){
                                if(a.time[1]===b.time[1]){
                                    return b.time[2]-a.time[2];
                                } else {
                                    return b.time[1]-a.time[1];
                                }
                            } else {
                                return b.time[0]-a.time[0];
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
            dispatch(ChatSuccess([to,from]))
        }).catch(err=>dispatch(ChatFailure()));
    }
}

export default getAllChat;