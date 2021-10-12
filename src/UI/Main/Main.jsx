import React from 'react'
import CamView from './CamViewDiv/CamView'

const Container = {
    width: "auto",
    marginRight: "16rem",
    position: "relative",
    padding: "0 4rem",
}

const Main = () => {
    return (
        <div style={Container}>
            <CamView/>
        </div>
    )
}

export default Main
