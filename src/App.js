import ReactApp from './Home/ReactApp';
import PlaceChoice from './Home/PlaceChoice';
import { HashRouter, Link, Route, Switch } from "react-router-dom"
import WebRTCMain from './WebRTC/WebRTCMain';
import OfficeUi from './Home/OfficeUi';
import HomeUi from './Home/HomeUi';
import HomeOfficeHook from './Home/HomeOfficeHook';
import WhiteBoard from './Whiteboard/WhiteBoard';
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './UI/Styles/Theme'
import HomeIcon from '@mui/icons-material/Home';

function App() {

  return (
    <HashRouter>
        <ThemeProvider theme={darkTheme}>
            <div className="App">
                <div className="menu">
                    <Link to="/"><HomeIcon fontSize="large"/></Link>
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
        </ThemeProvider>
        </HashRouter>
  );
}

export default App;

/** links to other apps
 * <Link to="/WebRTC"><h2>WebRTC</h2></Link>
 * <Link to="/Whiteboard"><h2>Whiteboard</h2></Link>*/
