import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background-color: ${({ theme }) => theme.secondary};
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    height: 5rem;
    display: flex;
    flex-direction: row;
`

const BottomBar = () => {

    return (
        <Container>

            coolBottomBar
           
        </Container>
    )
}

export default BottomBar