import * as chat from "./actionTypes";

const initialState={
    isLoading:false,
    to:[],
    from:[],
    isFailure:false
};

const reducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case chat.CHATREQUEST: return {...state,isLoading:true};
        case chat.CHATSUCCESS: return {...state,isLoading:false,to:payload[0],from:payload[1]};
        case chat.CHATFAILURE: return {...state,isLoading:false,isFailure:true};
        default: return state;
    }
}

export {reducer};