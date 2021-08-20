import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";


import Homepage from './pages/HomePage';

function App() {
    return(
      <Router>
        <Route exact path="/homepage" component={Homepage} />
      </Router>
    );
}

export default App;
