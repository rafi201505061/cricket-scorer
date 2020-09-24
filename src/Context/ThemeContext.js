import CreateContext from './CreateContext';

const reducer = (State, action) => {
  switch (action.type) {
    case 'set_color':
      return {defaultColor:action.payload}
    default:
      return State;
  }
}

const setColor = (dispatch) => {
  return (color) => {
    dispatch({type:'set_color',payload:color})
  }
}


//#2ea108
//#f0245a
export const { Context, Provider } = CreateContext(
  reducer,
  {setColor},
  {defaultColor:'#f0245a'}
)