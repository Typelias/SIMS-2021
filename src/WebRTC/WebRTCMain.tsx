import React, {useEffect, useRef, useState} from "react";
import Peer from "simple-peer";
import styled from "styled-components";
import * as SignalR from "@microsoft/signalr";
import unique from "fork-ts-checker-webpack-plugin/lib/utils/array/unique";

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`

const StyledVideo = styled.video`
  height: 40%;
  width: 50%
`

const Video = ({peer}: { peer: Peer.Instance }) => {
    const ref = useRef<HTMLVideoElement>();

    useEffect(() => {
        peer.on("stream", (stream: MediaStream) => {
            ref.current.srcObject = stream;
        });
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref}/>
    );
}
const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

interface IPeerRef {
    peerID: string,
    peer: Peer.Instance
}

interface Payload {
    userToSignal: string,
    callerID: string,
    signal: string,
}

const WebRTCMain = () => {
    const [peers, setPeers] = useState<Peer.Instance[]>([]);
    const socketRef = useRef<SignalR.HubConnection>();
    const userVideo = useRef<HTMLVideoElement>();
    const peersRef = useRef<IPeerRef[]>([]);
    const RoomID = "Tjuvholmen";
    const clientIDRef = useRef<string>();

    function createPeer(userToSignal: string, callerID: string, stream: MediaStream): Peer.Instance {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on('signal', signal => {
            const sig = JSON.stringify(signal);
            socketRef.current.invoke("SendingSignal",
                JSON.stringify({"userToSignal": userToSignal, "callerID": callerID, "signal": sig}));
        });

        return peer;

    }

    function addPeer(incomingSignal: Peer.SignalData, callerID: string, stream: MediaStream): Peer.Instance {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });
        const userToSignal = "";

        peer.on("signal", signal => {
            const sig = JSON.stringify(signal);
            socketRef.current.invoke("ReturningSignal",
                JSON.stringify({"signal": sig, "callerID": callerID, "userToSignal": userToSignal}));
        });

        peer.signal(incomingSignal);

        return peer;
    }

    useEffect(() => {
        socketRef.current = new SignalR.HubConnectionBuilder()
            .withUrl("http://192.168.1.113:5000/signalrtc")
            .configureLogging(SignalR.LogLevel.Information)
            .build();
        navigator.mediaDevices.getUserMedia({video: videoConstraints, audio: true}).then(async (stream) => {
            userVideo.current.srcObject = stream;

            socketRef.current.on("AllUsers", (users: string) => {
                const peers: Peer.Instance[] = [];
                let userList: string[] = JSON.parse(users)
                userList = userList.filter(id => id != socketRef.current.connectionId);
                userList.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.connectionId, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer
                    });

                        peers.push(peer);


                });
                setPeers(peers);

            });

            socketRef.current.on("UserJoined", (payload: string) => {
                const payLoad: Payload = JSON.parse(payload);
                const sig: Peer.SignalData = JSON.parse(payLoad.signal);
                const peer = addPeer(sig, payLoad.callerID, stream);
                peersRef.current.push({
                    peerID: payLoad.callerID,
                    peer,
                });

                setPeers(users => [...users, peer]);


            });

            socketRef.current.on("GetId", (id: string) => {
                clientIDRef.current = id;
            });

            socketRef.current.on("ReceivingReturnedSignal", (payload: Payload) => {
                const item = peersRef.current.find(p => p.peerID === payload.userToSignal);
                //const item = peersRef.current.get(payload.userToSignal);
                const sig: Peer.SignalData = JSON.parse(payload.signal);
                item.peer.signal(sig);
            });
            await socketRef.current.start();
            socketRef.current.invoke("JoinRoom", RoomID);
        });
    }, []);


    /*function reducePears(): void {
        let localPeers = peers;
        localPeers = Array.from(new Set(localPeers));
        setPeers(localPeers);
        let localPeerRef = peersRef.current;
        localPeerRef = Array.from(new Set(localPeerRef));
        peersRef.current = localPeerRef;
    }*/


    return (
        <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline/>
            {peers.map((peer, index) => {
                <Video peer={peer} key={index}/>
            })}

        </Container>
    );

};

export default WebRTCMain;