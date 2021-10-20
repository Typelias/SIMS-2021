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
    const [videos, setVideos] = useState([null]);
    let ROOMID = "";
    let USERNAME = "";
    
    const myVideoStream = useRef();
    //const myStreamObject = useRef();
    const peers = {};
    const myID = useRef();
    const [leader, setLeader] = useState("");
    const [messages, setMessages] = useState([]);
    const [userList, setUserlist] = useState({});
    const [message, changeMessage] = useState("");
    
 



    useEffect(() => {

        let formData = window.localStorage.getItem("userInfo");
        formData = JSON.parse(formData);
        USERNAME = formData.username;
        ROOMID = formData.roomid;

        
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
            console.log(USERNAME);


            myID.current = uuidv4();

            myPeer.current = new Peer(myID.current, {
                path: "/",
                host: "localhost",
                port: 5000
            });

            console.log("My stream ID: " + stream.id);


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
                connectToNewUser(userId, stream);
            })
            hub.current.on("UserDisconnected", userId => {
                if (peers[userId]) peers[userId].close();
            });

            hub.current.on("UserList", newUserList => {
                // console.log(newUserList);
                setUserlist(newUserList);
            });

            hub.current.on("NewLeader", streamID => {
                console.log("Got new leader", streamID);
                setLeader(streamID);
            })

            hub.current.on("createMessage", (message, username) => {
                var newMessage = {
                    username,
                    message
                };
                setMessages(mess => [...mess, newMessage])
            })

            myPeer.current.on('open', id => {
                hub.current.invoke("JoinRoom", ROOMID, id, USERNAME);
                if(USERNAME.includes('(Meeting Leader)'))
                {
                    console.log("Setting leader");
                    hub.current.invoke("SetLeader", stream.id);
                }
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function addVideoStream(stream) {
        if(stream.id === leader) {
            const vids = videos;
            vids[0] = stream;
            setVideos(vids);
        }else {
            setVideos(vids => [...vids, stream])
        }

    }

    function connectToNewUser(userId, stream) {
        const call = myPeer.current.call(userId, stream);
        const streamID = stream.id;

        call.on('stream', userVideoStream => {
            console.log("Got stream");
            addVideoStream(userVideoStream);
        });
        call.on('close', () => {
            let vids;
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
        const vids = [];
        videos.forEach(stream => {
            if(stream === null){
                vids.push(null);
            }else if (usedID.indexOf(stream.id) <= -1) {
                if (stream != undefined) {
                    usedID.push(stream.id);
                    vids.push(stream);
                }

            }
        });

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
                leaderID={leader}
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