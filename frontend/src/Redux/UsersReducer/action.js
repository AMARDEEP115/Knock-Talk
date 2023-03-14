import axios from "axios";
import * as users from "./actionTypes";

const UsersRequest = () => {
    return { type: users.USERSREQUEST };
};

const UsersSuccess = (data) => {
    return { type: users.USERSSUCCESS, payload: data };
};

const UsersFailure = () => {
    return { type: users.USERSFAILURE };
};

const getUsers=()=>{
    let person=JSON.parse(localStorage.getItem("userLog")) || {};
    return (dispatch)=>{
        dispatch(UsersRequest());
        axios.get("http://localhost:8080/user/").then((res)=>{
            let allUsers=res.data.users;
            let xyz=allUsers.filter((el)=>el._id===person._id);
            person=xyz[0];
            localStorage.setItem("userLog",JSON.stringify(xyz[0]));
            let perFrnd=person.friends;
            let perFrndRqS=person.friend_request_sent;
            let perFrndRqC=person.friend_request;
            let friends=[];
            let frndRqstCame=[];
            let frndRqstSent=[];
            let notFriends=[];
            for(let i=0;i<allUsers.length;i++){
                let f=0;
                let c=0;
                let s=0;
                for(let j=0;j<perFrnd.length;j++){
                    if(allUsers[i]._id===perFrnd[j]){
                        friends.push({...allUsers[i],isActive:false});
                        f=1;
                        j=perFrnd.length;
                    }
                }
                if(f===0){
                    for(let j=0;j<perFrndRqS.length;j++){
                        if(allUsers[i]._id === perFrndRqS[j]){
                            frndRqstSent.push(allUsers[i]);
                            s=1;
                            j=perFrndRqS.length;
                        }
                    }
                    if(s===0){
                        for(let j=0;j<perFrndRqC.length;j++){
                            if(allUsers[i]._id === perFrndRqC[j]){
                                frndRqstCame.push(allUsers[i]);
                                c=1;
                                j=perFrndRqC.length;
                            }
                        }
                        if(c===0){
                            if(allUsers[i]._id!==person._id){
                                notFriends.push(allUsers[i]);
                            };
                        }
                    }
                }
            }
            dispatch(UsersSuccess([allUsers,friends,frndRqstSent,frndRqstCame,notFriends]));
        }).catch(err => dispatch(UsersFailure()));
    }
}

export { getUsers };