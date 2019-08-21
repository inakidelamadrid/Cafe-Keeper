import React, { useState } from 'react';
import { Form, Columns } from 'react-bulma-components';
import CoffeeDesk from './CoffeeDesk';
import OrderTable from './OrderForm/OrderTable';

function OrderForm(){
  const [items, setItems] =  useState([])

  const columns = [
    {title: 'Specialty', accessor: 'coffeeType'},
    {title: 'Espresso Shots', accessor: 'espressoShots'},
    {title: 'Milk', accessor: 'milk'},
  ];
  
  //const items = [
    //{coffeeType: "latte", espressoShots: 1, milk: "light"},
    //{coffeeType: "capuccino", espressoShots: 1, milk: "regular"},
  //];

  const grabCoffee = coffeeType => {
    let index = items.length + 1
    let item = {
      espressoShots: 1,
      milk: 'Regular',
      index,
      coffeeType 
    };
    setItems([...items, item]);
  }
  return (
    <Columns>
      <Columns.Column size="half">
        <div>
          <Form.Field>
            <Form.Label>Client's Name</Form.Label>
            <Form.Control>
              <Form.Input name="name" placeholder="Text input" />
            </Form.Control>
          </Form.Field>
        </div>
        <div>
          <Form.Field>
            <Form.Label>Client's email</Form.Label>
            <Form.Control>
              <Form.Input name="email" placeholder="Text input" />
            </Form.Control>
          </Form.Field>
        </div>
        <div>
          <OrderTable columns={columns} data={items}/>
        </div>
      </Columns.Column>
      <Columns.Column>
        <CoffeeDesk grabCoffee={grabCoffee}/>
      </Columns.Column>
    </Columns>
  )
}

export default OrderForm;
