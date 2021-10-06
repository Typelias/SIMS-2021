import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button, { ButtonProps } from '@mui/material/Button';


export default function SignInHook() {

    const [username, setUsername] = useState("");
    const [roomid, setRoomid] = useState("");
    
    function validateEntry() {
      return username.length > 0 && roomid.length > 0;
    }

    function handleClick() {
        console.log("current Username is: " + username)
        console.log("current RoomId is: " + roomid)
      }



    const PurpleButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        margin: "0% 20%",
        backgroundColor: purple[500],
        '&:hover': {
          backgroundColor: purple[700],
        },
      }));
    

    return (
        <Card sx={{width: "25%", bgcolor: "lightGray", height: "50%", margin: "0 auto"}}>
        <Typography sx={{ fontSize: 24, fontWeight: 'bold', padding: "5%", textAlign: 'center' }} >SPV Hybrid Meetings</Typography>
        <CardContent>
            <Typography sx={{ fontSize: 12 }}  color="text.secondary">Please enter your information</Typography>
            <TextField 
                className="inputBox" 
                label="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                variant="outlined">
                </TextField>
            <TextField 
                className="inputBox" 
                label="Room ID" 
                value={roomid}
                onChange={(e) => setRoomid(e.target.value)}
                variant="outlined">
                </TextField>
        </CardContent>
        <CardActions>
            <PurpleButton variant="contained" type="submit" color="success" disabled={!validateEntry()} onClick={handleClick}>CONTINUE<DoubleArrowIcon/></PurpleButton>
        </CardActions>
    </Card>
   )
}

