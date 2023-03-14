import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbarr.css";
import { Logout } from "../Redux/AuthReducer/action";

function DrawerExample({dark}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const Auth=useSelector(store=>store.AuthReducer.isAuth);
    const dispatch=useDispatch();

    const handleLogout=()=>{
        dispatch(Logout());
        return <Navigate to="/" />
    }

    return (
        <>
            <Button ref={btnRef} colorScheme='transparent' style={{color:dark?"black":"white"}} border="2px" onClick={onOpen}>
                <GiHamburgerMenu />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                border="2px solid teal"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader bgColor="teal" style={{color:dark?"black":"white"}}>Knock - Talk</DrawerHeader>

                    <DrawerBody id="linkss" style={{backgroundColor:dark?"black":"white"}}>
                        {/* <Input placeholder='Type here...' /> */}
                        <Link to="/" onClick={onClose}>HOME</Link>
                        {!Auth && <Link to="/login" onClick={onClose}>LOGIN</Link>}
                        {!Auth && <Link to="/signup" onClick={onClose}>SIGNUP</Link>}
                        {Auth && <Link to="/users" onClick={onClose}>FIND PEOPLE</Link>}
                        {Auth && <Link to="/chat" onClick={onClose}>CHAT</Link>}
                        <Link to="/about"  onClick={onClose}>ABOUT US</Link>
                        {Auth && <Button style={{color:"teal"}} id="LogoutD" onClick={handleLogout}>LOGOUT</Button>}
                    </DrawerBody>

                    <DrawerFooter style={{backgroundColor:dark?"black":"white"}}>
                        {/* <Button variant='outline' mr={3} >
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button> */}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
};

export default DrawerExample;