import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import CreateContact from "../views/CreateContact";
import ForgotPassword from "../views/auth/ForgotPassword";
import Profile from "../views/Profile";
import ShowMenu from "../views/ShowMenu";
import About from "../views/About";
import Admin from "../views/Admin";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },

  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
      requiresAuth: false,
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title:"Profile",
      requiresAuth: true,
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin",
      requiresAuth: true,
    }
  },

  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/menu/:menuId",
    name:"ShowMenu",
    props:true,
    component: ShowMenu,
    meta: {
      title: "ShowMenu",
      requiresAuth: false,
    }
  },
  {
    path: "/contact",
    name: "CreateContact",
    component: CreateContact
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to,from,next)=>{
  document.title = `${to.meta.title} | MyRestaurant`;
  next();
})

router.beforeEach(async (to, from, next)=>{
  let user = firebase.auth().currentUser;

  if(to.matched.some((res)=> res.meta.requiresAuth)){
    if(user){
      return next();
    }
    return next({name: "Home"});
  }
    return next();
});


export default router;
