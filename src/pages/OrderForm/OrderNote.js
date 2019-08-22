import React from 'react';
import _ from 'lodash';
import { Box, Columns, Hero  } from 'react-bulma-components';
import CurrencyFormat from '../../components/CurrencyFormat';
import './OrderNote.scss';

export default function OrderNote(props){
  const grandTotal = () => _.sum(_.map(props.items, item => item.totalPrice));

  return(
    <Hero id="OrderNote" color="light">
      <Hero.Body>
          <Columns>
            <Columns.Column size="half">
              <Box className="noshadow">
                <p>Client's Name</p>
              </Box>
              <Box className="noshadow" >
                <p>Email</p>
              </Box>
              <Box className="noshadow">
                <p>Total Items</p>
              </Box>
              <Box className="noshadow">
                <p>Grand Total</p>
              </Box>
            </Columns.Column>
            <Columns.Column>
              <Box className="noshadow val">
                <p>{ props.name || "Client"}</p>
              </Box>
              <Box className="noshadow val" >
                <p>{ props.email || "email@example.com"}</p>
              </Box>
              <Box className="noshadow val" >
                <p>{ props.items.length }</p>
              </Box>
              <Box className="noshadow val" >
                <CurrencyFormat value={grandTotal()}></CurrencyFormat>
              </Box>
            </Columns.Column>
          </Columns>
      </Hero.Body>
    </Hero>
  )
};
