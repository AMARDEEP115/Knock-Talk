import { Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import "./Aboutt.css";

const About=()=>{
    return <div id="aBout">
        <img src="https://zeevector.com/wp-content/uploads/Clipart/Welcome-hand-Clipart.png" alt="welcome_hands" style={{width:"40%",margin:"auto",marginTop:"20px"}} />
        <Text className="AllP">Welcome to Knock-Talk</Text>
        <Text className="AllP">Knock-Talk is an online platform where you make new friends</Text>
        <Text className="AllP">and can send and receive text messages from all over the world</Text>
        <Text className="AllP">To start using our service you first have to <Link to="/signup">register</Link></Text>
        <Text className="AllP">Then after registering successfully you will be redirected to the signin page</Text>
        <Text className="AllP">if you have already registered then you simply <Link to="/login">log in</Link></Text>
        <Text className="AllP">Now you have to <Link to="/login">log in</Link> with your credentials and</Text>
        <Text className="AllP">after logging in successfully, start to explore our website and enjoy...</Text>
        <Text id="LastP">created by AMAR DEEP</Text>
        <img src="https://images.template.net/75469/Free-part-thank-you-animated-stickers-1.gif" alt="thank-you" style={{width:"40%",margin:"auto"}} />
    </div>
}

export default About;