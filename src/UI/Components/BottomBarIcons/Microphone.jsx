import React, {useState} from 'react'
import styled from 'styled-components'
import MicRoundedIcon from '@mui/icons-material/MicRounded'; //mic on icon
import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';      //mic off icon




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

const Microphone = ({mute}) => {
    const [MicState, setMicstate] = useState(true);
    function MicStateChange(){
        setMicstate(!MicState);
        mute();
    }

    return (
        <Container onClick={MicStateChange}>
            {MicState ? <MicRoundedIcon sx={Style}/> : <MicOffRoundedIcon sx={Style}/>}
        </Container>
    )
}

export default Microphone
