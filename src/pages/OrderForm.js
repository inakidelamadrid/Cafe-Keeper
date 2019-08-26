import React, { useContext, useState } from 'react';
import CoffeesContext from '../CoffeesContext';
import _ from 'lodash';
import { Form, Columns, Button } from 'react-bulma-components';

import API from '../api';
import CoffeeDesk from './OrderForm/CoffeeDesk';
import OrderNote from './OrderForm/OrderNote';
import OrderTable from './OrderForm/OrderTable';


function OrderForm(){
  const COFFEES = useContext(CoffeesContext);
  const {AMERICANO, CAPUCCINO, ESPRESSO, LATTE} = COFFEES.TYPES;

  const [items, setItems] =  useState([]);
  const [formValues, setFormValues] = useState({name: "", email: ""});

  const [flags, setFlags] = useState({milk: false});

  const getDefaultSize = coffeeType => {
    let sizes = COFFEE_SIZES[coffeeType];
    return _.find(sizes, size => size.name === 'Big' || size.name === 'Only Size');
  };

  const ADDON_MILK_TYPES = _.map(
    _.values(_.omit(COFFEES.MILK_TYPES, ['REGULAR', 'NOT_APPLICABLE', 'LIGHT'])),
    milk_type => milk_type.value
  );

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

  const ADDON_COST = 5;

  const grandTotal = items => _.sum(_.map(items, item => item.totalPrice));

  const grabCoffee = coffeeType => {
    let defaultMilkValue = (
      coffeeType === ESPRESSO || coffeeType === AMERICANO
    ) ? COFFEES.MILK_TYPES.NOT_APPLICABLE.value : COFFEES.MILK_TYPES.REGULAR.value;

    let index = items.length + 1
    let variation = getDefaultSize(coffeeType);
    let item = {
      espressoShots: 1,
      size: variation.name,
      price: variation.price,
      totalPrice: variation.price,
      milk: defaultMilkValue,
      index,
      coffeeType
    };
    setItems([...items, item]);
  };

  const removeItem = (item) =>{
    let newItems = _.reject(items, {'index': item.index });
    setItems(newItems);
  };

  const calculateItemTotalPrice = (item, flagsParam) => {
    let localFlags      = flagsParam || flags;
    let addOnCost       = localFlags.milk ? ADDON_COST : 0;
    let extraShotsCost  = (item.espressoShots - 1) * ADDON_COST;
    editCell(item.price + addOnCost + extraShotsCost, item.index, 'totalPrice');
  };

  const handleMilkTypeChange = (changedItem, column) => {
    let newMilkType = changedItem.milk;
    let isAddonMilk =  _.includes(ADDON_MILK_TYPES, newMilkType);
    
    let milkStatus = {}
    if( isAddonMilk && !flags.milk ){
      milkStatus = {milk:true};
    }else if(!isAddonMilk && flags.milk){
      milkStatus = {milk:false};
    }
    setFlags(milkStatus);
    // since setting state is async, we might end up missing this update
    // to avoid complex callback code, we pass what we know and
    // if not present, we use the state
    calculateItemTotalPrice(changedItem, milkStatus);
  };

  const handleCoffeeSizeChange = (changedItem, column) =>{
    let sizes = COFFEE_SIZES[changedItem.coffeeType];
    let newSize = changedItem.size;
    let newPrice = _.find(sizes, size => size.name === newSize).price;

    editCell(newPrice, changedItem.index, 'price');
    calculateItemTotalPrice(changedItem);
  };

  const handleEspressoShotsChange = (changedItem, column) =>{
    // in this case, it seems that the state updates before calculating the price
    calculateItemTotalPrice(changedItem);
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

  const createOrder = async evt => {
    if( _.isEmpty(items) )
      alert("Items is empty!");

    const itemData = _.map(items, item =>{
      let attributes = ['espressoShots', 'milk', 'size'];
      let variant = _.pick(item, attributes);

      return {
        name: item.coffeeType,
        index: item.index,
        raw_price: item.price,
        variant
      };
    });

    const payload = {
      items: itemData,
      total : grandTotal(items),
      grand_total: grandTotal(items)
    };

    try{
      const res = await API.post(`orders/`, payload);
      console.log(res);
      console.log(res.data);
    }catch(error){
      console.log(error.response.data);
    }
    // get feedback
    // show feedback in alert
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
      inputattribs: {max: 2, min: 1},
      afterCellChange: handleEspressoShotsChange
    },
    {
      title: 'Milk',
      accessor: 'milk',
      editable: true,
      inputtype: 'select',
      options: _.values(_.omit(COFFEES.MILK_TYPES, "NOT_APPLICABLE")),
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
      accessor: 'totalPrice',
      isCurrency: true
    },
  ];
  

  return (
    <Columns>

      <Columns.Column size="half">
        <OrderNote  name={formValues.name}
                    email={formValues.email}
                    itemCount={items.length}
                    grandTotal={grandTotal(items)}/>
        {/* Formulario */}
        <Columns>
          <Columns.Column>
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
          </Columns.Column>
          <Columns.Column size="one-third">
            <Button onClick={createOrder}>Create Order</Button>
          </Columns.Column>
        </Columns>
        {/* Formulario */}
        <div>
          <OrderTable columns={columns} data={items} editCell={editCell} remove={removeItem}/>
        </div>
      </Columns.Column>
      
      <Columns.Column>
        <CoffeeDesk grabCoffee={grabCoffee}/>
      </Columns.Column>

    </Columns>
  )
}

export default OrderForm;
