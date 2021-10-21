import React from 'react'
import WindowPortal from '../UI/WindowPortal';

export default class OpenWhiteBoard extends React.Component {
    state = {
        showWindowPortal: false,
      };
      
      toggleWindowPortal = this.toggleWindowPortal.bind(this);
      closeWindowPortal = this.closeWindowPortal.bind(this);
    
    componentDidMount() {
      window.addEventListener('beforeunload', () => {
        this.closeWindowPortal();
      });
      
      window.setInterval(() => {
        this.setState(() => ({
          
        }));
      }, 1000);
      
    }
    
    toggleWindowPortal() {
      this.setState(state => ({
        ...state,
        showWindowPortal: !state.showWindowPortal,
      }));
    }
    
    closeWindowPortal() {
      this.setState({ showWindowPortal: false })
    }

    render() {
        return (
            <div>
                <button onClick={this.toggleWindowPortal}>
                    {this.state.showWindowPortal ? 'Close the' : 'Open a'} Portal
                </button>
                {this.state.showWindowPortal && (
                    <WindowPortal closeWindowPortal={this.closeWindowPortal} >
                      <h1>Counter in a portal: </h1>
                      <p>Even though I render in a different window, I share state!</p>
                      <button onClick={() => this.closeWindowPortal()} >
                        Close me!
                      </button>
                    </WindowPortal>
                )}
            </div>
        )
    }
}
