<template>
  <div>
    <Navigation v-if="!navigation"></Navigation>
    <router-view/>
    <Footer v-if="!navigation"></Footer>
  </div>
</template>
<script>
  import Navigation from "./components/Navigation";
  import Footer from "./components/Footer";
  import firebase from "firebase/compat/app";
  import "firebase/compat/auth";
  export default {
    name:'app',
    components:{Footer, Navigation},
    created(){
      //updating user state initially by committing updateUser mutation
      firebase.auth().onAuthStateChanged((user)=>{
        this.$store.commit("updateUser", user);
        if(user){
          this.$store.dispatch("getCurrentUser")
        }
      })
      //checking route whether auth page or not.
      this.checkRoute();
      this.$store.dispatch("getMenuItems")
    },
    data(){
      return{
        navigation:null
      };
    },

    methods:{
      //Checking route whether or not auth pages.
      checkRoute(){
        if(this.$route.name === "Login" || this.$route.name === 'Register' || this.$route.name === "ForgotPassword"
        )
        {
          this.navigation=true;
          return;
        }
        this.navigation=false;
      }
    },
    watch:{
      $route(){
        this.checkRoute()
      }
    }

  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
