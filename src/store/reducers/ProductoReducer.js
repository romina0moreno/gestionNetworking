const initState = {
  Producto: null
};

const ProductoReducer = (state = initState, action) =>{
  switch (action.type) {
    case 'CREATE_PRODUCTO':
      console.log('PRODUCTO CREADO', action.producto);
      return state;
    case 'CREATE_PRODUCTO_ERROR':
      console.log('Error', action.err);
      return state;
    case 'DELETE_PRODUCTO':
        console.log('ELIMINADO', action.err);
        return state;
    case 'DELETE_PRODUCTO_ERROR':
        console.log('ERROR EN EL ELIMINADO', action.err);
        return state;
    case 'FIND_PRODUCTO':
      state.PRODUCTO=action.producto;
      state.Id =action.id;
      return state;
    case 'UPDATE_PRODUCTO':
      console.log('ACTUALIZADO CORRECTAMENTE', action.cliente);
      return state;
    case 'UPDATE_PRODUCTO_ERROR':
      console.log('ERROR AL ACTUALIZAR AL PRODUCTO', action.error);
      return state;
    default:
      return state;
  }
}

export default ProductoReducer;
