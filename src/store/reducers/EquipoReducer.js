const initState = {
  Equipo: null
};

const EquipoReducer = (state = initState, action) =>{
  switch (action.type) {
    case 'CREATE_EQUIPO':
      console.log('EQUIPO CREADO', action.equipo);
      return state;
    case 'CREATE_EQUIPO_ERROR':
      console.log('Error', action.error);
      return state;
    case 'DELETE_EQUIPO':
        console.log('ELIMINADO', action.error);
        return state;
    case 'DELETE_EQUIPO_ERROR':
        console.log('ERROR EN EL ELIMINADO', action.error);
        return state;
    case 'FIND_EQUIPO':
      state.Cliente=action.equipo;
      state.Id =action.id;
      return state;
    case 'UPDATE_EQUIPO':
      console.log('ACTUALIZADO CORRECTAMENTE', action.equipo);
      return state;
    case 'UPDATE_EQUIPO_ERROR':
      console.log('ERROR AL ACTUALIZAR AL EQUIPO', action.error);
      return state;
    default:
      return state;
  }
}

export default EquipoReducer;
