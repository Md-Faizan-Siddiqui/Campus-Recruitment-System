
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDL8Nb4HTMhk4HzeMDVDGeuDrli8h5Z_GY",
    authDomain: "login-signup-with-redux.firebaseapp.com",
    projectId: "login-signup-with-redux",
    storageBucket: "login-signup-with-redux.appspot.com",
    messagingSenderId: "117423462948",
    appId: "1:117423462948:web:87333bf89a42722df0d6b1",
    measurementId: "G-7KJTR40MWG"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const Storage = firebase.storage();

export { auth, database, Storage, firebase };