import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import  styled  from 'styled-components'
import { Box, Typography, Paper} from "@mui/material";
import CenterRipple from '@mui/material/ButtonBase'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';


function HookTest() {

    let history = useHistory()

    const PaperStyle = styled(Paper)`
        text-align: center;
        background-color: ${({ theme }) => theme.colorGrey};
        line-height: 60px;
        height: 100%;
        width: 100%;
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
    const TypographyStyle = styled(Typography)`
        font-size: 24;
        font-weight: bold;
        text-align: center;
        color: black;
    `
    
    function goToOffice(){

        console.log("office!")
        history.push("/OfficeUi")
    }
    function goToHome(){

        console.log("Home!")
          
        history.push("/HomeUi")
    }
    return (
        <Box sx={{width: "auto", height: "auto", display: 'flex', alignItems: "center", justifyContent: "center", flexWrap: 'wrap',
            '& > :not(style)': {
              m: 5,
              width: 150,
              height: 150,
            }, }}>
                <CenterRipple>
                    <PaperStyle elevation={5} onClick={goToOffice}><BusinessRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><TypographyStyle>Office</TypographyStyle></PaperStyle>
                </CenterRipple>   
                <CenterRipple> 
                    <PaperStyle elevation={5} onClick={goToHome}><HomeWorkRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><TypographyStyle>Home</TypographyStyle></PaperStyle>
                </CenterRipple>    
            
        </Box>
        
    )
    

}
export default HookTest