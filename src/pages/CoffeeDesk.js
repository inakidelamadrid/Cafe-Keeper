import React from 'react';
import { 
  Button,
  Columns,
  Container,
  Heading,
  Hero,
  Section
} from 'react-bulma-components';


export default function CoffeeDesk(){
  return (
    <Container>
      <Section>
        <Heading>Cafe Keeper</Heading>
      </Section>
      <Columns>
        <Columns.Column size="one-fifth">
        </Columns.Column>
        <Columns.Column>
          <Section>
            <Columns>
              <Columns.Column size='half'>
                <Button color="white">Espresso</Button>
              </Columns.Column>
              <Columns.Column>
                <Button color="white">Latte</Button>
              </Columns.Column>
            </Columns>
            <Columns>
              <Columns.Column size='half'>
                <Button color="white">Capuccino</Button>
              </Columns.Column>
              <Columns.Column>
                <Button color="white">Americano</Button>
              </Columns.Column>
            </Columns>
          </Section>
        </Columns.Column>
      </Columns>
    </Container>
  )
}
