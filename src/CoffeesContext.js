import React from 'react';

const CoffeesContext = React.createContext({});

export const CoffeesProvider = CoffeesContext.Provider
export const CoffeesConsumer = CoffeesContext.Consumer
export default CoffeesContext
