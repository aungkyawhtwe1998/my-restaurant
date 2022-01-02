<template>
    <div class="">
        <div class="container">
            <div class="row mt-5 align-items-center align-items-center d-flex">
                <div class="col-12 col-md-6 col-lg-6 text-end">
                    <img src="../assets/homeBg.svg" width="300" alt="">
                </div>
                <div class="col-12 col-md-6 col-lg-6 text-start">
                    <h1>Welcome to My Restaurant</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur earum est, illo impedit nulla perspiciatis qui quo quos rem sed ullam vero?</p>
<!--                    <router-link class="my-btn my-3"  :to="{name:'Login'}"><BIconGear/> Access Owner panel</router-link>-->
                </div>

            </div>
        </div>
        <div class="container">
            <div class="row my-3 justify-content-center align-items-center">
                <h1 class="my-4 text-center">New Menu Available</h1>
                <MenuCard :menu="menu" v-for="(menu, index) in menuItems" :key="index"/>
                <router-link class="nav-link mt-3 text-center" :to="{name:'About'}"> <h3>Explore More >></h3> </router-link>
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
            menuItems(){
                return this.$store.state.menuItems;
            },
            user(){
                return this.$store.state.user;
            },
        },
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