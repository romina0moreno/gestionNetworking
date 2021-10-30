const initState = {
  Cliente: null
};

const ClienteReducer = (state = initState, action) =>{
  console.log(action);
  switch (action.type) {
    case 'CREATE_CLIENTE':
      console.log('CLIENTE CREADO', action.cliente);
      return state;
    case 'CREATE_CLIENTE_ERROR':
      console.log('Error', action.error);
      return state;
    case 'DELETE_CLIENTE':
        console.log('ELIMINADO', action.error);
        return state;
    case 'DELETE_CLIENTE_ERROR':
        console.log('ERROR EN EL ELIMINADO', action.error);
        return state;
    case 'FIND_CLIENTE':
      console.log(action);
      state.Cliente=action.c;
      return state;
    case 'UPDATE_CLIENTE':
      console.log('ACTUALIZADO CORRECTAMENTE', action.cliente);
      return state;
    case 'UPDATE_CLIENTE_ERROR':
      console.log('ERROR AL ACTUALIZAR AL CLIENTE', action.error);
      return state;
    default:
      return state;
  }
}

export default ClienteReducer;
