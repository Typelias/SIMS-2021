import React from 'react'
import styled from 'styled-components'
import MicRoundedIcon from '@mui/icons-material/MicRounded'; //mic on icon
import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';      //mic off icon
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff'; //camera off icon
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'; //settingsicon
import ScreenShareRoundedIcon from '@mui/icons-material/ScreenShareRounded'; //screenshare icon
import GestureIcon from '@mui/icons-material/Gesture'; //whiteboard icon

const Style = {
    fontSize: 40, 
    margin: "5vh"
    
}

const SectionLeft = styled.div`
    display: inherit;
    flex-shrink: 0;
    align-items: center;
    position: absolute;
    left: 2vh;
`
const SectionRight = styled.div`
    display: inherit;
    flex-shrink: 0;
    align-items: center;
    position: absolute;
    right: 25vh;
    
    
`
const SectionMid = styled.div`
    display: inherit;
    flex-shrink: 0;
    position: absolute;
    margin-right: 5vh;
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
    justify-content: center;

    
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
                
        </Container>
    )
}

export default BottomBar