
import React,{ createContext, useReducer } from 'react';
export default CreateContext = (reducer, actions, initialValue) => {

  const Context = createContext();

  const Provider = ({ children }) => {
    const [State, dispatch] = useReducer(reducer, initialValue);
    //console.log(State);
    const boundActions = [];
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    return <Context.Provider value={{ State, ...boundActions }}>
      {children}
    </Context.Provider>
  }

  return { Context, Provider };
}