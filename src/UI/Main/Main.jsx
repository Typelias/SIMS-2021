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

const VideoBox = (props) => {

    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.srcObject = props.stream;
        vid.autoplay = true;
        return vid;
    })
    useEffect(() => void video.play(), [video])

    return <mesh
        {...props}
        scale={[2, 2, 2]}>
        <boxBufferGeometry args={[1, 1, 1]}/>
        <meshBasicMaterial>
            <videoTexture args={[video]} attach="map"/>
        </meshBasicMaterial>
    </mesh>

}


const Main = ({place, list, children}) => {


    return (
        <Container>
            <Canvas>
                <ambientLight intesity={0.5}/>
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
                <pointLight position={[-10, -10, -10]}/>
                {
                    list.map((stream, index) => {
                        if(stream === undefined) return ;
                        const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloat(-3,3));
                        return <VideoBox key={index} stream={stream} position={[x,y,0]}/>
                    })
                }
                <Box position={[2.5, 0, 0]} />
            </Canvas>
            {children}
        </Container>
    )
}

export default Main
