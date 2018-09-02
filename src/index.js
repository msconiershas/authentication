
import './index.css';
import App from './App';
import { reduxFirebase } from 'react-redux-firebase'
import store from './store';

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import fire from './fire'
import { reduxFirestore, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
 

 
// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  enableLogging: false
}



// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable
 
// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(fire, rrfConfig), // firebase instance as first argument
  reduxFirestore(fire) // <- needed if using firestore
)(createStore)
 
// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})
 
// Create store with reducers and initial state
//const initialState = {}
//const store = createStoreWithFirebase(rootReducer, initialState, window.devToolsExtension && 
//	window.devToolsExtension())

 
render(<Provider store={store}><App/></Provider>, document.getElementById('root'));