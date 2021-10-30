//CREAR UN CONTRATO
export const crearContrato = (contrato, id) =>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('Contrato').doc(id).set({
      ...contrato,
    }).then(() => {
      dispatch({type:'CREATE_CONTRATO', contrato});
    }).catch((error)=>{
      dispatch({type: 'CREATE_CONTRATO_ERROR', error});
    })

  }
};

//ELIMINAR UN CONTRATO POR ID
export const borrarContrato = (idContrato) =>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection("Contrato").doc(idContrato).delete()
    .then(() => {
      dispatch({type:'DELETE_CONTRATO', idContrato});
    }).catch((error) => {
      dispatch({type:'DELETE_CONTRATO_ERROR', error});
    });
  }
};


//BUSCAR UN CONTRATO POR CUALQUIER CAMPO
export const buscarContrato = (campo, filtro) =>{
  return( dispatch, getState, {getFirebase, getFirestore}) =>{
    const firestore = getFirestore();
    const c= [];
    const id = [];
    firestore.collection("Contrato").where(campo, "==", filtro)
    .get()
    .then((encontrado) => {
       encontrado.forEach( (doc) => {
         console.log(doc.data());
         c.push(doc.data());
         id.push(doc.id);
      });
      dispatch({type: 'FIND_CONTRATO', c, id});
    }).catch((error) => {
        console.log("ERROR AL BUSCAR UN CONTRATO (CONTRATOACTION): ", error)});
  }
};

//MODIFICAR UN CONTRATO
export const modificarContrato = (id, tipoServicio, equipo) =>{
  return(dispatch, getState, {getFirebase, getFirestore})=>{
    const firestore = getFirestore();
    firestore.collection("Contrato").doc(id).update({
      tipoServicio: tipoServicio,
      equipo: equipo
    }).then(()=>{
      dispatch({type: 'UPDATE_CONTRATO', id});
    }).catch((error)=>{
      dispatch({type:'UPDATE_CONTRATO_ERROR', error});
    });
  }
}

//DAR DE BAJA UN CONTRATO

export const darBaja = (id, fechaBaja, motivoBaja) =>{
  return(dispatch, getState,{ getFirebase, getFirestore}) =>{
    const firestore = getFirestore();
    firestore.collection("contrato").doc(id).update({
      fechaBaja: fechaBaja,
      motivoBaja: motivoBaja
    }).then(()=>{
      dispatch({type: 'UPDATE_CONTRATO', id});
    }).catch((error)=>{
      dispatch({type: 'UPDATE_CONTRATO_ERROR', error});
    });
  }
}
