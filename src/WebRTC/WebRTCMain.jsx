import * as SignalR from '@microsoft/signalr';
import Peer from 'peerjs';
import styled from 'styled-components'
import React, {useEffect, useMemo, useRef, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import DashBoard from '../UI/Containers/DashBoard';
import Sidebar from "../UI/Components/SideBar";
import BottomBar from "../UI/Components/BottomBar";
import {Canvas, useFrame} from "react-three-fiber";
import * as THREE from "three";
import five from "../Assets/five.png";


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
    const [videos, setVideos] = useState({
        leader: null,
        streams: []
    });
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
    const usedIDS = useRef([]);
    const [randomID, setRandomID] = useState(uuidv4());


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
                if (USERNAME.includes('(Meeting Leader)')) {
                    console.log("Setting leader");
                    hub.current.invoke("SetLeader", stream.id);
                }
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function addVideoStream(stream) {
        console.log(leader)
        console.log(stream.id)
        if (stream.id === leader) {
            if (usedIDS.current.indexOf(stream.id) > -1) return;
            console.log('Adding stream Leader')
            const newVideos = videos;
            newVideos.leader = stream;
            setVideos(newVideos);
            usedIDS.current.push(stream.id)
        } else {
            if (usedIDS.current.indexOf(stream.id) > -1) return;
            console.log('Adding non leader')
            const newVideos = videos;
            newVideos.streams = [...newVideos.streams, stream];
            setVideos(newVideos);
            usedIDS.current.push(stream.id)
        }

        setRandomID(uuidv4());

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
        videos.streams.forEach(stream => {
            if (stream === null) {
                vids.push(null);
            } else if (usedID.indexOf(stream.id) <= -1) {
                if (stream != undefined) {
                    usedID.push(stream.id);
                    vids.push(stream);
                }

            }
        });

        console.log('Removing dupes')
        console.log(vids);

        const ret = {leader: videos.leader, streams: vids};
        console.log(ret);

        return ret;

    }

    const handleChange = (event) => {
        changeMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        hub.current.invoke("Message", message);
        changeMessage("");
    }


    /*return (<div>

            <DashBoard
                key={videos.toString()}
                users={userList}
                messages={messages}
                videoList={videos}
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
    );*/

    const fixMyShit = () => {
        const newVideos = {
            leader: null,
            streams: []
        }
        videos.streams.forEach((video) =>{
            if(video.id === leader) {
                console.log('The Shit');
                newVideos.leader = video;
            }else{
                newVideos.streams.push(video)
            }
        })

        setVideos(newVideos);
    }

    return (
        <div>
            <Sidebar users={userList} messages={messages} messageChangeCallback={handleChange}
                     submitCallback={handleSubmit} currentMessage={message}/>
            <Container ke={randomID}>
                <Canvas>
                    {
                        videos.leader? <BigVideo position={[0,0, 1]} stream={videos.leader}/>: null
                    }
                    {
                        videos.streams.map((stream, index) => {
                            console.log(index);
                            if(stream.id === leader)
                            {
                                fixMyShit();
                            }
                            var rotation;
                            var pos;
                            if (index % 2 == 0) {
                                console.log("Hello")
                                rotation = [0, -0.4, 0]
                                if (index < 2)
                                    pos = [1, 0, 3]
                                else
                                    pos = [1, 0, 2]
                            } else {
                                console.log("NOT HELLO")
                                rotation = [0, 0.4, 0]
                                if (index < 2)
                                    pos = [-1, 0, 3]
                                else
                                    pos = [-1, 0, 2]
                            }
                            return <VideoBox key={index} stream={stream} position={pos} rotation={rotation}/>
                        })
                    }
                    <Table position={[0, -0.5, 1.1]}/>
                    <Floor position={[0, -1, 0]}/>
                    <Wall position={[4, 0, 0]}/>
                    <Wall position={[-4, 0, 0]}/>

                    <Roof position={[0, 4, 0]}/>
                    <BackWall position={[0, 0, -1]}/>
                </Canvas>
                <UserVid muted autoPlay ref={myVideoStream}/>
            </Container>
            <BottomBar mute={toggleAudio} video={toggleVideo}/>
        </div>
    )
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

const Container = styled.div`
  width: auto;
  height: 85vh;
  margin-right: 16rem;
  position: relative;
  //padding: 0 4rem;
`
const Box = (props) => {
    const mesh = useRef();

    const [active, setActive] = useState(false);

    useFrame(() => {
        mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    });

    const texture = useMemo(() => new THREE.TextureLoader().load(five), []);

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [2, 2, 2] : [1.5, 1.5, 1.5]}>
            <boxBufferGeometry args={[1, 1, 1]}/>
            <meshBasicMaterial attach="material" transparant side={THREE.DoubleSide}>
                <primitive object={texture} attach="map"/>
            </meshBasicMaterial>
        </mesh>
    );
}

const Table = (props) => {
    return (
        <mesh
            {...props}>
            <boxBufferGeometry args={[3, 0.0001, 8]}/>
            <meshBasicMaterial color={0x964B00}/>
        </mesh>)

}

const Floor = (props) => {
    return (
        <mesh
            {...props}>
            <boxBufferGeometry args={[10, 1, 100]}/>
            <meshBasicMaterial color={0xa19255}/>
        </mesh>)

}

const Wall = (props) => {
    return (
        <mesh
            {...props}>
            <boxBufferGeometry args={[1, 10, 100]}/>
            <meshBasicMaterial color={0x918c74}/>
        </mesh>)

}
const BackWall = (props) => {
    return (
        <mesh
            {...props}>
            <boxBufferGeometry args={[10, 10, 1]}/>
            <meshBasicMaterial color={0x918c74}/>
        </mesh>)

}

const Roof = (props) => {
    return (
        <mesh
            {...props}>
            <boxBufferGeometry args={[100, 1, 100]}/>
            <meshBasicMaterial color={0xffffff}/>
        </mesh>)

}

const VideoBox = (props) => {
    const mesh = useRef();

    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.srcObject = props.stream;
        vid.autoplay = true;
        return vid;
    })
    useEffect(() => void video.play(), [video])

    return <mesh
        ref={mesh}
        {...props}
        scale={[1, 1, 1]}
    >
        <planeBufferGeometry args={[1, 1, 1]}/>
        <meshBasicMaterial>
            <videoTexture args={[video]} attach="map"/>
        </meshBasicMaterial>
    </mesh>

}

const BigVideo = (props) => {
    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.srcObject = props.stream;
        vid.autoplay = true;
        return vid;
    })

    useEffect(() => void video.play(), [video])

    return <mesh
        {...props}
        scale={[3, 3, 1]}
    >
        <planeBufferGeometry args={[1, 1, 1]}/>
        <meshBasicMaterial>
            <videoTexture args={[video]} attach="map"/>
        </meshBasicMaterial>
    </mesh>

}

export default WebRTCMain;