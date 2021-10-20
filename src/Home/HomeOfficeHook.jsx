import React from 'react'
import { useHistory} from "react-router-dom"
import  styled  from 'styled-components'
import { Box, Typography, Paper} from "@mui/material";
import CenterRipple from '@mui/material/ButtonBase'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';

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

    let history = useHistory()

    function goToOffice(){
        history.push("/OfficeUi")
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
        <Box sx={{width: "auto", height: "auto", display: 'flex', alignItems: "center", justifyContent: "center", flexWrap: 'wrap',
            '& > :not(style)': {
              m: 5,
              width: 150,
              height: 150,
            }, }}>
                <CenterRipple>
                    <PaperStyle elevation={5} onClick={goToOffice}><BusinessRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><TypographyStyle>Office</TypographyStyle></PaperStyle>
                </CenterRipple>   
                <CenterRipple> 
                    <PaperStyle elevation={5} onClick={goToHome}><HomeWorkRoundedIcon sx={{ fontSize: 70, marginTop: '5%' }}/><TypographyStyle>Home</TypographyStyle></PaperStyle>
                </CenterRipple>    
            
        </Box>
        
    )
    

}
export default HookTest