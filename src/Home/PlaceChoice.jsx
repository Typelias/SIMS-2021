import React, { useState} from 'react';
import HomeOfficeHook from './HomeOfficeHook';
import WindowPortal from '../UI/WindowPortal';





class PlaceChoice extends React.Component  {

    
        
        
        

    uName = this.props.location.state
    
    render() {
        
        return (
            <div>
                <HomeOfficeHook/>
                
            </div>
            
            
            
           
            
        );
    }
    

   
};


export default PlaceChoice;