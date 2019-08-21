import React from 'react';
import { 
  Button,
  Columns,
  Image,
  Section
} from 'react-bulma-components';

import './CoffeeDesk.scss';
import americano from '../images/americano.png';
import capuccino from '../images/capuccino.png';
import espresso from '../images/espresso.png';
import latte from '../images/latte.png';


export default function CoffeeDesk(props){
  const AMERICANO = "americano";
  const CAPUCCINO = "capuccino";
  const ESPRESSO = "espresso";
  const LATTE = "latte";

  const MILK_TYPES = {
    ALMOND: 'almond',
    SOY: 'soy',
    RICE: 'rice',
    LACTOSE_FREE: 'lactose_free',
    LIGHT: 'light',
    REGULAR: 'regular'
  }

  const selectCoffee = coffeeType => {
    props.grabCoffee(coffeeType);
  };

  return (
  <Section>
    <Columns>
      <Columns.Column size="one-fifth">
      </Columns.Column>
      <Columns.Column>
          <Columns>
            <Columns.Column size='half'>
              <Button color="white" onClick={() => selectCoffee(ESPRESSO) }className="Coffee-SelectionButton">
                <Image alt="Latte" src={espresso}/>
              </Button>
            </Columns.Column>
            <Columns.Column>
              <Button color="white" onClick={() => selectCoffee(LATTE)} className="Coffee-SelectionButton">
                <Image alt="Latte" src={latte}/>
              </Button>
            </Columns.Column>
          </Columns>
          <Columns>
            <Columns.Column size='half'>
              <Button color="white" 
                  className="Coffee-SelectionButton"
                  onClick={() => selectCoffee(CAPUCCINO)}>
                <Image alt="Capuccino" src={capuccino}/>
              </Button>
            </Columns.Column>
            <Columns.Column>
              <Button color="white"
                      className="Coffee-SelectionButton"
                      onClick={() => selectCoffee(AMERICANO)}>
                <Image src={americano} alt="Americano"/>
              </Button>
            </Columns.Column>
          </Columns>
      </Columns.Column>
    </Columns>
  </Section>
  )
}
