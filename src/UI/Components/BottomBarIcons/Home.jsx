import React from 'react'
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/Home';

const Style = {
    fontSize: 40
}
const Container = styled.div`
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;
    margin: 5vh;
    transition: transform ease 300ms;
    &:hover{
        transform: scale(1.5);

    }
`

const Home = () => {
    return (
        <Container>
            <HomeIcon sx={Style}/>
        </Container>
    )
}

export default Home
