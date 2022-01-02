<template>
    <div >
        <Loading v-show="loading"/>
        <div class="container min-vh-100">
            <div class="row my-3">
                <h1>Admin Panel</h1>
                <div class="col-12 col-md-4 col-lg- ">
                    <div class="card">
                        <div class="card-header">Create new menu</div>
                        <div class="card-body text-start">
                            <div v-if="error" class="alert alert-warning" role="alert">
                                <span>Error:</span>{{this.errorMsg}}
                            </div>

                            <label>Name :</label>
                            <input type="text" class="form-control" v-model="menuName" placeholder="Enter Recipe name" autocomplete="off">
                            <label class="mt-2">Photo Url :</label>
                            <input type="text" class="form-control mt-2" v-model="menuPhoto" placeholder="Enter photo link" autocomplete="off">
                            <label  class="mt-2">Price :</label>
                            <input type="text" class="form-control mt-2" v-model="menuPrice" placeholder="Enter price" autocomplete="off">
                            <label  class="mt-2">Contact Number :</label>
                            <input type="number" class="form-control mt-2" v-model="menuPhone" placeholder="Enter contact number" autocomplete="off">
                            <button class="btn btn-primary mt-3" @click="uploadMenu">Save</button>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-8 col-lg-8">
                    <table class="table border border-1 ">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Photo</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="menu in getMenu" :key="menu.menuId">

                            <td>{{menu.menuName}}</td>
                            <td>{{menu.menuPrice}}</td>
                            <td><img :src="menu.menuPhoto" width="100" alt=""></td>
                            <td>{{menu.menuPhone}}</td>
                            <td>
                                <button class="btn btn-danger" @click="deleteMenu(menu.menuId)"><BIconTrash/></button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row my-3">

            </div>
        </div>
    </div>
</template>
<script>
    import db, {timestamp} from '../config/firebaseInit';
    import "firebase/compat/auth";
    import Loading from "../components/Loading";
    export default {
        name:'Admin',
        components:{
            Loading
        },
        data(){
            return{
                loading:false,
                error:false,
                errorMsg:'',
            }

        },
        computed:{
            getMenu(){
                return this.$store.state.menuItems;
            },
            profileId(){
                return this.$store.state.profileId;
            },
            menuName:{
                get(){
                    return this.$store.state.menuName;
                },
                set(payload){
                    this.$store.commit("updateMenuName",payload);
                }
            },
            menuPhone:{
                get(){
                    return this.$store.state.menuPhone;
                },
                set(payload){
                    this.$store.commit("updateMenuPhone",payload);
                }
            },
            menuPrice:{
                get(){
                    return this.$store.state.menuPrice;
                },
                set(payload){
                    this.$store.commit("updateMenuPrice",payload);
                }
            },
            menuPhoto:{
                get(){
                    return this.$store.state.menuPhoto
                },
                set(payload){
                    this.$store.commit("updateMenuPhoto",payload);
                }
            }
        },
        mounted() {

            // this.fetchData()
        },
        methods:{
            async uploadMenu(){
                console.log("upload:"+this.profileId);
                if(this.menuName !=="" && this.menuPhoto!=="" && this.menuPrice !== "" && this.menuPhone !==""){
                    this.loading = true;
                    this.error=false;
                    this.errorMsg="";
                    const menuDb = db.collection('menu').doc();
                    await menuDb.set({
                        id:menuDb.id,
                        name:this.menuName,
                        photo:this.menuPhoto,
                        price:this.menuPrice,
                        phone:this.menuPhone,
                        ownerId:this.profileId,
                        date:timestamp
                    });
                    this.menuName = "";
                    this.menuPhoto="";
                    this.menuPrice="";
                    this.menuPhone="";
                    this.loading=false;
                    window.location.reload();
                    // this.$router.push({name:"Home"});
                    return;
                }
                this.error = true;
                this.errorMsg ="Please fill all the fields!";
                setTimeout(()=>{
                    this.error = false;
                },5000)
            },
            deleteMenu(id){
                this.$store.dispatch("deleteMenu", id);
            }

        }
    }
</script>
<style scoped>
    img{
        width:100px;
        height: 100px;
    }
</style>