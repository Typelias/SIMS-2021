import React from 'react';
import { Link, Redirect, useHistory } from "react-router-dom"
import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import { blue, purple, grey } from '@mui/material/colors';
import { Box, Card, CardContent, CardActions, Typography, Paper, PaperProps } from "@mui/material";
import CenterRipple from '@mui/material/ButtonBase'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';



const ChoiceButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    margin: "0% 20%",
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    }, 
  }));



class PlaceChoice extends React.Component {
    testPaper = styled(Paper)(({theme}) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        backgroundColor: grey[300],
        lineHeight: '60px',
        height: '100%',
        width: '100%',
        '&:hover': {
          backgroundColor: purple[500],
        },
        '&:active': {
            backgroundColor: purple[800],
        },
    }));

    goToOffice(){
        console.log("office!")
    }
    goToHome(){
        console.log("Home!")
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

/* 
<Card sx={{width: "25%", bgcolor: "lightGray", height: "50%", margin: "0 auto"}}>
                    <Typography sx={{ fontSize: 24, fontWeight: 'bold', padding: "5%", textAlign: 'center' }} >SPV Hybrid Meetings</Typography>
                    <CardContent>
                        <Typography sx={{ fontSize: 12 }}  color="text.secondary">Please enter your information</Typography>
                        <TextField 
                            className="inputBox" 
                            label="Username" 
                            variant="outlined">
                            </TextField>
                        <TextField 
                            className="inputBox" 
                            label="Room ID" 
                            variant="outlined">
                            </TextField>
                    </CardContent>
                </Card>
                <Card sx={{width: "25%", bgcolor: "lightGray", height: "50%", margin: "0 auto"}}>
                    <Typography sx={{ fontSize: 24, fontWeight: 'bold', padding: "5%", textAlign: 'center' }} >SPV Hybrid Meetings</Typography>
                    <CardContent>
                        <Typography sx={{ fontSize: 12 }}  color="text.secondary">Please enter your information</Typography>
                        <TextField 
                            className="inputBox" 
                            label="Username" 
                            variant="outlined">
                            </TextField>
                        <TextField 
                            className="inputBox" 
                            label="Room ID" 
                            variant="outlined">
                            </TextField>
                    </CardContent>
                </Card>
*/ 