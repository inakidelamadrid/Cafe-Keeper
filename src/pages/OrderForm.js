import React, { useState } from 'react';
import _ from 'lodash';
import { Form, Columns } from 'react-bulma-components';
import CoffeeDesk, { MILK_TYPES, ESPRESSO, AMERICANO, LATTE, CAPUCCINO } from './CoffeeDesk';
import OrderTable from './OrderForm/OrderTable';

const COFFEE_SIZES = {
  [LATTE]:  [
    {name: "Medium", price: 25},
    {name: "Big", price: 32},
  ],
  [CAPUCCINO]: [
    {name: "Medium", price: 25},
    {name: "Big", price: 32},
  ],
  [ESPRESSO]: [
    {name: "Only Size", price: 18},
  ],
  [AMERICANO]: [
    {name: "Only Size", price: 20},
  ]
}


function OrderForm(){
  const [items, setItems] =  useState([]);
  const [formValues, setFormValues] = useState({name: "", email: ""});

  const getDefaultSize = coffeeType => {
    let sizes = COFFEE_SIZES[coffeeType];
    console.log(sizes);
    return _.find(sizes, size => size.name === 'Big' || size.name === 'Only Size');
  }

  const grabCoffee = coffeeType => {
    let milk = (
      coffeeType === ESPRESSO || coffeeType === AMERICANO
    ) ? MILK_TYPES.NOT_APPLICABLE.value : MILK_TYPES.REGULAR.value;

    let index = items.length + 1
    let item = {
      espressoShots: 1,
      size: getDefaultSize(coffeeType).name,
      milk,
      index,
      coffeeType
    };
    setItems([...items, item]);
  }

  const handleCoffeeSizeChange = (item, column) =>{
    console.log("Handling Coffee Size Change");
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

  const columns = [
    {
      title: 'Specialty',
      accessor: 'coffeeType'
    },
    {
      title: 'Espresso Shots',
      accessor: 'espressoShots',
      editable: true,
      inputtype: 'number'
    },
    {
      title: 'Milk',
      accessor: 'milk',
      editable: true,
      inputtype: 'select',
      options: Object.values(MILK_TYPES)
    },
    {
      title: 'Size',
      accessor: 'size',
      editable: true,
      inputtype: 'select',
      options: [
        {value: 'Big', title: 'Big'},
        {value: 'Medium', title: 'Medium'},
        {value: 'Only Size', title: 'Only Size'}
      ],
      afterCellChange: handleCoffeeSizeChange
    },
  ];
  

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
