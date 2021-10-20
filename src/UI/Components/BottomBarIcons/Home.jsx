import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react';

const Style = {
    fontSize: 40
}
const Container = styled.div`
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;
    margin-left: 5vh;
    margin-right: 5vh;
    transition: transform ease 300ms;
    &:hover{
        transform: scale(1.5);

    }
`

const Home = () => {
    return (
        <Container>
            <Icon icon="icomoon-free:exit" style={Style}/>
        </Container>
    )
}

export default Home
