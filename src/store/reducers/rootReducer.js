import ProductoReducer from './ProductoReducer.js';
import ClienteReducer from './ClienteReducer.js';
import ConfiguracionReducer from './ConfiguracionReducer.js';
import ContratoReducer from './ContratoReducer.js';
import EquipoReducer from './EquipoReducer.js';
import PresupuestoReducer from './PresupuestoReducer.js';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  producto: ProductoReducer,
  cliente: ClienteReducer,
  configuracion: ConfiguracionReducer,
  contrato: ContratoReducer,
  equipo: EquipoReducer,
  presupuesto: PresupuestoReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
