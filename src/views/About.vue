<template>
  <div class="container min-vh-100">
    <div class="row">
      <div class="d-lg-flex bg-white my-3 justify-content-between">
        <h1 class="my-2"><BIconSliders/> Available Menu</h1>
        <div class="d-flex my-2">
          <input type="text" @change="clearMenu" class="form-control " v-model="search" placeholder="Search menu..."/>
          <button @click="searchMenu" class="btn btn-dark mx-1 "><BIconSearch/></button>
        </div>
      </div>
      <div class="row">
        <MenuCard :menu="menu" v-for="(menu, index) in menuItems" :key="index"/>
      </div>
    </div>
  </div>
</template>
<script>
  import MenuCard from "../components/MenuCard";
  export default {
    name:'About',
    components: {MenuCard},
    data(){
      return{
        search:""
      }
    },
    computed:{
      menuItems(){
        return this.$store.state.menuItems;
      }
    },
    methods:{
      searchMenu(){
        if(this.search !== ""){
          this.$store.commit("searchMenuItems", this.search);
        }
        else {
          this.$store.dispatch("getMenuItems");
        }
      },
      clearMenu(){
        if(this.search === ''){
          this.$store.dispatch("getMenuItems");
        }
      }
    }

  }
</script>