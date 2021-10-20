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
/*const [USERNAME, setUSERNAME] = useState("")
const formData = window.localStorage.getItem("userInfo");
        const savedValues = JSON.parse(formData);
        setUSERNAME(savedValues.username);*/
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
    const leader = useRef("");
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
                /*.withUrl("http://192.168.1.8:5000/signalr")*/
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

            hub.current.on('UserConnected', (userId, username) => {
                if (userId === myID.current) return;
                if(username.contain('(Meeting Leader)'))
                {
                    leader.current = userId;
                }
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
            if(userId == leader.current)
            {
                leader.current = userVideoStream.id;
            }
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
        const vids = [];
        videos.forEach(stream => {
            if (usedID.indexOf(stream.id) <= -1) {
                if (stream != undefined) {
                    usedID.push(stream.id);
                    vids.push(stream);
                }

            }
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
                leaderID={leader.current}
            >
                <UserVid muted autoPlay ref={myVideoStream}/>
            </DashBoard>
        </div>
    );
}




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


export default WebRTCMain;