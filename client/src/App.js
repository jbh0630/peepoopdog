import React from 'react';
import {
  BrowserRouter as Router,
  Route
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
