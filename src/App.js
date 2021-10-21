import ReactApp from './Home/ReactApp';
import PlaceChoice from './Home/PlaceChoice';
import { HashRouter, Link, Route, Switch } from "react-router-dom"
import WebRTCMain from './WebRTC/WebRTCMain';
import Whiteboard from './Whiteboard/Whiteboard';
import OfficeUi from './Home/OfficeUi';
import HomeUi from './Home/HomeUi';
import HomeOfficeHook from './Home/HomeOfficeHook';
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './UI/Styles/Theme'

function App() {
  
  return (
    <HashRouter>
        <ThemeProvider theme={darkTheme}>
            <div className="App">
                <div className="menu">
                    <Link to="/"><h2>Home</h2></Link>
                    <Link to="/WebRTC"><h2>WebRTC</h2></Link>
                    <Link to="/WhiteBoard"><h2>WhiteBoard</h2></Link>

                </div>

                <Switch>
                    <Route exact path="/" component={ReactApp} />
                    <Route exact path="/PlaceChoice" component={PlaceChoice}/>
                    <Route exact path="/OfficeUi" component={OfficeUi}/>
                    <Route exact path="/HomeOfficeHook" component={HomeOfficeHook}/>
                    <Route exact path="/HomeUi" component={HomeUi}/>
                    <Route exact path="/WebRTC" component={WebRTCMain} />
                    <Route exact path='/WhiteBoard' component={Whiteboard}/>
                </Switch>
            </div>
        </ThemeProvider>
        </HashRouter>
  );
}

export default App;
