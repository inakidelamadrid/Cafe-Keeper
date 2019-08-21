import React from 'react';
import { Form, Columns } from 'react-bulma-components';
import CoffeeDesk from './CoffeeDesk';
import OrderTable from './OrderForm/OrderTable';

function OrderForm(){
  const columns = [
    {title: 'Specialty', accessor: 'coffeeType'},
    {title: 'Espresso Shots', accessor: 'espressoShots'},
    {title: 'Milk', accessor: 'milk'},
  ];
  
  const items = [
    {coffeeType: "latte", espressoShots: 1, milk: "light"},
    {coffeeType: "capuccino", espressoShots: 1, milk: "regular"},
  ];

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
          <OrderTable columns={columns}/>
        </div>
      </Columns.Column>
      <Columns.Column>
        <CoffeeDesk />
      </Columns.Column>
    </Columns>
  )
}

export default OrderForm;
