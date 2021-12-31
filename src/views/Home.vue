<template>
    <div class="">
        <div class="container">
            <div class="row mt-5">
                <div class="col-12 col-md-6">
                   <div class="justify-content-center align-items-center">
                       <h1>Welcome to My Restaurant</h1>
                       <div class="d-lg-none d-block">
                           <router-link class="btn btn-dark mx-3"  :to="{name:'Login'}">Login</router-link>
                           <router-link class="btn btn-secondary" :to="{name:'About'}">View our menu</router-link>
                       </div>
                   </div>
                </div>
                <div class="col-12 col-md-6">
                    <img src="https://pixy.org/src/455/thumbs350/4553764.jpg" class="w-75" alt="">
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row my-3 justify-content-center align-items-center">
                <h1 class="my-2">Explore and Order</h1>
                <MenuCard :menu="menu" v-for="(menu, index) in menuItems" :key="index"/>
                <router-link class="nav-link mt-3" :to="{name:'About'}"> <h3>Explore More >></h3> </router-link>
            </div>
        </div>

    </div>
</template>
<script>
    import MenuCard from "../components/MenuCard";
    export default {
        name:'Home',
        components: {MenuCard},
        computed:{
            menuItems(){
                return this.$store.getters.homeMenuItems;
            }
        }
    }
</script>