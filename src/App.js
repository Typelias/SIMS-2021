import ReactApp from './Home/ReactApp';
import PlaceChoice from './Home/PlaceChoice';
import { HashRouter, Route, Switch } from "react-router-dom"
import WebRTCMain from './WebRTC/WebRTCMain';
import OfficeUi from './Home/OfficeUi';
import HomeUi from './Home/HomeUi';
import HomeOfficeHook from './Home/HomeOfficeHook';
import WhiteBoard from './Whiteboard/WhiteBoard';
import { ThemeProvider } from 'styled-components'
import {  darkTheme } from './UI/Styles/Theme'

function App() {

  return (
    <HashRouter>
        
      <div className="App">
          <Switch>
            <ThemeProvider theme={darkTheme}>
              <Route exact path="/" component={ReactApp} />
              <Route exact path="/PlaceChoice" component={PlaceChoice}/>
              <Route exact path="/OfficeUi" component={OfficeUi}/>
              <Route exact path="/HomeOfficeHook" component={HomeOfficeHook}/>
              <Route exact path="/HomeUi" component={HomeUi}/>
              <Route exact path="/WebRTC" component={WebRTCMain} />
              <Route exact path="/Whiteboard" component={WhiteBoard} />
            </ThemeProvider>
          </Switch>
      </div>
  
    </HashRouter>
  );
}

export default App;

/** links to other apps
 * <div className="menu">
                    <Link to="/"><HomeIcon fontSize="large"/></Link>
                
 * <Link to="/WebRTC"><h2>WebRTC</h2></Link>
 * <Link to="/Whiteboard"><h2>Whiteboard</h2></Link>
 * </div>*/
