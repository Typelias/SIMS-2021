import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background-color: ${({ theme }) => theme.secondary};
    position: fixed;
    right: 0;
    top: 0;
    bottom: 5rem;
    width: 16rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
`
const ParticipantsDiv = styled.div`
    border-radius: 5px;
    border: solid;
    border-color: white;
    height: 50%;
`
const ChatDiv = styled.div`
    border-radius: 5px;
    border: solid;
    border-color: white;
    height: 50%;
`

const Sidebar = () => {

    return (
        <Container>

            <ParticipantsDiv> Participants </ParticipantsDiv>
            <ChatDiv> Chat </ChatDiv>
           
        </Container>
    )
}

export default Sidebar