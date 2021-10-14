import React from 'react';
import SideBar from '../Components/SideBar';
import Main from '../Main/Main';
import BottomBar from '../Components/BottomBar';



const DashBoard = (props) => {
    return (
        <div>
            <SideBar/>
            <Main Place={props.Place}/>
            <BottomBar/>
        </div>
    )
}

export default DashBoard
