import React, {useEffect, useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import CamView from './CamViewDiv/CamView'
import {UserVid} from "../../WebRTC/WebRTCMain";
import {Canvas, useFrame} from "react-three-fiber";
import five from "../../Assets/five.png";
import * as THREE from "three";

const Container = styled.div`
  width: auto;
  height: 85vh;
  margin-right: 16rem;
  position: relative;
  padding: 0 4rem;
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
    return(
    <mesh
        {...props}>
        <boxBufferGeometry args={[3, 0.0001, 8]}/>
        <meshBasicMaterial color={0x964B00}/>
    </mesh>)

}

const Floor = (props) => {
    return(
        <mesh
            {...props}>
            <boxBufferGeometry args={[10, 1, 100]}/>
            <meshBasicMaterial color={0xa19255}/>
        </mesh>)

}

const Wall = (props) => {
    return(
        <mesh
            {...props}>
            <boxBufferGeometry args={[1, 10, 100]}/>
            <meshBasicMaterial color={0x918c74}/>
        </mesh>)

}
const BackWall = (props) => {
    return(
        <mesh
            {...props}>
            <boxBufferGeometry args={[10, 10, 1]}/>
            <meshBasicMaterial color={0x918c74}/>
        </mesh>)

}

const Roof = (props) => {
    return(
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


const Main = ({place, list, children, leaderID}) => {




    return (
        <Container>
            <Canvas>
                {
                    list.map((stream, index) => {
                        if(stream === null) return ;
                        if(stream.id === leaderID) {
                            return <BigVideo position={[0,0, 1]} stream={stream}/>
                        }
                        console.log(index);
                        if (stream === undefined) return;
                        var rotation;
                        var pos;
                        if (index % 2 == 0) {
                            rotation = [0, -0.4, 0]
                            if (index < 3)
                                pos = [2.5, 0, 3]
                            else
                                pos = [1.9, 0, 2]
                        } else {
                            rotation = [0, 0.4, 0]
                            if (index < 3)
                                pos = [-2.5, 0, 3]
                            else
                                pos = [-1.9, 0, 2]
                        }
                        return <VideoBox key={index} stream={stream} position={pos} rotation={rotation}/>
                    })
                }
                <Table position={[0,-0.5,1.1]}/>
                <Floor position={[0,-1,0]}/>
                <Wall position={[4,0,0]}/>
                <Wall position={[-4,0,0]}/>

                <Roof position={[0,4,0]}/>
                <BackWall position={[0,0,-1]}/>

            </Canvas>
            {children}
        </Container>
    )
}

export default Main
