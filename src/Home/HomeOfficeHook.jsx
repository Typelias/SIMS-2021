import React from 'react'
import { useHistory} from "react-router-dom"
import  styled  from 'styled-components'
import { Box, Typography, Paper} from "@mui/material";
import CenterRipple from '@mui/material/ButtonBase'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const PaperStyle = styled(Paper)`
    text-align: center;
    background-color: ${({ theme }) => theme.colorGrey};
    line-height: 60px;
    height: 100%;
    width: 100%;
    cursor: pointer;
    transition: transform ease 300ms;
&:hover {
    background-color: ${({ theme }) => theme.headerNumber};
    transform: translate(0, -10px);
}
&:active {
    background-color: ${({ theme }) => theme.colorBlack};
}
`

function HookTest() {
    const [checked, setChecked] = React.useState(false);

    let history = useHistory()

    function goToOffice(){
        setChecked((prev) => !prev);
        
    }
    function goToHome(){ 
        history.push("/HomeUi")
    }
    
   

    const TypographyStyle = styled(Typography)`
        font-size: 24;
        font-weight: bold;
        text-align: center;
        color: black;
        font-family: "Arial Black", Arial Black;
    `

    

    return (
        <div>
        <Box sx={{width: "auto", height: "auto", display: 'flex', alignItems: "center", justifyContent: "center", flexWrap: 'wrap',
            '& > :not(style)': {
              m: 5,
              width: 150,
              height: 150,
            }, }}>
                
                <CenterRipple>
                <PaperStyle elevation={5} onClick={goToOffice}><BusinessRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><TypographyStyle>Office</TypographyStyle></PaperStyle>
                </CenterRipple>   
                <Box sx={{ position: 'absolute', display: 'flex', alignItems: "bottom", paddingTop: '8%', paddingRight: '10%'}}>
                    <Grow sx={{ width: 100, height: 100 }} in={checked}><AddCircleIcon/></Grow>
                    <Grow sx={{ width: 100, height: 100 }} in={checked}><AddCircleIcon/></Grow>

                </Box>
                
                <CenterRipple> 
                    <PaperStyle elevation={5} onClick={goToHome}><HomeWorkRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><TypographyStyle>Home</TypographyStyle></PaperStyle>
                </CenterRipple>    
            
        </Box>
        
        </div>
        
    )
    

}
export default HookTest
/*history.push("/OfficeUi")*/