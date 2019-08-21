import React from 'react';
import { Table } from 'react-bulma-components';


export default function OrderTable(props){
  
  return (
    <Table>
      <thead>
        <tr>
          {
            props.columns.map( column => (
              <th>
                {column.title}
              </th>
              )
            )
          }
        </tr>
      </thead>
    </Table>
  )
};
