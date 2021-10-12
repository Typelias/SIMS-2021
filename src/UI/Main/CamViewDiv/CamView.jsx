import React from 'react'
import styled from 'styled-components'
import Image from '../../../Assets/Images/conferenceRoom.jpg' 

const ProfileImg = styled.img`
    height: 500px;
    width: 700px;

`
const container = {
    width: "100%",
    height: "80vh",
    backgroundImage: `url(${ Image })`,
    backgroundSize: "100% 100%",
    
}

const CamView = () => {
    return (
        <div style={container}>
            hej
        </div>
        
    )
}


export default CamView
