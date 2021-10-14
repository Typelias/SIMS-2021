import React from 'react'
import styled from 'styled-components'
import GestureIcon from '@mui/icons-material/Gesture'; //whiteboard icon

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

const WhiteboardIcon = () => {
    
    function whiteboardClick(){
        console.log("you clicked whiteboard icon");
    }
    return (
        <Container onClick={whiteboardClick}>
            <GestureIcon sx={Style}/>
        </Container>
    )
}

export default WhiteboardIcon
