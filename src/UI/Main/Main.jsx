import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import CamView from './CamViewDiv/CamView'
import {UserVid} from "../../WebRTC/WebRTCMain";


const Container = styled.div`
  width: auto;
  height: 85vh;
  margin-right: 16rem;
  position: relative;
  padding: 0 4rem;
`




const Main = ({place, list, children}) => {


    return (
        <Container>
            <CamView place={place}/>
            {children}
        </Container>
    )
}

export default Main
