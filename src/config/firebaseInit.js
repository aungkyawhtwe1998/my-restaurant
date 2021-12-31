import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
var firebaseConfig = {
    apiKey: "AIzaSyCY8ZLzfx5rbexbJI6yQWEG2xqyCWnMQVM",
    authDomain: "my-restaurant-89231.firebaseapp.com",
    projectId: "my-restaurant-89231",
    storageBucket: "my-restaurant-89231.appspot.com",
    messagingSenderId: "710380783051",
    appId: "1:710380783051:web:0f71f8f14faffdf136e24e",
    measurementId: "G-BET1EDCKLE"
};
firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
export {timestamp};
export  default firebase.firestore();