const initState = {
  Contrato: null
};

const ContratoReducer = (state = initState, action) =>{
  switch (action.type) {
    case 'CREATE_CONTRATO':
      console.log('CONTRATO CREADO', action.contrato);
      return state;
    case 'CREATE_CONTRATO_ERROR':
      console.log('Error', action.error);
      return state;
    case 'DELETE_CONTRATO':
        console.log('ELIMINADO', action.error);
        return state;
    case 'DELETE_CONTRATO_ERROR':
        console.log('ERROR EN EL ELIMINADO', action.error);
        return state;
    case 'FIND_CONTRATO':
      state.Cliente=action.contrato;
      state.Id =action.id;
      return state;
    case 'UPDATE_CONTRATO':
      console.log('ACTUALIZADO CORRECTAMENTE', action.contrato);
      return state;
    case 'UPDATE_CONTRATO_ERROR':
      console.log('ERROR AL ACTUALIZAR AL CONTRATO', action.error);
      return state;
    default:
      return state;
  }
}

export default ContratoReducer;
