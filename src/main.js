import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
//bootstrap setup
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

//firebase
import store from "./store";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
let app;
firebase.auth().onAuthStateChanged(()=>{
    if(!app){
        createApp(App).use(store).use(router).use(BootstrapIconsPlugin).mount("#app");
    }
})
