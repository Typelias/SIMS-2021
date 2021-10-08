import React from 'react';
import { useHistory } from "react-router-dom"
import { styled } from '@mui/material/styles';
import { blue, purple, grey } from '@mui/material/colors';
import { Box, Card, CardContent, CardActions, Typography, Paper, PaperProps } from "@mui/material";
import CenterRipple from '@mui/material/ButtonBase'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';


const history = useHistory();


class PlaceChoice extends React.Component {
    
    testPaper = styled(Paper)(({theme}) => ({
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

    goToOffice(){
        console.log("office!")
        history.push("/OfficeChoice")
    }
    goToHome(){
        console.log("Home!")
        history.push("/HomeUi")
    }

    render() {
        
        
        return (
            <Box sx={{width: "auto", height: "auto", display: 'flex', alignItems: "center", justifyContent: "center", flexWrap: 'wrap',
            '& > :not(style)': {
              m: 5,
              width: 150,
              height: 150,
            }, }}>
                <CenterRipple>
                    <this.testPaper elevation={5} onClick={this.goToOffice}><BusinessRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><Typography sx={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: "black" }}>Office</Typography></this.testPaper>
                </CenterRipple>   
                <CenterRipple> 
                    <this.testPaper elevation={5} onClick={this.goToHome}><HomeWorkRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><Typography sx={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: "black" }}>Home</Typography></this.testPaper>
                </CenterRipple>
            
            </Box>
            
           
            
        );

    }

   
};


export default PlaceChoice;