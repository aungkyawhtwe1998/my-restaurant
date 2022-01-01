<template>
  <div class="container-fluid p-0">
    <Navigation v-if="!navigation"></Navigation>
    <router-view/>
    <Foot v-if="!navigation"></Foot>
  </div>
</template>
<script>
  import Navigation from "./components/Navigation";
  import firebase from "firebase/compat/app";
  import "firebase/compat/auth";
  import Foot from "./components/Foot";
  export default {
    name:'app',
    components:{Foot, Navigation},
    data(){
      return{
        navigation:null
      };
    },
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
  @import url('https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,300;0,500;0,800;1,500&display=swap');
*{
  font-family: 'Karla', sans-serif;
}

</style>
