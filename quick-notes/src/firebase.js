import firebase from "firebase";

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyAC9YmiI-BsOrrUvmaXIJLqvbzf52CwLKk",
  authDomain: "quick-notes-66d30.firebaseapp.com",
  projectId: "quick-notes-66d30",
  storageBucket: "quick-notes-66d30.appspot.com",
  messagingSenderId: "204787191421",
  appId: "1:204787191421:web:b6f244428403060ebdeb14"
});

const db=firebaseApp.firestore();

export {db,firebaseApp}