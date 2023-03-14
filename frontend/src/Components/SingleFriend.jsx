import { Text, Button, useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react';
import { Avatar, AvatarBadge } from '@chakra-ui/react';
import "./SingleFriendd.css";

const SingleFriend = ({ name, photo, dark, email, mobile, doChat, stopChat, frnd, ID, isActive}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return <div>
        <div className="SingleFrined">
            <Avatar name={name} src={photo==="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnO4Gbe_zOUld75wAOEA6YdJqw5pXed1-2weosIbFRC6IvD9KnmOF8adGJn6lapLFt4-M&usqp=CAU"?"":photo} onClick={onOpen}>
                {/* bg="tomato" */}
                <AvatarBadge boxSize='1rem'  id={ID} />
            </Avatar>
            <Text color="teal" onClick={()=>{
            if(frnd===""){
                doChat(ID);
            } else {
                stopChat();
            }
        }}>{name}</Text>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bgColor={dark?"black":"white"} border="2px solid teal">
                <ModalHeader color="teal">{name}</ModalHeader>
                <ModalCloseButton color="teal"/>
                <ModalBody color="teal">
                    <img style={{width:"30%"}} src={photo} alt={name} />
                    <br/>
                    Name: {name==="" || name===undefined?"Not available":name}
                    <br/>
                    Email: {email==="" || email===undefined?"Not available":email}
                    <br/>
                    Mobile: {mobile==="" || mobile===undefined?"Not available":mobile}
                    <br/>
                </ModalBody>

                <ModalFooter>
                    <Button color={dark?"balck":"white"} colorScheme="teal" border="2px solid teal" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
};

export default SingleFriend;