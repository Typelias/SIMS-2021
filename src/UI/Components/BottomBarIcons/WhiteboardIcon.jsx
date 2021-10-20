import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'; //whiteboard icon

const Style = {
    fontSize: 48
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

const WhiteboardIcon = () => {
    
    function whiteboardClick(){
        console.log("you clicked whiteboard icon");
    }
    return (
        <Container onClick={whiteboardClick}>
            <Icon icon="fluent:whiteboard-20-regular" style={Style}/>
        </Container>
    )
}

export default WhiteboardIcon
