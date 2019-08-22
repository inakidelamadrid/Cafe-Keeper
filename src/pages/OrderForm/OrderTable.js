import React from 'react';
import { Table, Form } from 'react-bulma-components';


export default function OrderTable(props){
  /*  Instead of using ReactTable I implemented my own custom table.
   *  But the props were inspired by that lib
   */
  const changeValue = (row, column) => evt =>{
    props.editCell(evt.target.value, row.index, column.accessor);
    if(column.afterCellChange)
      column.afterCellChange(row, column);
  }


  const NumberField = (column, row) =>{
    let value = row[column.accessor]
    return ( 
      <Form.Field>
        <Form.Control>
          {/*we will cast the value so Bulma does not break */}
          <Form.Input  type="number"
                  value={"" + value}
                  onChange={changeValue(row, column)}/>
        </Form.Control>
      </Form.Field>
    )
  };

  const SelectField = (column, row) => {
    let value = row[column.accessor]
    if( value === 'not_applicable'){
      return "";
    }
    let options = typeof column.options === 'function' ? column.options(row) : column.options;
    return (
      <Form.Field>
        <Form.Control>
          <Form.Select value={value} onChange={changeValue(row, column)}>
            {
              options.map( (option, index) =>(
                <option 
                  key={`item#${row.index}.option#${index}`}
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

  const FieldFactory = (column, row) =>{
    switch(column.inputtype){
      case 'number':
        return NumberField(column, row);
      case 'select':
        return SelectField(column, row);
      default:
        return "";
    }
  }


  const buildDataRows = (columns, data) =>{
    return data.map( item => {
      let cols = columns.map( (column, colIndex) => (
        <td key={`item#${item.index}.col#${colIndex}`}>{
        column.editable ? FieldFactory(column, item) : item[column.accessor]
        }</td>
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
