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

const ADDON_MILK_TYPES = _.map(
  _.values(_.omit(MILK_TYPES, ['REGULAR', 'NOT_APPLICABLE', 'LIGHT'])),
  milk_type => milk_type.value
);
const ADDON_COST = 5;

function OrderForm(){
  const [items, setItems] =  useState([]);
  const [formValues, setFormValues] = useState({name: "", email: ""});

  const getDefaultSize = coffeeType => {
    let sizes = COFFEE_SIZES[coffeeType];
    return _.find(sizes, size => size.name === 'Big' || size.name === 'Only Size');
  };

  const grabCoffee = coffeeType => {
    let defaultMilkValue = (
      coffeeType === ESPRESSO || coffeeType === AMERICANO
    ) ? MILK_TYPES.NOT_APPLICABLE.value : MILK_TYPES.REGULAR.value;

    let index = items.length + 1
    let variation = getDefaultSize(coffeeType);
    let item = {
      espressoShots: 1,
      size: variation.name,
      price: variation.price,
      milk: defaultMilkValue,
      index,
      coffeeType
    };
    setItems([...items, item]);
  };

  const handleMilkTypeChange = (changedItem, column) => {
    let newMilkType = changedItem.milk;
    let isAddonMilk =  _.includes(ADDON_MILK_TYPES, newMilkType);
    let addonAlreadyIncluded = changedItem.milkAddon === true;

    let newPrice = null;

    if( isAddonMilk && !addonAlreadyIncluded){
      newPrice = changedItem.price + ADDON_COST;
      changedItem.milkAddon = true;
    }else if(!isAddonMilk && addonAlreadyIncluded){
      newPrice = changedItem.price - ADDON_COST;
      changedItem.milkAddon = false;
    }else{
      newPrice = changedItem.price;
    }
    editCell(newPrice, changedItem.index, 'price');
  };

  const handleCoffeeSizeChange = (changedItem, column) =>{
    let sizes = COFFEE_SIZES[changedItem.coffeeType];
    let newSize = changedItem.size;
    let newPrice = _.find(sizes, size => size.name === newSize).price;

    editCell(newPrice, changedItem.index, 'price');
  };

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
      inputtype: 'number',
      inputattribs: {max: 2, min: 1}
    },
    {
      title: 'Milk',
      accessor: 'milk',
      editable: true,
      inputtype: 'select',
      options: _.values(_.omit(MILK_TYPES, "NOT_APPLICABLE")),
      afterCellChange: handleMilkTypeChange,
    },
    {
      title: 'Size',
      accessor: 'size',
      editable: true,
      inputtype: 'select',
      options: (item) => {
        if(_.includes([ESPRESSO, AMERICANO], item.coffeeType)){
          return [{value: 'Only Size', title: 'Only Size'}]
        }else{
          return [
            {value: 'Big', title: 'Big'},
            {value: 'Medium', title: 'Medium'}
          ]
        }
      },
      afterCellChange: handleCoffeeSizeChange
    },
    {
      title: 'Price',
      accessor: 'price',
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
