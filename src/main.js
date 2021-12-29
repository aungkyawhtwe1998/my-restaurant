import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/compat";
//firebase setup
const firebaseConfig = {
    apiKey: "AIzaSyCY8ZLzfx5rbexbJI6yQWEG2xqyCWnMQVM",
    authDomain: "my-restaurant-89231.firebaseapp.com",
    projectId: "my-restaurant-89231",
    storageBucket: "my-restaurant-89231.appspot.com",
    messagingSenderId: "710380783051",
    appId: "1:710380783051:web:0f71f8f14faffdf136e24e",
    measurementId: "G-BET1EDCKLE"
};
firebase.initializeApp(firebaseConfig)
//bootstrap setup
import "bootstrap/dist/css/bootstrap.css"
createApp(App).use(store).use(router).mount("#app");
import "bootstrap/dist/js/bootstrap"