<template>
  <div class="container">
    <div class="row my-3">
      <h1 class="my-2">Explore and Order</h1>

      <MenuCard :menu="menu" v-for="(menu, index) in menuItems" :key="index"/>
    </div>
  </div>
</template>
<script>
  import MenuCard from "../components/MenuCard";
  export default {
    name:'About',
    components: {MenuCard},
    computed:{
      menuItems(){
        return this.$store.state.menuItems;
      }
    }
  }
</script>