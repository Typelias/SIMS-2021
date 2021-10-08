import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactApp from './Home/ReactApp';
import PlaceChoice from './Home/PlaceChoice';
import { HashRouter, Link, Route, Switch } from "react-router-dom"
import WebRTCMain from './WebRTC/WebRTCMain';
import OfficeUi from './Home/OfficeUi';
import HomeUi from './Home/HomeUi';
import HomeOfficeHook from './Home/HomeOfficeHook';
import WhiteBoard from './Whiteboard/WhiteboardMain';


function render() {
    ReactDOM.render(
        <HashRouter>
            <div className="App">
                <div className="menu">
                    <Link to="/"><h2>Home</h2></Link>
                    <Link to="/WebRTC"><h2>WebRTC</h2></Link>
                    <Link to="/Whiteboard"><h2>Whiteboard</h2></Link>
                </div>

                <Switch>
                    <Route exact path="/" component={ReactApp} />
                    <Route exact path="/PlaceChoice" component={PlaceChoice}/>
                    <Route exact path="/OfficeUi" component={OfficeUi}/>
                    <Route exact path="/HomeOfficeHook" component={HomeOfficeHook}/>
                    <Route exact path="/HomeUi" component={HomeUi}/>
                    <Route exact path="/WebRTC" component={WebRTCMain} />
                    <Route exact path="/Whiteboard" component={WhiteBoard} />
                </Switch>
            </div>

        </HashRouter>

        , document.getElementById('root'));
}

render();