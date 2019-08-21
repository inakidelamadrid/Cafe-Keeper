import React from 'react';
import { Form, Columns } from 'react-bulma-components';
import CoffeeDesk from './CoffeeDesk';

function OrderForm(){
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
          <Form.Field>
            <Form.Label>Client's email</Form.Label>
            <Form.Control>
              <Form.Input name="email" placeholder="Text input" />
            </Form.Control>
          </Form.Field>
        </div>
      </Columns.Column>
      <Columns.Column>
        <CoffeeDesk />
      </Columns.Column>
    </Columns>
  )
}

export default OrderForm;
