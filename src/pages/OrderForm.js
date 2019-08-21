import React, { useState } from 'react';
import { Form, Columns } from 'react-bulma-components';
import CoffeeDesk from './CoffeeDesk';
import OrderTable from './OrderForm/OrderTable';

function OrderForm(){
  const [items, setItems] =  useState([]);
  const [formValues, setFormValues] = useState({name: "", email: ""});

  const columns = [
    {title: 'Specialty', accessor: 'coffeeType'},
    {title: 'Espresso Shots', accessor: 'espressoShots', editable: true, inputtype: 'number'},
    {title: 'Milk', accessor: 'milk'},
  ];
  
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


  const handleChange = evt =>{
    evt.preventDefault();
    let value = evt.target.value;
    let name = evt.target.name;
    let newValues = {...formValues, [name]: value};
    setFormValues(newValues);
  };

  const editCell = (value, itemIndex, colAccessor) => {
    let newItems = items.map( item =>{
      if( item.index === itemIndex){
        item[colAccessor] = value;
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <Columns>
      <Columns.Column size="half">
        <div>
          <Form.Field>
            <Form.Label>Client's Name</Form.Label>
            <Form.Control>
              <Form.Input name="name"
                          value={formValues.name}
                          placeholder="Text input"
                          onChange={handleChange}/>
            </Form.Control>
          </Form.Field>
        </div>
        <div>
          <Form.Field>
            <Form.Label>Client's email</Form.Label>
            <Form.Control>
              <Form.Input name="email"
                          value={formValues.email}
                          placeholder="Text input"
                          onChange={handleChange}/>
            </Form.Control>
          </Form.Field>
        </div>
        <div>
          <OrderTable columns={columns} data={items} editCell={editCell}/>
        </div>
      </Columns.Column>
      <Columns.Column>
        <CoffeeDesk grabCoffee={grabCoffee}/>
      </Columns.Column>
    </Columns>
  )
}

export default OrderForm;
