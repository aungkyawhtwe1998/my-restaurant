<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <img :src="this.currentMenu[0].menuPhoto" alt="">
                            <h1>{{this.currentMenu[0].menuName}}</h1>
                            <h1>{{this.currentMenu[0].menuPrice}}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name:"ShowMenu",
        data(){
            return{
                currentMenu:null,
            }
        },
        async mounted(){
            // console.log("MenuID: "+this.$route.params.menuId);
            this.currentMenu = await this.$store.state.menuItems.filter((menu) =>{
                return menu.menuId === this.$route.params.menuId
            });
            // console.log(this.currentMenu[0].menuId)
        }

    }
</script>

<style scoped>

</style>