import React from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/:id" component={UserPage}/>
    </Switch>
  );
}

export default App;
