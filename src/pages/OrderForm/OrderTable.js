import React from 'react';
import { Table } from 'react-bulma-components';


export default function OrderTable(props){
  /*  Instead of using ReactTable I implemented my own custom table.
   *  But the props were inspired by that lib
   */

  const buildCell = (column, cellData, colIndex) => {
      let key = `item#${cellData.index}.col#${colIndex}`;

      // value is simple text if not editable
      let value = cellData[column.accessor]
      
      if( column.editable ){
        // otherwise is an input whose type is determined by the column's
        // config
        value =( 
          <input  type={column.inputtype}
                  value={value}
                  onChange={evt => props.editCell(evt.target.value, cellData.index, column.accessor)}/>
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
