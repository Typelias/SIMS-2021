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

    //lås för leader tas bort om det är för jobbigt att implementera!
    const [loading, setLoading] = React.useState(false);
    const [leader, setLeader] = React.useState(0);
    function leaderRole(){
        setLoading(true);
        setLeader(1)
    }

    return(
        <Box sx={{width: "auto", height: "auto", display: 'flex', alignItems: "center", justifyContent: "center", flexWrap: 'wrap',
            '& > :not(style)': {
              m: 5,
              width: 150,
              height: 150,
            }, }}>
                <CenterRipple disabled={loading}>
                    <TestPaper elevation={5} onClick={leaderRole}><GavelRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><Typography sx={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: "black" }}>Leader</Typography><br/><Typography sx={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: "black" }}>{leader}/1</Typography></TestPaper>
                    
                </CenterRipple>   
                <CenterRipple> 
                    <TestPaper elevation={5}><PeopleRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><Typography sx={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: "black" }}>Participant</Typography></TestPaper>
                </CenterRipple>    
            
        </Box>
    )
}

export default OfficeHook