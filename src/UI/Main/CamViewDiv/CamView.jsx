import React from 'react'
import styled from 'styled-components'
import ImageHome from '../../../Assets/Images/conferenceRoom.jpg' 
import ImageOffice from '../../../Assets/Images/Office.png'



const CamView = (props) => {
    function imageView()  {
        if(props.Place === "Home"){
            return (ImageHome)
        }else{
            return (ImageOffice)
        }
    }

    const Container = styled.div`
    width: auto;
    height: 110%;
    background-image: url(${ imageView });
    background-size: 100% 100%;
    margin-left: -4%;
    margin-right: -4%;
 `

    return (
        <Container>
            
        </Container>
        

    )
}


export default CamView
