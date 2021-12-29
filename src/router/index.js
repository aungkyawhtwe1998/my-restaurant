import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About";
import Register from "@/views/auth/Register";
import Login from  "@/views/auth/Login";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = createRouter({
  mode:'history',
  history: createWebHashHistory(),
  routes,
});

export default router;
