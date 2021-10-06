import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button, { ButtonProps } from '@mui/material/Button';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Card, CardContent, CardHeader, CardActions, Typography } from "@mui/material";

class ReactApp extends React.Component {


    render() {
        console.log("Hello");
        return (
            
            <Card sx={{width: "25%", bgcolor: "lightGray", height: "50%", margin: "0 auto"}}>
                <Typography sx={{ fontSize: 24, fontWeight: 'bold', padding: "5%", textAlign: 'center' }} >SPV Hybrid Meetings</Typography>
                <CardContent>
                    <Typography sx={{ fontSize: 12 }}  color="text.secondary">Please enter your information</Typography>
                    <TextField className="inputBox" label="Username" variant="outlined" required></TextField>
                    <TextField className="inputBox" label="Room ID" variant="outlined" required></TextField>
                </CardContent>
                <CardActions>
                    <PurpleButton variant="contained" color="success">CONTINUE<DoubleArrowIcon/></PurpleButton>
                </CardActions>
            </Card>
            
        );

    }

    
};

const PurpleButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    margin: "0% 20%",
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));


export default ReactApp;