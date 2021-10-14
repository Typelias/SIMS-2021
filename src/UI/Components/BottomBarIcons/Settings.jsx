import React from 'react'
import styled from 'styled-components'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

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

const Settings = () => {
    function SettingsClick(){
        console.log("you clicked Settings icon");
    }
    return (
        <Container onClick={SettingsClick}>
            <SettingsRoundedIcon sx={Style}/>
        </Container>
    )
}

export default Settings
