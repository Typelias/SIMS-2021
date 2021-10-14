import React, { useContext } from 'react'
import DashBoard from './Containers/DashBoard';
import { lightTheme, darkTheme } from './Styles/Theme'



const BaseUi = (props) => {
    return (
        
        <DashBoard Place={props.Place}/>
        

    )
}

export default BaseUi
