import React from 'react';
import { Table, Form } from 'react-bulma-components';


export default function OrderTable(props){
  /*  Instead of using ReactTable I implemented my own custom table.
   *  But the props were inspired by that lib
   */
  const changeValue = (itemIndex, colAccessor) => {
    return evt => props.editCell(evt.target.value, itemIndex, colAccessor)
  }

  const NumberField = (column, cellData) =>{
    let value = cellData[column.accessor]
    return ( 
      <Form.Field>
        <Form.Control>
          {/*we will cast the value so Bulma does not break */}
          <Form.Input  type="number"
                  value={"" + value}
                  onChange={changeValue(cellData.index, column.accessor)}/>
        </Form.Control>
      </Form.Field>
    )
  };
  const SelectField = (column, cellData) => {
    let value = cellData[column.accessor]
    if( value === 'not_applicable'){
      return "";
    }
    return (
      <Form.Field>
        <Form.Control>
          <Form.Select value={value} onChange={changeValue(cellData.index, column.accessor)}>
            {
              column.options.map( (option, index) =>(
                <option 
                  key={`item#${cellData.index}.option#${index}`}
                  value={option.value}>
                  {option.title}
                </option>
                )
              )
            }
          </Form.Select>
        </Form.Control>
      </Form.Field>
    )
  }

  const FieldFactory = (column, cellData) =>{
    switch(column.inputtype){
      case 'number':
        return NumberField(column, cellData);
      case 'select':
        return SelectField(column, cellData);
      default:
        return "";
    }
  }

  const buildCell = (column, cellData, colIndex) => {
      if( column.editable ){
        // otherwise is an input whose type is determined by the column's
        // config
        return FieldFactory(column, cellData);
      }
      return cellData[column.accessor];
  }

  const buildDataRows = (columns, data) =>{
    return data.map( item => {
      let cols = columns.map( (column, colIndex) => (
        <td key={`item#${item.index}.col#${colIndex}`}>{buildCell(column, item, colIndex)}</td>
      ))
      return (
        <tr key={`item#${item.index}`}>
          {cols}
        </tr>
      )
    })
  };

  return (
    <Table>
      <thead>
        <tr>
          {
            props.columns.map( (column, index) => (
              <th key={`column#${index}`}>
                {column.title}
              </th>
              )
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          props.data.length > 0 ? 
          buildDataRows(props.columns, props.data):
          (
            <tr>
              <td span={props.columns.length}>
                This order doesn't have any items
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
  )
};
