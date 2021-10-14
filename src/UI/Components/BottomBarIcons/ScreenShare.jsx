import React, { useState } from 'react'
import styled from 'styled-components'
import ScreenShareRoundedIcon from '@mui/icons-material/ScreenShareRounded';
import StopScreenShareRoundedIcon from '@mui/icons-material/StopScreenShareRounded';

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

const ScreenShare = () => {
    const [ScreenShareState, setScreenShareState] = useState(true);
    function StateChange(){
        setScreenShareState(!ScreenShareState);
    }
    return (
        <Container onClick={StateChange}>
            {ScreenShareState ? <ScreenShareRoundedIcon sx={Style}/> : <StopScreenShareRoundedIcon sx={Style}/>}
        </Container>
    )
}

export default ScreenShare
