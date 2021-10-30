const initState = {
  Presupuesto: null
};

const PresupuestoReducer = (state = initState, action) =>{
  switch (action.type) {
    case 'CREATE_PRESUPUESTO':
      console.log('PRESUPUESTO CREADO', action.presupuesto);
      return state;
    case 'CREATE_PRESUPUESTO_ERROR':
      console.log('Error', action.err);
      return state;
    case 'DELETE_PRESUPUESTO':
        console.log('ELIMINADO', action.err);
        return state;
    case 'DELETE_PRESUPUESTO_ERROR':
        console.log('ERROR EN EL ELIMINADO', action.err);
        return state;
    case 'FIND_PRESUPUESTO':
      state.PRESUPUESTO=action.presupuesto;
      state.Id =action.id;
      return state;
    case 'UPDATE_PRESUPUESTO':
      console.log('ACTUALIZADO CORRECTAMENTE', action.cliente);
      return state;
    case 'UPDATE_PRESUPUESTO_ERROR':
      console.log('ERROR AL ACTUALIZAR AL PRESUPUESTO', action.error);
      return state;
    default:
      return state;
  }
}

export default PresupuestoReducer;
