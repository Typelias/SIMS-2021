import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import TextField from '@mui/material/TextField';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import styled from 'styled-components'
import Button from '@mui/material/Button';



function SignInHook() {
    let history = useHistory();
    
    
    
    const [username, setUsername] = useState("");
    const [roomid, setRoomid] = useState("");
    
    
    function validateEntry() {
      return username.length > 0 && roomid.length > 0;
    }

    function handleClick() {
        console.log("current Username is: " + username)
        console.log("current RoomId is: " + roomid)
        history.push("/PlaceChoice")
      }


   
    const PurpleButton = styled(Button)`
        color: ${({ theme }) => theme.textColor};
        border: none;
        margin-left: 5%;
        background-color: ${({ theme }) => theme.headerNumber};
        padding: 2%;
        border-radius: 8px;
        &:hover {
          background-color: ${({ theme }) => theme.secondary};
        }
        `
    

    return (
        <Card sx={{width: "25%", bgcolor: "lightGray", height: "50%", margin: "0 auto"}}>
        <Typography sx={{ fontSize: 24, fontWeight: 'bold', padding: "5%", textAlign: 'center' }} >SPV Hybrid Meetings</Typography>
        <CardContent>
            <Typography sx={{ fontSize: 12, margin: "2%" }}  color="text.secondary">Please enter your information</Typography>
            <TextField 
                sx={{ margin: "2%" }}
                className="inputBox" 
                label="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                variant="outlined">
                </TextField>
            <TextField 
                sx={{ margin: "2%" }}
                className="inputBox" 
                label="Room ID" 
                value={roomid}
                onChange={(e) => setRoomid(e.target.value)}
                variant="outlined">
                </TextField>
        </CardContent>
        <CardActions>
          <PurpleButton variant="contained" disabled={!validateEntry()} onClick={handleClick} endIcon={<DoubleArrowIcon/>}>CONTINUE</PurpleButton>
            
        </CardActions>
    </Card>
   )
   
}


export default SignInHook

