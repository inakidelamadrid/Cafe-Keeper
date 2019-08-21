import React from 'react';
import { Container, Heading, Section } from 'react-bulma-components';
import { Switch, Route } from 'react-router-dom';

import 'react-bulma-components/dist/react-bulma-components.min.css';
// import CoffeeDesk from './pages/CoffeeDesk';
import OrderForm from './pages/OrderForm';

function App() {
  return (
    <Container>
      <Section>
        <Heading>Cafe Keeper</Heading>
      </Section>
      <Switch>
        <Route exact path="/" component={OrderForm}/>
      </Switch>
    </Container>
  );
}

export default App;
