
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'
import 'firebase/storage';

  const firebaseConfig = {
    apiKey: "AIzaSyBmCSBnamp2RwymF2ctIM-Ut3tGjppMfcE",
    authDomain: "campus-recruitment-syste-3c034.firebaseapp.com",
    databaseURL: "https://campus-recruitment-syste-3c034-default-rtdb.firebaseio.com",
    projectId: "campus-recruitment-syste-3c034",
    storageBucket: "campus-recruitment-syste-3c034.appspot.com",
    messagingSenderId: "865674085866",
    appId: "1:865674085866:web:a4f039b807132123a45e93",
    measurementId: "G-EG6XF34MV2"
  };


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const Storage = firebase.storage();

export { auth, database, Storage, firebase };