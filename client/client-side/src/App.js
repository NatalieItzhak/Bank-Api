import './App.css';
import Client_side from './componets/Client_side'
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './componets/Home'
import Navbar from './componets/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/users">
              <Client_side />
            </Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
