<template>
    <div>
        <div class="container">
            <Modal v-if="modalActive" :modal-message="modalMessage" v-on:close-modal="closeModal"/>
            <div class="row my-5 min-vh-100">
                <div class="col-12 mx-auto col-md-6 col-lg-6">
                    <div class="card m-auto">
                        <div class="card-body">
                            <div v-if="this.$store.state.profilePhoto == null" class="my-2 text-center">
                                <span class="fs-1"><BIconPersonCircle/></span>
                            </div>
                            <div class="text-center" v-else >
                                <img :src="this.$store.state.profilePhoto" class="rounded" width="200" alt="">

                            </div>

                            <div class="d-flex flex-column">
                                <span><BIconEnvelopeCheckFill/> Email:</span>
                                <span class="fw-bold">{{email}}</span>
                            </div>
                            <hr>
                            <form action="">
                                <div class="form-group">
                                    <label>Profile Photo</label>
                                    <input type="file" ref="profilePhoto" class="form-control my-2" accept=".png, .jpg, .jpeg">
                                </div>
                                <div class="form-group">
                                    <span><BIconPersonCircle/> Owner:</span>
                                    <input class="fw-bold form-control text-center" v-model="name" type="text"/>
                                </div>

                                <div class="form-group">
                                    <label><BIconGeoAltFill/> Address:</label>
                                    <input class="fw-bold form-control text-center" placeholder="Enter your Address" v-model="address" type="text"/>
                                </div>
                                <hr>

                                <hr>
                                <button @click="updateProfile" class="btn btn-dark rounded">Save Changes</button>
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
            profileId(){
                return this.$store.state.profileId;
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
            updatePhoto(){

            },
            updateProfile() {
                this.file = this.$refs.profilePhoto.files[0];
                this.$store.commit("createPhotoURL", URL.createObjectURL(this.file));
                const storageRef = firebase.storage().ref();
                const docReference = storageRef.child(`document/profilePhoto/${this.file.name}`);
                docReference.put(this.file).on(
                    "state_changed",
                    (snapshot) => {
                        console.log(snapshot)
                    }, (err)=>{
                        console.log(err.message);
                    },async ()=>{
                        const downloadUrl =await docReference.getDownloadURL();
                        this.$store.commit("createPhotoURL", downloadUrl);
                    });
                this.$store.dispatch("updateProfileSettings");
                this.modalActive = !this.modalActive;
            },
            closeModal(){
                this.modalActive = !this.modalActive;
            },
        }
    }
</script>

<style scoped>

</style>