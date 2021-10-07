import React from 'react';
import { Link, Redirect, useHistory } from "react-router-dom"
import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';






class PlaceChoice extends React.Component {
    

    validateEntry() {
        console.log("Username in PlaceChoice is: " )
    }

    render() {
        
        
        return (
            <Card sx={{width: "50%", bgcolor: "lightGray", height: "50%", margin: "0 auto"}}>
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
                        <Button onClick={this.validateEntry}>hej</Button>
                </CardContent>
            </Card>
            
           
            
        );

    }

   
};



export default PlaceChoice;