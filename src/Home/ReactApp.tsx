import React from 'react';
import SignInHook from "./SignInHook";




class ReactApp extends React.Component {

    
    handleClick() {

        console.log('You clicked submit.');
    }

    render() {
        
        console.log("Hello");
        return (
            <SignInHook></SignInHook>
            
            
        );

    }

    
};



export default ReactApp;