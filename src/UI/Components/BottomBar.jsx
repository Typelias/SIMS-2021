import React from 'react'
import styled from 'styled-components'
import Microphone from './BottomBarIcons/Microphone'; 
import Camera from './BottomBarIcons/Camera';   
import OpenWhiteBoard from './OpenWhiteBoard'; 
import Settings from './BottomBarIcons/Settings'; //settingsicon
import ScreenShare from './BottomBarIcons/ScreenShare'; //screenshare icon
import Home from './BottomBarIcons/Home';
import { Link } from "react-router-dom"






const SectionLeft = styled.div`
    display: inherit;
    flex-shrink: 0;
    align-items: center;
    left: 2vh;
    width: 40%;
`
const SectionMid = styled.div`
    display: inherit;
    align-items: center;
    margin-left: auto;
`
const SectionRight = styled.div`
    display: inherit;
    flex-shrink: 0;
    align-items: center;
    
    
`

const SectionEnd = styled.div`
    display: inherit;
    margin-left: auto;
    width: 20vh;
`


const Container = styled.div`
    background-color: ${({ theme }) => theme.secondary};
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    height: 5rem;
    display: flex;
    gap: 5%;
    flex-direction: row;
    align-items: center;
`


const BottomBar = ({mute, video}) => {
    const path = window.location.pathname;
    return (
        
        <Container>
            <SectionLeft>
                {path !== "/OfficeNonLeader" && <><Microphone mute={mute}/> <Camera video={video}/></> }  
            </SectionLeft>
            <SectionMid>
                {path !== "/OfficeNonLeader" && <OpenWhiteBoard/> }   
            </SectionMid>
            <SectionRight>
                    <ScreenShare/>
                    <Settings/>  
            </SectionRight>
            <SectionEnd>
                <Link to="/"><Home/></Link>
            </SectionEnd>
                
        </Container>
    )
}

export default BottomBar