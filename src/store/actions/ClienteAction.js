//CREAR UN CLIENTE
export const crearCliente = (cliente, dni) =>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('Cliente').doc(dni).set({
      ...cliente,
    }).then(() => {
      dispatch({type:'CREATE_CLIENTE', cliente});
    }).catch((error)=>{
      dispatch({type: 'CREATE_CLIENTE_ERROR', error});
    })

  }
};

//ELIMINAR UN CLIENTE POR ID
export const borrarCliente = (idCliente) =>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection("Cliente").doc(idCliente).delete()
    .then(() => {
      dispatch({type:'DELETE_CLIENTE', idCliente});
    }).catch((error) => {
      dispatch({type:'DELETE_CLIENTE_ERROR', error});
    });
  }
};


//BUSCAR UN CLIENTE POR CUALQUIER CAMPO
export const buscarCliente = (campo, filtro) =>{
  return( dispatch, getState, {getFirebase, getFirestore}) =>{
    const firestore = getFirestore();
    const c= [];
    const id = [];
    firestore.collection("Cliente").where(campo, "==", filtro)
    .get()
    .then((encontrado) => {
       encontrado.forEach( (doc) => {
         console.log(doc.data());
         c.push(doc.data());
         id.push(doc.id);
      });
      dispatch({type: 'FIND_CLIENTE', c, id});
    }).catch((error) => {
        console.log("ERROR AL BUSCAR UN CLIENTE (CLIENTEACTION): ", error)});
  }
};

//MODIFICAR UN CLIENTE
export const modificarCliente = (id, apellido, nombre, correo, dni, domicilio, telefono, cuit, razonSocial, empresa) =>{
  return(dispatch, getState, {getFirebase, getFirestore})=>{
    const firestore = getFirestore();
    firestore.collection("Cliente").doc(id).update({
      apellido: apellido,
      nombre: nombre,
      correo: correo,
      dni: dni,
      domicilio: domicilio,
      telefono: telefono,
      cuit: cuit,
      razonSocial: razonSocial,
      empresa: empresa,
    }).then(()=>{
      dispatch({type: 'UPDATE_CLIENTE', id});
    }).catch((error)=>{
      dispatch({type:'UPDATE_CLIENTE_ERROR', error});
    });
  }
}

export const darBaja = (id, moroso, ubicacionDeuda) =>{
  return(dispatch, getState,{ getFirebase, getFirestore}) =>{
    const firestore = getFirestore();
    firestore.collection("Cliente").doc(id).update({
      activo:"no",
      moroso: moroso,
      ubicacionDeuda: ubicacionDeuda,
    }).then(()=>{
      dispatch({type: 'UPDATE_CLIENTE', id});
    }).catch((error)=>{
      dispatch({type: 'UPDATE_CLIENTE_ERROR', error});
    });
  }
}
