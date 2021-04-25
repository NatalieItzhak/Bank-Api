import './App.css';
import Client_side from './componets/Client_side'
import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './componets/Home'
import Navbar from './componets/Navbar';
import Actions from './componets/Actions';
import NewAccount from './componets/NewAccount';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router>
          <div className="container">
            <Navbar />
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/users">
              <Client_side />
            </Route>
            <Route exact path="/new-account">
              <NewAccount/>
            </Route>
            <Route exact path="/actions">
              <Actions />
            </Route>

          </div>
        </Router>
      </BrowserRouter>

    </div>
  );
}

export default App;
