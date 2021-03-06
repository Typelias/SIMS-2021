import React from "react";
import ReactDOM from 'react-dom';

class WindowPortal extends React.Component {
    
      
      containerEl = null;
      externalWindow = null;
      

  
    componentDidMount() {
      
      // Create a new window, a div, and append it to the window
      // The div **MUST** be created by the window it is to be 
      // appended to or it will fail in Edge with a "Permission Denied"
      // or similar error.
      // See: https://github.com/rmariuzzo/react-new-window/issues/12#issuecomment-386992550
      let formData = window.localStorage.getItem("userInfo");
      formData = JSON.parse(formData);
      let room = formData.roomid; 
      this.externalWindow = window.open('http://localhost:3000/board/' + room, '', 'width=1400,height=800,left=100,top=100');
      this.containerEl = this.externalWindow.document.createElement('div');
      this.externalWindow.document.body.appendChild(this.containerEl);
  
      this.externalWindow.document.title = 'WhiteBoard';
      
  
      // update the state in the parent component if the user closes the 
      // new window
      this.externalWindow.addEventListener('beforeunload', () => {
        this.props.closeWindowPortal();
      });
    }
  
    componentWillUnmount() {
      // This will fire when this.state.showWindowPortal in the parent component becomes false
      // So we tidy up by just closing the window
      this.externalWindow.close();
    }
    
    render() {
      // The first render occurs before componentDidMount (where we open
      // the new window), so our container may be null, in this case
      // render nothing.
      if (!this.containerEl) {
        return null;
      } 
      
      // Append props.children to the container <div> in the new window
      return ReactDOM.createPortal(this.props.children, this.containerEl);  
    }
  }

  export default WindowPortal;