
export const crearPresupuesto = (presupuesto, n) =>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('Presupuesto').doc(n).set({
      ...presupuesto,
    }).then(() => {
      dispatch({type:'CREATE_PRESUPUESTO', presupuesto});
    }).catch((err)=>{
      dispatch({type: 'CREATE_PRESUPUESTO_ERROR', err});
    })

  }
};

//BORRAR PRESUPUESTO--------------------------------------------------------------------------------

export const borrarPresupuesto = (idPresupuesto) =>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection("Presupuesto").doc(idPresupuesto).delete()
    .then(() => {
      dispatch({type:'DELETE_PRESUPUESTO', idPresupuesto});
    }).catch((error) => {
      dispatch({type:'DELETE_PRESUPUESTO_ERROR', error});
    });
  }
};

//BUSCAR UN CLIENTE POR CUALQUIER CAMPO-----------------------------------------

export const buscarPresupuesto = (campo, filtro) =>{
  return( dispatch, getState, {getFirebase, getFirestore}) =>{
    const firestore = getFirestore();
    const c= [];
    const id = [];
    firestore.collection("Presupuesto").where(campo, "==", filtro)
    .get()
    .then((encontrado) => {
       encontrado.forEach( (doc) => {
         console.log(doc.data());
         c.push(doc.data());
         id.push(doc.id);
      });
      dispatch({type: 'FIND_PRESUPUESTO', c, id});
    }).catch((error) => {
        console.log("ERROR AL BUSCAR UN PRESUPUESTO (CLIENTEACTION): ", error)});
  }
};

//MODIFICAR UN CLIENTE----------------------------------------------------------

export const modificarPresupuesto = (id, nombreC, items, total, fecha) =>{
  return(dispatch, getState, {getFirebase, getFirestore})=>{
    const firestore = getFirestore();
    firestore.collection("Presupuesto").doc(id).update({
      nombreC: nombreC,
      items: items,
      total: total,
      fecha: fecha,
    }).then(()=>{
      dispatch({type: 'UPDATE_PRESUPUESTO', id});
    }).catch((error)=>{
      dispatch({type:'UPDATE_PRESUPUESTO_ERROR', error});
    });
  }
}
