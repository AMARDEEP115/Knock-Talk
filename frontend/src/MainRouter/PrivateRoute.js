import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const PrivateRoute=({children})=>{
    const Auth=useSelector(store=>store.AuthReducer.isAuth);
    if(Auth){
        return children;
    }
    return <Navigate to="/login"/>
}

export default PrivateRoute;