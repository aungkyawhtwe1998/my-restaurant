<template>
    <div >
        <Loading v-show="loading"/>
        <div class="container min-vh-100">
            <div class="row my-3">
                <div class="d-lg-flex justify-content-between">
                    <h1><BIconSliders/> Admin Panel</h1>
                    <div class="d-flex">
                        <input type="text" @change="clearMenu" class="form-control" v-model="search" placeholder="Search menu..."/>
                        <button @click="searchMenu" class="btn btn-dark mx-1"><BIconSearch/></button>
                    </div>
                </div>

                <div class="col-12 col-md-4 col-lg-4  ">
                    <div class="card mt-2">
                        <div class="card-header">Create new menu</div>
                        <div class="card-body text-start">
                            <div v-if="error" class="alert alert-warning" role="alert">
                                <p>{{this.errorMsg}}</p>
                            </div>
                            <div class="form-group mb-1">
                                <label>Name :</label>
                                <input type="text" class="form-control" v-model="menuName" placeholder="Enter Recipe name" autocomplete="off">
                            </div>
                            <div class="form-group mb-1">
                                <label>Photo:</label>
                                <input type="file" ref="menuPhoto" class="form-control my-2" accept=".png, .jpg, .jpeg">
                            </div>
                            <div class="form-group mb-1">
                                <label  class="mt-2">Price :</label>
                                <input type="text" class="form-control mt-2" v-model="menuPrice" placeholder="Enter price" autocomplete="off">
                            </div>
                            <div class="form-group mb-1">
                                <label  class="mt-2">Contact Number :</label>
                                <input type="number" class="form-control mt-2" v-model="menuPhone" placeholder="Enter contact number" autocomplete="off">
                            </div>
                           <button class="btn btn-dark w-100 mt-3" @click="uploadMenu">Save</button>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-8 col-lg-8  mt-3 ">
                    <div class="table-responsive">
                        <table class="table border rounded table-hover">
                            <thead>
                            <tr class="text-center">
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Photo</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(menu, index) in getMenu" class="align-middle text-center" :key="menu.menuId">
                                <td>{{index+1}}</td>
                                <td>{{menu.menuName}}</td>
                                <td>{{menu.menuPrice}}</td>
                                <td><img :src="menu.menuPhoto" width="50" class="rounded-circle" alt=""></td>
                                <td>{{menu.menuPhone}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="deleteMenu(menu.menuId)"><BIconTrash/></button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
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
    import firebase from "firebase/compat";
    export default {
        name:'Admin',
        components:{
            Loading
        },
        data(){
            return{
                search:"",
                file:null,
                loading:false,
                error:false,
                errorMsg:'',
            }

        },
        created() {
        },
        computed:{
            getMenu(){
                return this.$store.state.ownerMenu;
            },
            profileId(){
                return this.$store.state.user.uid;
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
            /*async uploadMenu(){
                this.file = this.$refs.menuPhoto.files[0];
                this.$store.commit("updateMenuPhoto", URL.createObjectURL(this.file));
                if(this.menuName !=="" && this.file !== null && this.menuPrice !== "" && this.menuPhone !=="") {
                    this.loading = true;
                    this.error = false;
                    this.errorMsg = "";
                    const storageRef = firebase.storage().ref();
                    const docReference = storageRef.child(`document/menuPhoto/${this.file.name}`);
                    docReference.put(this.file).on("state_changed",(snapshot) => {
                        console.log(snapshot)
                    },(err)=>{
                            console.log(err.message);
                        }, async ()=>{
                            const downloadUrl =await docReference.getDownloadURL();
                            this.$store.commit("updateMenuPhoto", downloadUrl);
                            const menuDb = db.collection('menu').doc();
                            console.log(menuDb)
                            await menuDb.set({
                                id:menuDb.id,
                                name:this.menuName,
                                photo:downloadUrl,
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
                        this.$store.dispatch("getMenuItems");
                        return;
                        });
                }
                this.error = true;
                this.errorMsg ="Please fill all the fields!";
                setTimeout(()=>{
                    this.error = false;
                },5000)
            },*/

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
            },
            async uploadMenu(){
                this.file = this.$refs.menuPhoto.files[0];
                if(this.file){
                    this.$store.commit("updateMenuPhoto", URL.createObjectURL(this.file));
                    if(this.menuName !==null && this.menuPhoto!==null && this.menuPrice !== null && this.menuPhone !==null) {
                        this.loading = true;
                        this.error= false;
                        this.errorMsg="";
                        console.log(this.error);
                        const storageRef = firebase.storage().ref();
                        const docReference = storageRef.child(`document/menuPhoto/${this.file.name}`);
                        docReference.put(this.file).on("state_changed",(snapshot) => {
                            console.log(snapshot)
                            this.loading = false;
                        },(err)=>{
                            this.loading=false;
                            this.error =false;
                            this.errorMsg = err.message;
                            console.log(err.message);
                        }, async ()=>{
                            this.loading = true;
                            const downloadUrl =await docReference.getDownloadURL();
                            this.$store.commit("updateMenuPhoto", downloadUrl);
                            const menuDb = db.collection('menu').doc();
                            await menuDb.set({
                                id:menuDb.id,
                                name:this.menuName,
                                photo:downloadUrl,
                                price:this.menuPrice,
                                phone:this.menuPhone,
                                ownerId:this.profileId,
                                date:timestamp
                            });
                            this.menuName = "";
                            this.menuPhoto="";
                            this.menuPrice="";
                            this.menuPhone="";
                            this.loading = false;
                            this.error=false;
                            this.errorMsg="";
                            this.$store.dispatch("getOwnerMenu");
                            this.$store.dispatch("getMenuItems");
                        });
                        this.loading = false;
                        this.error=false;
                        this.errorMsg="";
                    }
                    else {
                        console.log("fill data")
                        this.loading = false;
                        this.error = true;
                        this.errorMsg ="Please fill all the fields!";
                        setTimeout(()=>{
                            this.error = false;
                        },5000)
                    }
                }else {
                    this.error = true;
                    this.errorMsg = "Upload photo";
                }



            },
            deleteMenu(id){
                this.$store.dispatch("deleteMenu", id);
                this.$store.dispatch("getMenuItems");
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