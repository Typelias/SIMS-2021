import React from 'react';
import HomeOfficeHook from './HomeOfficeHook';
import WindowPortal from '../UI/WindowPortal';





class PlaceChoice extends React.Component  {

    
        
        
        state = {
          counter: 0,
          showWindowPortal: false,
        };
        
        toggleWindowPortal = this.toggleWindowPortal.bind(this);
        closeWindowPortal = this.closeWindowPortal.bind(this);
      
      componentDidMount() {
        window.addEventListener('beforeunload', () => {
          this.closeWindowPortal();
        });
        
        window.setInterval(() => {
          this.setState(state => ({
            counter: state.counter + 1
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

    uName = this.props.location.state
    
    render() {
        
        return (
            <div>
                <HomeOfficeHook/>
                <button onClick={this.toggleWindowPortal}>
                    {this.state.showWindowPortal ? 'Close the' : 'Open a'} Portal
                </button>
                {this.state.showWindowPortal && (
                    <WindowPortal closeWindowPortal={this.closeWindowPortal} >
                      <h1>Counter in a portal: {this.state.counter}</h1>
                      <p>Even though I render in a different window, I share state!</p>

                      <button onClick={() => this.closeWindowPortal()} >
                        Close me!
                      </button>
                    </WindowPortal>
                )}
            </div>
            
            
            
           
            
        );
    }
    

   
};


export default PlaceChoice;