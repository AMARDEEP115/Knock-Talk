import { Link, Navigate, useNavigate } from "react-router-dom";
import DrawerExample from "./Drawer";
import { RiMoonFill } from "react-icons/ri";
import "./Navbarr.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { Logout } from "../Redux/AuthReducer/action";

const Navbar = ({cl,drk}) => {
    const dispatch=useDispatch();
    const Auth=useSelector(store=>store.AuthReducer.isAuth);
    const Navi=useNavigate();

    return <div id="Nav" style={{color:cl?"black":"white"}}>
        <h1 id="xx" onClick={()=>{
            return Navi("/");
        }}>Konck-Talk!</h1>
        <Link to="/">HOME</Link>
        {!Auth && <Link to="/login">LOGIN</Link>}
        {!Auth && <Link to="/signup">SIGNUP</Link>}
        {Auth && <Link to="/users">FIND PEOPLE</Link>}
        {Auth && <Link to="/chat">CHAT</Link>}
        {Auth && <Button style={{color:cl?"black":"white"}} id="Logout" onClick={()=>{
            dispatch(Logout());
            return <Navigate to="/" />
        }}>LOGOUT</Button>}
        <Link to="/about">ABOUT US</Link>
        <RiMoonFill color={cl?"black":"white"} onClick={()=>{
            drk(!cl);
        }}/>
        <div id="Dra">
            <DrawerExample dark={cl}/>
        </div>
    </div>
}

export default Navbar;