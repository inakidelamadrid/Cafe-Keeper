import React from 'react';
import { 
  Button,
  Columns,
  Container,
  Heading,
  Image,
  Section
} from 'react-bulma-components';

import './CoffeeDesk.scss';
import americano from '../images/americano.png';
import capuccino from '../images/capuccino.png';
import espresso from '../images/espresso.png';
import latte from '../images/latte.png';


export default function CoffeeDesk(){
  return (
    <Container>
      <Section>
        <Heading>Cafe Keeper</Heading>
      </Section>

      <Section>
        <Columns>
          <Columns.Column size="one-fifth">
          </Columns.Column>
          <Columns.Column>
              <Columns>
                <Columns.Column size='half'>
                  <Button color="white" className="Coffee-SelectionButton">
                    <Image alt="Latte" src={espresso}/>
                  </Button>
                </Columns.Column>
                <Columns.Column>
                  <Button color="white" className="Coffee-SelectionButton">
                    <Image alt="Latte" src={latte}/>
                  </Button>
                </Columns.Column>
              </Columns>
              <Columns>
                <Columns.Column size='half'>
                  <Button color="white" className="Coffee-SelectionButton">
                    <Image alt="Capuccino" src={capuccino}/>
                  </Button>
                </Columns.Column>
                <Columns.Column>
                  <Button color="white" className="Coffee-SelectionButton">
                    <Image src={americano} alt="Americano"/>
                  </Button>
                </Columns.Column>
              </Columns>
          </Columns.Column>
        </Columns>
      </Section>
    </Container>
  )
}
