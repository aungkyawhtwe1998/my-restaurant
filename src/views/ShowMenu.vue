<template>
    <div v-if="currentMenu && currentShop">
        <div class="container min-vh-100">
            <div class="row py-5">
                <div class="col-12 col-md-6">
                    <h1>Menu</h1>
                    <div class="card">
                        <div class="card-body text-center">
                            <h1><BIconClipboardCheck/> {{this.currentMenu[0].menuName}}</h1>
                            <img :src="this.currentMenu[0].menuPhoto" width="300" class="rounded" alt="">
                            <div class="bg-choco text-white m-1 rounded p-1">
                                <p><BIconTags/> {{this.currentMenu[0].menuPrice}}</p>
                                <a class="text-decoration-none text-warning" href="tel:{{this.currentMenu[0].menuPhone}}"><BIconTelephone/> {{this.currentMenu[0].menuPhone}}</a>

                            </div>
                            </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <h1>Restaurant</h1>
                    <div class="card">
                        <div class="card-body text-center">
                            <h1><BIconShop/>{{this.currentShop[0].profileName}}</h1>
                            <img :src="this.currentShop[0].profilePhoto" v-if="this.currentShop[0].profilePhoto !== null" class="rounded" width="300" alt="">
                            <div class="bg-choco text-white rounded m-1 p-1">
                                <p v-if="this.currentShop[0].profileAddress!==null">{{this.currentShop[0].profileAddress}}</p>
                                <p>{{this.currentShop[0].profileId}}</p>
                            </div>
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
                currentShop:null,
            }
        },
        async mounted() {
            this.currentMenu = await this.$store.state.menuItems.filter((menu) =>{
                return menu.menuId === this.$route.params.menuId
            });
            this.currentShop =await this.$store.state.users.filter((current)=>{
                return current.profileId === this.currentMenu[0].ownerId
            })
        },

    }
</script>

<style scoped>
    .bg-choco{
        background-color: #6b4040;
    }
</style>