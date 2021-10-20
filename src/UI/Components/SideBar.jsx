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
    
    overflow: auto;

`
const ChatDiv = styled.div`
    border-radius: 5px;
    border: solid;
    border-color: white;
    height: 50%;
`
const MessagesSection = styled.div`
    top:0;
    overflow-y: auto;
    word-wrap: break-word;
    height: 90%;
    padding: 2%;
`
const NewMessageForm = styled.form`
    display: flex;
    width: 100%;
    border: solid;
    border-color: white;
    height: 10%;

`
const SubmitButton = styled.input`
    border-radius: 4px;
    border-style: solid;
    border-color: ${({ theme }) => theme.secondary};
    margin: -0.5%;
    background-color: ${({ theme }) => theme.textColor};
    color: black;
    font-family: 'Arial', Arial;
    font-weight: bold;
`
const Participants = styled.li`
    list-style: none; 
    border-radius: 100px;
    border-style: outset;
    background-color: #00000090;
    text-align: left;
    border-width: 0.1px;
    padding: 0.5%;
    padding-left: 5%;
`

const MessageBubble = styled.li`
    list-style: none; 
    border-radius: 10px;
    border-style: solid;
    border-width: 0.1px;
    margin-top: 2%;
    padding: 1%;
    background-color: #350042;
    &>h6{
        margin: 0;
        padding: 0 0 1% 1%;
    }
    &>p{
        margin: 0;
        padding: 0 0 1% 1%;
        font-family: 'Times New Roman', Times, serif;
        font-weight: 400;
    }

`


const Sidebar = ({users,messages, messageChangeCallback, submitCallback, currentMessage}) => {
    function validateEntry() {
        return currentMessage.length > 0;
      }
    return (
        <Container>
            <ParticipantsDiv>
                
                {
                    Object.keys(users).map((name, index) => {
                        return <Participants key={index}>{name}</Participants>
                    })
                }
                
            </ParticipantsDiv>
            <ChatDiv> 
                <MessagesSection > 
                    {messages.map((message, index) => {
                        return <MessageBubble key={index}><h6>{message.username+":"}</h6><p>{message.message}</p></MessageBubble>
                    })}
                </MessagesSection>
                <NewMessageForm onSubmit={submitCallback}>
                        <input style={{resize: 'none', width: '100%'}} type="text" value={currentMessage} onChange={messageChangeCallback} />
                        <SubmitButton disabled={!validateEntry()} type="submit" value="Send" />
                </NewMessageForm>

            </ChatDiv>
           
        </Container>
    )
}

export default Sidebar