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


export const MILK_TYPES = {
  ALMOND: {value: 'almond', title: 'Almond'},
  SOY: {value: 'soy', title: 'Soy'},
  RICE: {value: 'rice', title: 'Rice'},
  LACTOSE_FREE: {value: 'lactose_free', title: 'Lactose Free'},
  LIGHT: {value: 'light', title: 'LIGHT'},
  REGULAR: {value:'regular', title: 'Regular'},
  NOT_APPLICABLE: {value:'not_applicable', title: ''},
};

export const ESPRESSO = "espresso";
export const AMERICANO = "americano";

export default function CoffeeDesk(props){
  const CAPUCCINO = "capuccino";
  const LATTE = "latte";

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
