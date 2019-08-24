import React from 'react';
import { Container, Heading, Section } from 'react-bulma-components';
import { Switch, Route } from 'react-router-dom';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import {CoffeesProvider} from './CoffeesContext';
import OrderForm from './pages/OrderForm';
import RenderPropsExample from './pages/RenderProps';


function App() {
  const COFFEES = {
    MILK_TYPES: {
      ALMOND: {value: 'almond', title: 'Almond'},
      SOY: {value: 'soy', title: 'Soy'},
      RICE: {value: 'rice', title: 'Rice'},
      LACTOSE_FREE: {value: 'lactose_free', title: 'Lactose Free'},
      LIGHT: {value: 'light', title: 'LIGHT'},
      REGULAR: {value:'regular', title: 'Regular'},
      NOT_APPLICABLE: {value:'not_applicable', title: ''},
    },
    TYPES: {
      ESPRESSO : "espresso",
      AMERICANO : "americano",
      CAPUCCINO : "capuccino",
      LATTE : "latte",
    }
  };

  return (
    <Container>
      <Section>
        <Heading>Cafe Keeper</Heading>
      </Section>
      <Switch>
        <CoffeesProvider value={COFFEES}>
          <Route exact path="/" component={OrderForm}/>
        </CoffeesProvider>
        <Route path="/renderProps" component={RenderPropsExample}/>
      </Switch>
    </Container>
  );
}

export default App;
