import ReactApp from './Home/ReactApp';
import PlaceChoice from './Home/PlaceChoice';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import WebRTCMain from './WebRTC/WebRTCMain';
//import Whiteboard from './Whiteboard/WhiteBoard';
import Board from "./WebRTC/board";
import OfficeUi from './Home/OfficeUi';
import HomeUi from './Home/HomeUi';
import HomeOfficeHook from './Home/HomeOfficeHook';
import {ThemeProvider} from 'styled-components'
import {darkTheme} from './UI/Styles/Theme'
import OfficeNonLeader from "./UI/OfficeNonLeader";

function App() {

    return (
        <BrowserRouter>

            <div className="App">
                <Switch>
                    <ThemeProvider theme={darkTheme}>
                        <Route exact path="/" component={ReactApp}/>
                        <Route exact path="/PlaceChoice" component={PlaceChoice}/>
                        <Route exact path="/OfficeUi" component={OfficeUi}/>
                        <Route exact path="/HomeOfficeHook" component={HomeOfficeHook}/>
                        <Route exact path="/HomeUi" component={HomeUi}/>
                        <Route exact path="/WebRTC" component={WebRTCMain}/>
                        <Route exact path="/OfficeNonLeader" component={OfficeNonLeader}/>
                        <Route exact path="/Board/:id" component={Board}/>
                    </ThemeProvider>
                </Switch>
            </div>

        </BrowserRouter>
    );
}

export default App;

/** links to other apps
 * <div className="menu">
 <Link to="/"><HomeIcon fontSize="large"/></Link>

 * <Link to="/WebRTC"><h2>WebRTC</h2></Link>
 * <Link to="/Whiteboard"><h2>Whiteboard</h2></Link>
 * </div>*/
