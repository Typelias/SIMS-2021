import React from 'react';
import TextField from '@mui/material/TextField';
import { Card, CardContent, CardHeader } from "@mui/material";

class ReactApp extends React.Component {


    render() {
        console.log("Hello");
        return (
            <Card sx={{width: "25%", bgcolor: "gray", height: "50%", margin: "0 auto"}}>
                <CardHeader title="SPV Hybrid meetings" subheader="Please enter your information">
                </CardHeader>
                <CardContent>
                    <TextField className="inputBox" label="Username" variant="outlined"></TextField>
                    <TextField className="inputBox" label="Room ID" variant="outlined"></TextField>
                </CardContent>
            </Card>
        );

    }

};

export default ReactApp;