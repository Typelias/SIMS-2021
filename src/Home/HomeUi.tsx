import React from 'react';
import HomeCameraView from '../CameraView/HomeCameraView';


class HomeUi extends React.Component  {

    render(){
        return(
            <div>
                <h1>This is Home!</h1>
                <HomeCameraView/>
            </div>
            

        );
    }

}

export default HomeUi;