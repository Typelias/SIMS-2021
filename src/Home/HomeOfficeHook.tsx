import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { blue, purple, grey } from '@mui/material/colors';
import { Box, Card, CardContent, CardActions, Typography, Paper, PaperProps } from "@mui/material";
import CenterRipple from '@mui/material/ButtonBase'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';


function hookTest() {

    let history = useHistory()

    const TestPaper = styled(Paper)(({theme}) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        backgroundColor: grey[300],
        lineHeight: '60px',
        height: '100%',
        width: '100%',
        '&:hover': {
          backgroundColor: purple[300],
        },
        '&:active': {
            backgroundColor: purple[800],
        },
    }));
    
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
                    <TestPaper elevation={5} onClick={goToOffice}><BusinessRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><Typography sx={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: "black" }}>Office</Typography></TestPaper>
                </CenterRipple>   
                <CenterRipple> 
                    <TestPaper elevation={5} onClick={goToHome}><HomeWorkRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><Typography sx={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: "black" }}>Home</Typography></TestPaper>
                </CenterRipple>    
            
        </Box>
        
    )
    

}
export default hookTest