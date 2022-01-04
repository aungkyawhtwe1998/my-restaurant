<template>
    <div class="container-fluid m-0 p-0 sticky-top">
        <div id="nav">
            <nav class="navbar navbar-expand-lg navbar-dark bg-choco ">
                <div class="container">
                    <router-link class="navbar-brand" :to="{name:'Home'}">My Restaurant</router-link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{name:'Home'}">Home</router-link>
                            </li>
                            <!--<li class="nav-item">
                                <router-link class="nav-link" :to="{name:'About'}">Menu</router-link>
                            </li>-->
                            <li class="nav-item" v-if="!user">
                                <router-link class="nav-link" :to="{name:'Login'}">Login/Register</router-link>
                            </li>
                        </ul>
                        <div class="dropdown" v-if="user">
                            <button class="btn btn-outline-light rounded dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {{this.$store.state.profileName}}
                            </button>
                            <ul class="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                                <li><router-link class="dropdown-item" :to="{name:'Profile'}"><BIconPersonCircle/> Profile</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Admin'}"><BIconSliders/> Admin Panel</router-link></li>
                                <li><div class="dropdown-item" @click="signOut"><BIconBoxArrowRight/> Logout</div></li>
                            </ul>
                        </div>


                    </div>
                </div>
            </nav>
        </div>
    </div>

</template>

<script>
    import firebase from "firebase/compat/app";
    import "firebase/compat/auth";
    export default {
        name:'navigation',
        data(){
            return{
            }
        },
        computed: {
           user(){
               return this.$store.state.user;
            }
        },
        methods:{
            signOut(){
                firebase.auth().signOut();
                this.$router.push({name:"Home"});
                window.location.reload();
            }
        }

    }
</script>


<style scoped>
    .nav-link{
        text-align: center;
        margin: 5px;
        border-radius: 1rem;
        border: 3px;
        font-weight: bolder;
        transition: 0.5s;
    }

    .nav-link:hover{
        border-radius: 1rem;
        border: 3px solid #6b4040;
        background-color: #b38370;
        color: #f3f3f3 !important;
    }
    .bg-choco{
        background-color:#6b4040;
    }
</style>