import React from 'react'
import styled  from 'styled-components'
import CamView from './CamViewDiv/CamView'


const Container = styled.div`
    width: auto;
    height: 85vh;
    margin-right: 16rem;
    position: relative;
    padding: 0 4rem;
`


const Main = (props) => {
    return (
        <Container>
            <CamView Place={props.Place}/>
        </Container>
    )
}

export default Main
