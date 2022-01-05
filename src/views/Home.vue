<template>
    <div class="">
        <LoginModal v-show="loginModal" v-on:close-modal="closeModal"/>
        <div class="container min-vh-100">
            <div class="row my-3 justify-content-center align-items-center">
                <div class="col-12 col-md-6 col-lg-6 text-center text-md-end text-lg-end">
                    <img src="../assets/homeBg.svg" width="400" alt="">
                </div>
                <div class="col-12 col-md-6 col-lg-6 text-lg-start text-md-start text-center">
                    <h1>Welcome {{profileName}}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur earum est, illo impedit nulla perspiciatis qui quo quos rem sed ullam vero?</p>
                    <button class="btn btn-dark" @click.prevent="showLogin" v-show="!this.$store.state.user">Signin Here</button>
                </div>
            </div>
            <div class="row my-3 justify-content-center align-items-center" v-if="this.$store.state.menuItemsLoaded">
                <h1 class="my-4 text-center">Latest Menu</h1>
                <MenuCard :menu="menu" v-for="(menu, index) in menuItems" :key="index"/>
            </div>
            <div class="row justify-content-center align-items-center" v-else>
                <div class="col-12 col-md-6 col-lg-6 text-center text-md-end text-lg-end">
                    <h1>Currently there is no menu</h1>
                    <p class="alert alert-warning">Please Sign in to see your menu</p>
                </div>
                <div class="col-12 col-md-6 col-lg-6 text-center text-md-start text-lg-start">
                    <img src="../assets/AboutBg.svg" width="400" alt="">
                </div>
            </div>
        </div>


    </div>
</template>
<script >
    import LoginModal from "../components/LoginModal";
    import MenuCard from "../components/MenuCard";
    export default {
        name:'Home',
        components: {MenuCard, LoginModal},
        data(){
            return{
                loginModal:false,
            }
        },
        computed:{
            profileName(){
                return this.$store.state.profileName;
            },
            menuItems(){
                return this.$store.getters.homeMenuItems;
            },
            user(){
                return this.$store.state.user;
            },
        },
        methods:{
            showLogin(){
                this.loginModal =true;

            },
            closeModal(){
                this.loginModal = !this.loginModal;
            },
        }
    }
</script>
<style scoped>
    .my-btn{
        padding: 5px;
        text-decoration: none;
        border-radius: 1rem;
        border: 2px solid #6b4040 !important;
        background-color: #6b4040 !important;
        color: #f3f3f3 !important;
        transition: 0.9s;
    }
    h1{
        color:#6b4040;
    }
    .my-btn:hover{
        border-radius: 1rem;
        border: 2px solid #6b4040 !important;
        background-color: #b38370 !important;
        color: #f3f3f3;
    }
    .nav-link{
        color:#6b4040 !important;
    }
</style>