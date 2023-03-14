import { Route, Routes } from "react-router-dom";
import About from "../Pages/About";
import Chat from "../Pages/Chat";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Users from "../Pages/Users";
import PrivateRoute from "./PrivateRoute";

const AllRouter = ({drk}) => {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/users" element={
            <PrivateRoute>
                <Users />
            </PrivateRoute>
        } />
        <Route path="/chat" element={
            <PrivateRoute>
                <Chat dark={drk}/>
            </PrivateRoute>
        } />
        <Route path="/about" element={<About />}/>
    </Routes>
};

export default AllRouter;