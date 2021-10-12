import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { blue, purple, grey } from '@mui/material/colors';
import { Box, Typography, Paper} from "@mui/material";
import CenterRipple from '@mui/material/ButtonBase'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';


function HookTest() {

    let history = useHistory()

    const TestPaper = styled(Paper)(({theme}) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        backgroundColor: grey[300],
        lineHeight: '60px',
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        transition: 'transform ease 300ms',
        '&:hover': {
            backgroundColor: purple[300],
            transform: 'translate(0, -10px)',
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
export default HookTest