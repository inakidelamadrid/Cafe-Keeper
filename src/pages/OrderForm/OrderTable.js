import React from 'react';
import { Table } from 'react-bulma-components';


export default function OrderTable(props){
  /*  Instead of using ReactTable I implemented my own custom table.
   *  But the props were inspired by that lib
   */

  const buildCell = (column, cellData, colIndex) => {
      let key = `item#${cellData.index}.col#${colIndex}`;
      let value = cellData[column.accessor]
      if( column.editable ){
        value =( 
          <input type={column.inputtype} value={value} readOnly/>
        )
      }
      return (
        <td key={key}>{value}</td>
      )
  }

  const buildDataRows = (columns, data) =>{
    return data.map( item => {
      let cols = columns.map( (column, colIndex) => buildCell(column, item, colIndex));
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
