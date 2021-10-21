import Sidebar from "./Components/SideBar";
import {useEffect, useRef, useState} from "react";
import * as SignalR from "@microsoft/signalr";
import BottomBar from "./Components/BottomBar";
import styled from "styled-components";
import Whiteboard from "../Whiteboard/WhiteBoard";


const OfficeNonLeader = () => {

    const hub = useRef();
    const [messages, setMessages] = useState([]);
    const [message, changeMessage] = useState("");
    const [userList, setUserlist] = useState({});

    useEffect(()=> {
        hub.current = new SignalR.HubConnectionBuilder()
            .withUrl("http://localhost:5000/signalr")
            .configureLogging(SignalR.LogLevel.Information)
            .build();

    },[]);

    const handleChange = (event) => {
        changeMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        hub.current.invoke("Message", message);
        changeMessage("");
    }

    return(
        <div>
            <Sidebar users={userList} messages={messages} messageChangeCallback={handleChange}
                     submitCallback={handleSubmit} currentMessage={message}/>
            <Container>
                <Whiteboard />
            </Container>
            <BottomBar/>
        </div>
    );


}

const Container = styled.div`
  width: auto;
  height: 85vh;
  margin-right: 16rem;
  position: relative;
  //padding: 0 4rem;
`

export default OfficeNonLeader;