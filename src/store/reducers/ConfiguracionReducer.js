const initState = {
  config: null
};

const ConfiguracionReducer = (state = initState, action) =>{
  console.log(action);
  switch (action.type) {
    case 'GET_CONFIG':
      console.log(action)
      state.config=action.c;
      return state;
    case 'UPDATE_CONFIG':
      return state;
    default:
      return state;
  }
}

export default ConfiguracionReducer;
