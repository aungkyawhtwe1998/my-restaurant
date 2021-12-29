import firebase from "firebase/compat";
import "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCY8ZLzfx5rbexbJI6yQWEG2xqyCWnMQVM",
    authDomain: "my-restaurant-89231.firebaseapp.com",
    projectId: "my-restaurant-89231",
    storageBucket: "my-restaurant-89231.appspot.com",
    messagingSenderId: "710380783051",
    appId: "1:710380783051:web:0f71f8f14faffdf136e24e",
    measurementId: "G-BET1EDCKLE"
};

firebase.initializeApp(firebaseConfig);
firebase
    .firestore()
    .enablePersistence({synchronizeTabs:!0})
    .catch(()=>{
        console.warn("DB offline support not available")
    });

export default {
    firestore:firebase.firestore(),
    auth:firebase.auth()
}