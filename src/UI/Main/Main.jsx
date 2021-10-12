import React from 'react'
import styled  from 'styled-components'
import CamView from './CamViewDiv/CamView'


const Container = styled.div`
    width: auto;
    margin-right: 16rem;
    position: relative;
    padding: 0 4rem;
`


const Main = () => {
    return (
        <Container>
            <CamView/>
        </Container>
    )
}

export default Main
