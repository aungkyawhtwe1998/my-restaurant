import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home";
import Register from "@/views/auth/Register";
import Login from  "@/views/auth/Login";
import CreateContact from "../views/CreateContact";
import ForgotPassword from "../views/auth/ForgotPassword";
import Profile from "../views/Profile";
import ShowMenu from "../views/ShowMenu";
import About from "../views/About";
import Admin from "../views/Admin";

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
    path: "/show-menu",
    name:"ShowMenu",
    component: ShowMenu
  },
  {
    path: "/contact",
    name: "CreateContact",
    component: CreateContact
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
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  }
];

const router = createRouter({
  mode:'history',
  history: createWebHashHistory(),
  routes,
});

export default router;
