<template>
    <div>
        <div class="container">
            <Modal v-if="modalActive" :modal-message="modalMessage" v-on:close-modal="closeModal"/>
            <div class="row my-5 min-vh-100">
                <div class="col-12 mx-auto col-md-6 col-lg-6">
                    <div class="card m-auto">
                        <div class="card-body">
                            <div v-if="photo == null" class="my-2 text-center">
                                <span class="fs-1"><BIconPersonCircle/></span>
                                <div class="d-flex justify-content-between">
                                    <input type="file" class="form-control my-2">
                                    <button class="btn btn-primary m-2">Upload</button>
                                </div>
                            </div>
                            <img :src="photo" v-else class="rounded-circle" width="50" alt="">
                            <div class="d-flex flex-column">
                                <span><BIconEnvelopeCheckFill/> Email:</span>
                                <span class="fw-bold">{{email}}</span>
                            </div>
                            <hr>
                            <div class="d-fl ex flex-column">
                                <span><BIconPersonCircle/> Owner:</span>
                                <input class="fw-bold form-control text-center" v-model="name" type="text"/>
                            </div>
                            <div class="d-flex flex-column mt-2">
                                <span><BIconGeoAltFill/> Address:</span>
                                <input class="fw-bold form-control text-center" placeholder="Enter your Address" v-model="address" type="text"/>
                            </div>
                            <hr>
                            <button @click="updateProfile" class="btn btn-dark rounded">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Modal from "../components/Modal";
    export default {
        name:"Profile",
        components: {Modal},
        data(){
            return{
                modalMessage:"Changes will saved!",
                modalActive:false,
            }
        },
        computed:{
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
            photo:{
                get(){
                    return this.$store.state.profilePhoto;
                },
                set(payload){
                    this.$store.commit("changeProfile",payload);
                }
            },
            email(){
                return this.$store.state.profileEmail;
            }
        },

        methods:{
            updateProfile() {
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