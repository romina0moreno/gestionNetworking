// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
//BD
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer.js';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import {  ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import config from './firebase.js';
import firebase from 'firebase/app';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, config)
  )
);

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

// ----------------------------------------------------------------------

ReactDOM.render(

<Provider store={store}>
  <ReactReduxFirebaseProvider {...rrfProps}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        </BrowserRouter>
      </HelmetProvider>
  </ReactReduxFirebaseProvider>
</Provider>, document.getElementById('root'));

// If you want to enable client cache, register instead.

serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
