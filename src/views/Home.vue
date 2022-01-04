<template>
    <div class="">
        <div class="container min-vh-100">
            <div class="row mt-5 justify-content-center align-items-center">
                <div class="col-12 col-md-6 col-lg-6 text-end">
                    <img src="../assets/homeBg.svg" width="400" alt="">
                </div>
                <div class="col-12 col-md-6 col-lg-6 text-start">
                    <h1>Welcome {{profileName}}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur earum est, illo impedit nulla perspiciatis qui quo quos rem sed ullam vero?</p>
<!--                    <router-link class="my-btn my-3"  :to="{name:'Login'}"><BIconGear/> Access Owner panel</router-link>-->
                </div>

            </div>
            <div class="row my-3 justify-content-center align-items-center" v-if="this.$store.state.menuItemsLoaded">
                <h1 class="my-4 text-center">Current Menu</h1>
                <MenuCard :menu="menu" v-for="(menu, index) in menuItems" :key="index"/>
            </div>
            <div v-else>
                <div class="col-12 my-3">
                    <h1>Currently there is no menu</h1>
                    <p class="alert alert-warning">Please Sign in to see your menu</p>

                </div>
            </div>
        </div>


    </div>
</template>
<script >
    import MenuCard from "../components/MenuCard";
    export default {
        name:'Home',
        components: {MenuCard},
        computed:{
            profileName(){
                return this.$store.state.profileName;
            },
            menuItems(){
                return this.$store.state.menuItems;
            },
            user(){
                return this.$store.state.user;
            },
        },
        created() {

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