import React from 'react'
import styled from 'styled-components'
import Image from '../../../Assets/Images/conferenceRoom.jpg' 

const Container = styled.div`
    width: auto;
    height: 110%;
    background-image: url(${ Image });
    background-size: 100% 100%;
    margin-left: -4%;
    margin-right: -4%;
 `

const CamView = () => {
    return (
        <Container>
            
        </Container>
        

    )
}


export default CamView
