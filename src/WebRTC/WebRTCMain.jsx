import * as SignalR from '@microsoft/signalr';
import Peer from 'peerjs';
import styled from 'styled-components'
import React, {useEffect, useRef, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import DashBoard from '../UI/Containers/DashBoard';


const StyledVideo = styled.video`
  height: 200px;
  width: 300px
`

const Video = ({stream}) => {
    const ref = useRef();

    console.log("YEET");
    useEffect(() => {
        ref.current.srcObject = stream;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <StyledVideo playsInline autoPlay ref={ref}/>
    );
}

function WebRTCMain() {

    const hub = useRef();
    const myPeer = useRef();
    const [videos, setVideos] = useState([]);
    let ROOMID = window.ROOM;
    let USERNAME = window.USERNAME;
    const myVideoStream = useRef();
    //const myStreamObject = useRef();
    const peers = {};
    const myID = useRef();
    const [messages, setMessages] = useState([]);
    const [userList, setUserlist] = useState({});
    const [message, changeMessage] = useState("");

    useEffect(() => {
        if (USERNAME === "" || USERNAME === null || USERNAME === undefined) {
            USERNAME = uuidv4().slice(0, 5);
        }
        if (ROOMID === "" || ROOMID === null || ROOMID === undefined) {
            ROOMID = "Tjuvholmen"
        }
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(async (stream) => {

            hub.current = new SignalR.HubConnectionBuilder()
                .withUrl("http://localhost:5000/signalr")
                .configureLogging(SignalR.LogLevel.Information)
                .build();
            await hub.current.start();

            myID.current = uuidv4();

            myPeer.current = new Peer(myID.current, {
                path: "/",
                host: "localhost",
                port: 5000
            })


            myVideoStream.current.srcObject = stream
            //myStreamObject.current = stream;

            myPeer.current.on('call', call => {
                console.log("Called");
                call.answer(stream);
                call.on('stream', userVideoStream => {
                    console.log("Got stream");
                    addVideoStream(userVideoStream);
                });
            });

            hub.current.on('UserConnected', userId => {
                if (userId === myID.current) return;
                connectToNewUser(userId, stream);
            })
            hub.current.on("UserDisconnected", userId => {
                if (peers[userId]) peers[userId].close();
            });

            hub.current.on("UserList", newUserList => {
                // console.log(newUserList);
                setUserlist(newUserList);
            });

            hub.current.on("createMessage", (message, username) => {
                console.log(message)
                var newMessage = {
                    username,
                    message
                };
                setMessages(mess => [...mess, newMessage])
            })

            myPeer.current.on('open', id => {
                hub.current.invoke("JoinRoom", ROOMID, id, USERNAME);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function addVideoStream(stream) {
        setVideos(vids => [...vids, stream])
    }

    function connectToNewUser(userId, stream) {
        const call = myPeer.current.call(userId, stream);
        const streamID = stream.id;

        call.on('stream', userVideoStream => {
            console.log("Got stream");
            addVideoStream(userVideoStream);
        });
        call.on('close', () => {
            let vids = videos;
            vids = videos.filter(vid => vid !== streamID);
            setVideos(vids);
        });

        peers[userId] = call;
    }

    const toggleVideo = () => {
        let enabled = myVideoStream.current.srcObject.getVideoTracks()[0].enabled;
        if (enabled) {
            myVideoStream.current.srcObject.getVideoTracks()[0].enabled = false;
        } else {
            myVideoStream.current.srcObject.getVideoTracks()[0].enabled = true;
        }

    }

    const toggleAudio = () => {
        let enabled = myVideoStream.current.srcObject.getAudioTracks()[0].enabled;
        if (enabled) {
            myVideoStream.current.srcObject.getAudioTracks()[0].enabled = false;
        } else {
            myVideoStream.current.srcObject.getAudioTracks()[0].enabled = true;
        }


    }


    function removeDupes() {

        const usedID = [];

        /*const vids = videos.map((stream, index) => {
            if (usedID.indexOf(stream.id) > -1) {
                return null;
            }
            usedID.push(stream.id);
            return <Video stream={stream} key={index}/>

        });*/

        const vids = videos.map(stream => {
            if(usedID.indexOf(stream.id) > -1) {
                return;
            }
            usedID.push(stream.id);
            return stream;
        })

        return vids;

    }

    const handleChange = (event) => {
        changeMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        hub.current.invoke("Message", message);
        changeMessage("");
    }


    return (<div>
            <DashBoard
                users={userList}
                messages={messages}
                videoList={removeDupes()}
                muteCallback={toggleAudio}
                videoCallback={toggleVideo}
                messageChangeCallback={handleChange}
                submitCallback={handleSubmit}
                place="Home"
                currentMessage={message}
            >
                <UserVid muted autoPlay ref={myVideoStream}/>
            </DashBoard>
        </div>
    );

    /* return (
      <Container>
        <VideoGrid>
          {
            removeDupes()
          }

          <UserVid muted autoPlay ref={myVideoStream} />
        </VideoGrid>
        <SideBar>
          <UserList>
            <h3>Users In Chat</h3>
            {
              Object.keys(userList).map(name => {
                return <li key={name}> <Avatar sx={{ bgcolor: red[200], marginRight: 1 }}> {name.slice(0, 1)} </Avatar> {name} </li>;
              })
            }
          </UserList>
          <ChatContainer>
            <h3>Chat</h3>

            {
              messages.map(message => {
                console.log(messages.length)
                return <li key={uuidv4()}> <Avatar sx={{ bgcolor: red[200], marginRight: 1 }}> {message.username.slice(0, 1)} </Avatar> {message.message} </li>
              })
            }
            <form onSubmit={handleSubmit}>
              <input type="text" value={message} onChange={handleChange} />
              <input type="submit" value="Send Message" />
            </form>

          </ChatContainer>
        </SideBar>
      </Container>
    ); */
}

/*const ChatContainer = styled.div`
  height: 70vh;
  width: 100%;
  margin: 0;

  h3 {
    margin: 0;
    padding-top: 5px;
    text-align: center;
  }

  li {
    font-size: 1.5em;
    display: flex;
    align-items: center;

  }

  li:hover {
    opacity: 0.5;
    border: 1 solid black;

  }

`*/

/*const UserList = styled(ChatContainer)`
  height: 30vh;
  background-color: lightgray;
  list-style: none;
  overflow-y: scroll;
  

`*/

/*const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin:0;
`

const SideBar = styled.div`
background-color: gray;
  width: 20vw;
  height: 100vh;
`*/

export const UserVid = styled.video`

  position: absolute;
  width: 200px;
  height: 200px;
  bottom: 10px;
  right: 10px;
`
const UserVideoHidden = styled(UserVid)`
  display: none;
`

/*
const VideoGrid = styled.div`
position: relative;
  padding: 20px;
  width:80vw;
  height:80vh;
  background-color: black;
`
*/

export default WebRTCMain;