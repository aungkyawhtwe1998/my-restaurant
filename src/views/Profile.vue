<template>
    <div>
        <div class="container">
            <Modal v-if="modalActive" :modal-message="modalMessage" v-on:close-modal="closeModal"/>
            <div class="row my-5 min-vh-100">
                <div class="col-12 mx-auto col-md-6 col-lg-6">
                    <div class="card ">
                        <div class="card-body">
                            <div v-if="photo == null" class="my-2 text-center">
                                <span class="fs-1"><BIconPersonCircle/></span>
                            </div>
                            <div class="text-center" v-else >
                                <img :src="photo" class="rounded" width="200" alt="">
                            </div>
                            <div class="d-flex flex-column">
                                <span><BIconEnvelopeCheckFill/> Email:</span>
                                <span class="fw-bold">{{email}}</span>
                            </div>
                            <hr>
                            <form action="">
                                <div class="form-group">
                                    <label>Profile Photo</label>
                                   <div class="d-flex">
                                       <input type="file" ref="profilePhoto" class="form-control my-2" accept=".png, .jpg, .jpeg">
                                       <button class="btn btn-dark my-2" @click.prevent="uploadProfilePhoto">Upload</button>
                                   </div>
                                </div>
                                <div class="form-group">
                                    <span><BIconPersonCircle/> Owner:</span>
                                    <input class="fw-bold form-control" v-model="name" type="text"/>
                                </div>

                                <div class="form-group">
                                    <label><BIconGeoAltFill/> Address:</label>
                                    <textarea class="fw-bold form-control" placeholder="Enter your Address" v-model="address" type="text"></textarea>
                                </div>
                                <hr>

                                <hr>
                                <button @click.prevent="updateProfile" class="btn btn-dark rounded">Save Changes</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase/compat/app";
    import "firebase/compat/storage"
    // import db from "../config/firebaseInit";
    import Modal from "../components/Modal";
    import db from "../config/firebaseInit";
    export default {
        name:"Profile",
        components: {Modal},
        data(){
            return{
                file:null,
                url:null,
                modalMessage:"Changes will saved!",
                modalActive:false,
            }
        },
        computed:{
            user(){
                return this.$store.state.user;
            },
            photo:{
                get(){
                    return this.$store.state.profilePhoto;
                },
                set(payload){
                    this.$store.commit("changePhoto", payload);
                }
            },
            name:{
                get(){
                    return this.$store.state.profileName;
                },
                set(payload){
                    this.$store.commit("changeName", payload);
                }
            },
            address:{
                get(){
                    return this.$store.state.profileAddress;
                },
                set(payload){
                    this.$store.commit("changeAddress", payload);
                }
            },
            email(){
                return this.$store.state.profileEmail;
            }
        },

        methods:{
            uploadProfilePhoto(){
                this.file = this.$refs.profilePhoto.files[0];
                if(this.file){
                    this.modalMessage="";
                    this.modalActive=false;
                    this.$store.commit("createPhotoURL", URL.createObjectURL(this.file));
                    const storageRef = firebase.storage().ref();
                    const docReference = storageRef.child(`document/profilePhoto/${this.file.name}`);
                    docReference.put(this.file).on(
                        "state_changed",
                        (snapshot) => {
                            this.modalMessage="Uploaded!";
                            this.modalActive=true;
                            console.log(snapshot)
                        }, (err)=>{
                            console.log(err.message);
                            this.modalMessage=err.message;
                            this.modalActive=true;
                        },async ()=>{
                            const downloadUrl =await docReference.getDownloadURL();
                            console.log("url: "+downloadUrl);
                            console.log("profile id:"+this.user.uid);
                            const userDB = await db.collection('users').doc(this.user.uid);
                            console.log("db id: "+userDB.id);
                            await userDB.update({
                                photo:downloadUrl,
                            });
                            this.$store.dispatch("getCurrentUser");
                        });
                    this.modalActive = false;
                }
                else {
                    this.modalMessage = "Select picture!"
                    this.modalActive = true;
                }


            },
            updateProfile() {
                if(this.name !== "" && this.address !== ""){
                    this.$store.dispatch("updateProfileSettings");
                    this.modalMessage = "Updated Successfully";
                    this.modalActive = true;
                }
                else {
                    this.modalMessage = "Fill completely";
                    this.modalActive = true;
                }

            },
            closeModal(){
                this.modalActive = !this.modalActive;
            },


        }
    }
</script>

<style scoped>

</style>