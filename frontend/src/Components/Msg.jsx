import { Text } from "@chakra-ui/react";
import "./Masg.css";


const Msg=({msg,time,side})=>{
    const styling={
        marginLeft:side==="right"?"auto":"20px"
    }
    return <div style={styling} className="MsgChatt">
        <Text textAlign="left" color="teal" fontWeight="700">{msg}</Text>
        <Text textAlign="end" color="teal" fontWeight="700">{time}</Text>
    </div>
}

export default Msg;