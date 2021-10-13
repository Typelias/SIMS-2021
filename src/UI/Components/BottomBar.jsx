import React from 'react'
import styled from 'styled-components'
import MicRoundedIcon from '@mui/icons-material/MicRounded'; //mic on icon
import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';      //mic off icon
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff'; //camera off icon
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'; //settingsicon
import ScreenShareRoundedIcon from '@mui/icons-material/ScreenShareRounded'; //screenshare icon
import GestureIcon from '@mui/icons-material/Gesture'; //whiteboard icon
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom"

const Style = {
    fontSize: 40, 
    margin: "5vh",
    color: "#FFF",
}

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


const BottomBar = () => {

    return (
        <Container>
            <SectionLeft>
                <MicRoundedIcon  sx={Style}/>
                <PhotoCameraFrontIcon sx={Style}/>    
            </SectionLeft>
            <SectionMid>
                <GestureIcon sx={Style}/>
            </SectionMid>
            <SectionRight>
                    <ScreenShareRoundedIcon sx={Style}/>
                    <SettingsRoundedIcon sx={Style}/>  
            </SectionRight>
            <SectionEnd>
                <Link to="/"><HomeIcon sx={Style}/></Link>
            </SectionEnd>
                
        </Container>
    )
}

export default BottomBar