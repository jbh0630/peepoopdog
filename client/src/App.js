import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import FindWashroom from './pages/FindWashroom';
// import MainPage from './pages/MainPage';

function App() {
    return(
      <Router>
//         <Route exact path="/mainpage" component={MainPage} />
        <Route exact path="/findwashroom" component={FindWashroom} />
      </Router>
    );
}

export default App;
