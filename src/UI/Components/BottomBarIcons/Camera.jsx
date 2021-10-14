import React, { useState } from 'react'
import styled from 'styled-components'
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff'; //camera off icon
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';

const Style = {
    fontSize: 40
}
const Container = styled.div`
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;
    margin: 5vh;
    transition: transform ease 300ms;
    &:hover{
        transform: scale(1.5);

    }
`

const Camera = () => {
    const [CamState, setCamstate] = useState(true);
    function StateChange(){
        setCamstate(!CamState);
    }
    return (
        <Container onClick={StateChange}>{CamState ? <PhotoCameraFrontIcon sx={Style}/> : <FaceRetouchingOffIcon sx={Style}/>}</Container>
    )
}

export default Camera
