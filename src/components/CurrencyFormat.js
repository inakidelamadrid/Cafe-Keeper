import React from 'react';

export default function CurrencyFormat(props){
  return (
    <p>{ 
      new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD'
      }).format(props.value) }
    </p>
  )
}
