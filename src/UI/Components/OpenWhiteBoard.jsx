import React, {useState} from 'react'
import WindowPortal from '../WindowPortal';
import styled from 'styled-components'
import { Icon } from '@iconify/react'; //whiteboard icon


const Container = styled.div`
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;
    margin-left: 5vh;
    margin-right: 5vh;
    transition: transform ease 300ms;
    &:hover{
        transform: scale(1.5);

    }
`




export default class OpenWhiteBoard extends React.Component {

    state = {
        CurrIcon: false,
        showWindowPortal: false,
      };
      
      toggleWindowPortal = this.toggleWindowPortal.bind(this);
      closeWindowPortal = this.closeWindowPortal.bind(this);
    whiteboardClick(){
      this.setState(state => ({
        CurrIcon: !state.CurrIcon,
      }));
    }
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
            <Container onClick={this.toggleWindowPortal, this.whiteboardClick}>
                <Icon icon={this.CurrIcon ? "fluent:whiteboard-20-regular" : "fluent:whiteboard-20-filled"} style={{fontSize: 48}}/>

                {this.state.showWindowPortal && (
                    <WindowPortal closeWindowPortal={this.closeWindowPortal} >
                      <h1>Counter in a portal: </h1>
                      <p>Even though I render in a different window, I share state!</p>
                      <button onClick={() => this.closeWindowPortal()} >
                        Close me!
                      </button>
                    </WindowPortal>
                )}
            </Container>
        )
    }
}
