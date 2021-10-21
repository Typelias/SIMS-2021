import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'; //whiteboard icon


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
    
    const [CurrIcon, setCurrIcon] = useState(false);

    function whiteboardClick(){
        setCurrIcon(!CurrIcon);
    }
    return (
        <Container onClick={whiteboardClick}>
            <Icon icon={CurrIcon ? "fluent:whiteboard-20-regular" : "fluent:whiteboard-20-filled"} style={{fontSize: 48}}/>
        </Container>
    )
}

export default WhiteboardIcon
