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

//({place, list, children, leaderID})

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list
        }

    }


    renderVideos() {
        console.log('In function');
        console.log(this.state.list);
        const vids = [];
        this.state.list.streams.forEach((stream, index) => {
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

            vids.push(<VideoBox key={index} stream={stream} position={pos} rotation={rotation}/>)
        });

        return vids;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            list: nextProps.list
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.list !== prevProps.list) {
            this.setState({
                list: this.props.list
            })
        }
    }

    /*{
                        list.streams.map((stream, index) => {
                            console.log(index);
                            console.log(list);
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
                    }*/


    render() {
        return (

            <Container>
                <Canvas key={this.state.list.toString()}> {
                    this.renderVideos()
                }

                    <Table position={[0, -0.5, 1.1]}/>
                    <Floor position={[0, -1, 0]}/>
                    <Wall position={[4, 0, 0]}/>
                    <Wall position={[-4, 0, 0]}/>

                    <Roof position={[0, 4, 0]}/>
                    <BackWall position={[0, 0, -1]}/>

                </Canvas>
                {
                    this.props.children
                }
            </Container>
        )
    }
}

export default Main
