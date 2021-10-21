import Sidebar from "./Components/SideBar";
import {useEffect, useRef, useState} from "react";
import * as SignalR from "@microsoft/signalr";
import BottomBar from "./Components/BottomBar";
import styled from "styled-components";
import Whiteboard from "../Whiteboard/WhiteBoard";
import Board from "../WebRTC/board";


const OfficeNonLeader = () => {

    const hub = useRef();
    const [messages, setMessages] = useState([]);
    const [message, changeMessage] = useState("");
    const [userList, setUserlist] = useState({});
    let ROOMID = "";
    let USERNAME = "";


    const init = async () => {
        await hub.current.start()
        hub.current.invoke("JoinRoom", ROOMID, "NoCameraUser", USERNAME);

    }

    useEffect(()=> {
        let formData = window.localStorage.getItem("userInfo");
        formData = JSON.parse(formData);
        USERNAME = formData.username;
        ROOMID = formData.roomid;
        hub.current = new SignalR.HubConnectionBuilder()
            .withUrl("http://typelias.se:5000/signalr")
            .configureLogging(SignalR.LogLevel.Information)
            .build();

        hub.current.on('UserConnected', (userId, username) => {
            return;
        })
        hub.current.on("UserDisconnected", userId => {
            return;
        });

        hub.current.on("UserList", newUserList => {
            // console.log(newUserList);
            setUserlist(newUserList);
        });

        hub.current.on("NewLeader", streamID => {
            return;
        })

        hub.current.on("createMessage", (message, username) => {
            var newMessage = {
                username,
                message
            };
            setMessages(mess => [...mess, newMessage])
        })

        hub.current.start().then(() => {
            hub.current.invoke("JoinRoom", ROOMID, "NoCameraUser", USERNAME);
        })



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
                <Board/>
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