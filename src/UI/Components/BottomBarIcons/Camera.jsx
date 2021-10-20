import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react';

const Style = {
    fontSize: 40
}
const Container = styled.div`
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;
    margin-left: 5vh;
    margin-right: 5vh;
    transition: transform ease 300ms;
    &:hover{
        transform: scale(1.5);

    }
`

const Camera = ({video}) => {
    const [CamState, setCamstate] = useState(true);
    function StateChange(){
        setCamstate(!CamState);
        video();
    }
    return (
        <Container onClick={StateChange}>{CamState ? <Icon icon="bi:camera-video" style={Style}/> : <Icon icon="bi:camera-video-off" style={Style}/>}</Container>
    )
}

export default Camera
