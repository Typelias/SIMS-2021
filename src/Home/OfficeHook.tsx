import React from "react";
import { styled } from '@mui/material/styles';
import {  purple, grey } from '@mui/material/colors';
import { Box, Card, CardContent, CardActions, Typography, Paper, PaperProps } from "@mui/material";
import CenterRipple from '@mui/material/ButtonBase'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';



function OfficeHook(){
    
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

    const [loading, setLoading] = React.useState(false);

    function leaderRole(){
        console.log("leader")
        setLoading(true);
        console.log(loading)
    }

    return(
        <Box sx={{width: "auto", height: "auto", display: 'flex', alignItems: "center", justifyContent: "center", flexWrap: 'wrap',
            '& > :not(style)': {
              m: 5,
              width: 150,
              height: 150,
            }, }}>
                <CenterRipple disabled={loading}>
                    <TestPaper elevation={5} onClick={leaderRole} ><GavelRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><Typography sx={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: "black" }}>Leader</Typography></TestPaper>
                </CenterRipple>   
                <CenterRipple> 
                    <TestPaper elevation={5}><PeopleRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><Typography sx={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: "black" }}>Participant</Typography></TestPaper>
                </CenterRipple>    
            
        </Box>
    )
}

export default OfficeHook