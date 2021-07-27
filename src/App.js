import React from 'react';
import MenuBar from './components/MenuBar';
import ScheduleCUD from './pages/ScheduleCUD';
import ScheduleR from './pages/ScheduleR';
import Login from './pages/Login';
import Admin from './pages/Admin';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return(
    <Router>
      <div className="App">
        <MenuBar />
        <Switch>
          {/* <Route path="/" exact>
            <Login />
          </Route>*/}
          <Route path="/login" exact>
            <Login />
          </Route> 
          <Route path="/daily" exact>
            <ScheduleCUD />
          </Route>
          <Route path="/list" exact>
            <ScheduleR />
          </Route>
          {/* <Route path="/change_password" exact>
            <Admin />
          </Route>  */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
