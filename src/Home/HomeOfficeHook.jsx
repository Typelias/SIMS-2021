import React from 'react'
import { useHistory} from "react-router-dom"
import styled from 'styled-components'
import { Box, Typography, Paper} from "@mui/material";
import CenterRipple from '@mui/material/ButtonBase'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import { Icon } from '@iconify/react';
import Grow from '@mui/material/Grow';



const PaperStyle = styled(Paper)`
    text-align: center;
    background-color: ${({ theme }) => theme.colorGrey};
    line-height: 60px;
    margin-right: 20%;
    padding: 5%;
    width: 25vh;
    height: 18vh;
    cursor: pointer;
    transition: transform ease 300ms;
    &:hover {
        background-color: ${({ theme }) => theme.headerNumber};
        transform: translate(0, -10px);
    }
    &:active {
        background-color: ${({ theme }) => theme.colorBlack};
    }
`

const SmallPaper = styled(Paper)`
    text-align: center;
    background-color: ${({ theme }) => theme.colorGrey};
    line-height: 60px;
    margin-right: 10%;
    padding: 5%;
    border-radius: 30px;
    cursor: pointer;
    transition: transform ease 300ms;
    &:hover {
        background-color: ${({ theme }) => theme.headerNumber};
        transform: translate(0, -10px);
    }
    &:active {
        background-color: ${({ theme }) => theme.colorBlack};
    }
`

function HookTest() {
    const [checked, setChecked] = React.useState(false);

    let history = useHistory()
    function pickOfficeMode(){
        setChecked((prev) => !prev);
    }

    function goToOfficeAsLeader(){
        history.push({
            pathname: "/OfficeUi",
            state: "Meeting Leader",
          });
        console.log("meetingLeader entered!")
    }
    function goToOfficeAsParticipant(){
        history.push("/OfficeUi")
    }

    function goToHome(){ 
        history.push("/HomeUi")
    }
    


    const TypographyStyle = styled(Typography)`
        font-size: 24;
        font-weight: bold;
        text-align: center;
        color: black;
        font-family: "Arial Black", Arial Black;
    `
    const TypographyStyleTwo = styled(Typography)`
    font-size: 24;
    font-weight: bold;
    margin-top: -10%;
    text-align: center;
    color: black;
    
    font-family: "Arial Black", Arial Black;
`
    const IconStyle = styled(Icon)`
        font-size: 40px;
        
        

    `
    

    return (
        <div>
        <Box sx={{width: "auto", height: "auto", display: 'flex', alignItems: "center", justifyContent: "center", flexWrap: 'wrap', m: 10, gap: '8%' }}>
                
                <CenterRipple>
                    <PaperStyle elevation={5} onClick={pickOfficeMode}><BusinessRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><TypographyStyle>Office</TypographyStyle></PaperStyle>
                </CenterRipple>   
                <Box sx={{ position: 'absolute', display: 'flex', alignItems: "left", justifyContent: "left",  marginLeft: '-20%', marginTop: '20%'}}>
                    <Grow sx={{ width: '25vh', height: '12vh' }} in={checked}><SmallPaper elevation={5} onClick={goToOfficeAsLeader} ><IconStyle icon="si-glyph:person-people" /><TypographyStyleTwo>Meeting Leader</TypographyStyleTwo></SmallPaper></Grow>
                    <Grow sx={{ width: '25vh', height: '12vh' }} in={checked}><SmallPaper elevation={5} onClick={goToOfficeAsParticipant}><IconStyle icon="fluent:people-community-24-filled" /><TypographyStyleTwo>Participant</TypographyStyleTwo></SmallPaper></Grow>
                </Box>
                
                <CenterRipple> 
                    <PaperStyle elevation={5} onClick={goToHome}><HomeWorkRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><TypographyStyle>Home</TypographyStyle></PaperStyle>
                </CenterRipple>    
        </Box>
        
        </div>
        
    )
    

}
export default HookTest
/*history.push("/OfficeUi")
'& > :not(style)': {
              m: 5,
              width: 150,
              height: 150,
            },*/