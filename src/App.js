import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import CoffeeDesk from './pages/CoffeeDesk';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={CoffeeDesk}/>
    </Switch>
  );
}

export default App;
