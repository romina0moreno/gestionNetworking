
//BUSCAR UN CLIENTE POR CUALQUIER CAMPO
export const getConfig = () =>{
  return( dispatch, getState, {getFirebase, getFirestore}) =>{
    const firestore = getFirestore();
    const c= [];
    const id = [];
    firestore.collection("Configuracion").doc("1")
    .get()
    .then((encontrado) => {
       encontrado.forEach( (doc) => {
         console.log(doc.data());
         c.push(doc.data());
         id.push(doc.id);
      });
      dispatch({type: 'GET_CONFIG', c, id});
    }).catch((error) => {
        console.log("ERROR AL BUSCAR UN CLIENTE (CLIENTEACTION): ", error)});
  }
};

//MODIFICAR UN CLIENTE
export const cambiarPerfil = (perfil) =>{
  return(dispatch, getState, {getFirebase, getFirestore})=>{
    const firestore = getFirestore();
    firestore.collection("Configuracion").doc("1").update({
      perfilActual:perfil
    }).then(()=>{
      dispatch({type: 'UPDATE_CONFIG', perfil});
    }).catch((error)=>{
      dispatch({type:'UPDATE_CLIENTE_ERROR', error});
    });
  }
}
