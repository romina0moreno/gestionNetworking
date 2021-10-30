//CREAR UN EQUIPO
export const crearEquipo = (equipo, id) =>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('Equipo').doc(id).set({
      ...equipo,
    }).then(() => {
      dispatch({type:'CREATE_EQUIPO', id});
    }).catch((error)=>{
      dispatch({type: 'CREATE_EQUIPO_ERROR', error});
    })

  }
};


//ELIMINAR UN EQUIPO POR ID
export const borrarEquipo = (idEquipo) =>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection("Equipo").doc(idEquipo).delete()
    .then(() => {
      dispatch({type:'DELETE_EQUIPO', idEquipo});
    }).catch((error) => {
      dispatch({type:'DELETE_EQUIPO_ERROR', error});
    });
  }
};


//BUSCAR UN EQUIPO POR CUALQUIER CAMPO
export const buscarEquipoXId = (campo, filtro) =>{
  return( dispatch, getState, {getFirebase, getFirestore}) =>{
    const firestore = getFirestore();
    const c= [];
    const id = [];
    firestore.collection("Equipo").where(campo, "==", filtro)
    .get()
    .then((encontrado) => {
       encontrado.forEach( (doc) => {
         console.log(doc.data());
         c.push(doc.data());
         id.push(doc.id);
      });
      dispatch({type: 'FIND_EQUIPO', c, id});
    }).catch((error) => {
        console.log("ERROR AL BUSCAR UN EQUIPO (EQUIPOACTION): ", error)});
  }
};

//MODIFICAR UN EQUIPO
export const modificarEquipo = (id, marca, modelo, frecuencia, mac, tipo, estado) =>{
  return(dispatch, getState, {getFirebase, getFirestore})=>{
    const firestore = getFirestore();
    firestore.collection("Equipo").doc(id).update({
      marca: marca,
      modelo: modelo,
      frecuencia:frecuencia,
      mac: mac,
      estado: estado,
    }).then(()=>{
      dispatch({type: 'UPDATE_EQUIPO', id});
    }).catch((error)=>{
      dispatch({type:'UPDATE_EQUIPO_ERROR', error});
    });
  }
}
