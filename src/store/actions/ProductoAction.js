
export const crearProducto = (producto) =>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('Producto').add({
      ...producto,
    }).then(() => {
      dispatch({type:'CREATE_PRODUCTO', producto});
    }).catch((err)=>{
      dispatch({type: 'CREATE_PRODUCTO_ERROR', err});
    })

  }
};

//BORRAR PRODUCTO--------------------------------------------------------------------------------

export const borrarProducto = (idProducto) =>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection("Producto").doc(idProducto).delete()
    .then(() => {
      dispatch({type:'DELETE_PRODUCTO', idProducto});
    }).catch((error) => {
      dispatch({type:'DELETE_PRODUCTO_ERROR', error});
    });
  }
};

//BUSCAR UN CLIENTE POR CUALQUIER CAMPO-----------------------------------------

export const buscarProducto = (campo, filtro) =>{
  return( dispatch, getState, {getFirebase, getFirestore}) =>{
    const firestore = getFirestore();
    const c= [];
    const id = [];
    firestore.collection("Producto").where(campo, "==", filtro)
    .get()
    .then((encontrado) => {
       encontrado.forEach( (doc) => {
         console.log(doc.data());
         c.push(doc.data());
         id.push(doc.id);
      });
      dispatch({type: 'FIND_PRODUCTO', c, id});
    }).catch((error) => {
        console.log("ERROR AL BUSCAR UN PRODUCTO (CLIENTEACTION): ", error)});
  }
};

//MODIFICAR UN CLIENTE----------------------------------------------------------

export const modificarProducto = (id, nombre, descripcion, foto, precioU) =>{
  return(dispatch, getState, {getFirebase, getFirestore})=>{
    const firestore = getFirestore();
    firestore.collection("Producto").doc(id).update({
      nombre: nombre,
      descripcion: descripcion,
      foto: foto,
      precioU: precioU,
    }).then(()=>{
      dispatch({type: 'UPDATE_PRODUCTO', id});
    }).catch((error)=>{
      dispatch({type:'UPDATE_PRODUCTO_ERROR', error});
    });
  }
}
