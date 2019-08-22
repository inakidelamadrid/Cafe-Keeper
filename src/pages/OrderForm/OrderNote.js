import React from 'react';
import _ from 'lodash';
import { Box, Columns, Container, Hero, Heading  } from 'react-bulma-components';

export default function OrderNote(props){
  const grandTotal = () => _.sum(_.map(props.items, item => item.totalPrice));

  return(
    <Hero color="light">
      <Hero.Body>
          <Columns>
            <Columns.Column size="half">
              <Box style={{width: 'fit-content'}}>
                <p>Client's Name</p>
              </Box>
              <Box style={{width: 'fit-content'}}>
                <p>Email</p>
              </Box>
              <Box style={{width: 'fit-content'}}>
                <p>Total Items</p>
              </Box>
              <Box style={{width: 'fit-content'}}>
                <p>Grand Total</p>
              </Box>
            </Columns.Column>
            <Columns.Column>
                <p>{ props.name }</p>
              <Box style={{width: 'fit-content'}}>
                <p>{ props.email }</p>
              </Box>
              <Box style={{width: 'fit-content'}}>
                <p>{ props.items.length }</p>
              </Box>
              <Box style={{width: 'fit-content'}}>
                <p>{ grandTotal() }</p>
              </Box>
            </Columns.Column>
          </Columns>
      </Hero.Body>
    </Hero>
  )
};
