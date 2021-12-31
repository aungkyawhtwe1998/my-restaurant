<template>
    <div>
        <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>

        <loading v-if="loading"/>

        <div class="container min-vh-100">
            <div class="row">
                <h1>Forgot Password</h1>
                <div class="col-12 col-lg-4 mt-5 mx-auto">
                    <div class="card rounded shadow-sm">
                        <div class="card-body">
                            <form>
                                <input v-model="email" type="email" class="form-control mt-3 form-control-lg"  placeholder="Enter your email">
                                <button @click.prevent="resetPassword" class="btn btn-primary my-4" type="text">Get Verification mail</button>
                            </form>
                            <router-link class="nav-link" :to="{name:'Login'}">Back to login ?</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Modal from "../../components/Modal";
    import Loading from "../../components/Loading";
    import firebase from "firebase/compat/app";
    import "firebase/compat/auth";
    export default {
        name:"ForgotPassword",
        data(){
            return{
                email:"",
                modalActive:false,
                modalMessage:"",
                loading:null,
            }
        },
        components: {Loading, Modal},
        methods:{
            resetPassword(){
                this.loading = true;
                firebase
                    .auth()
                    .sendPasswordResetEmail(this.email)
                    .then(()=>{
                        this.modalMessage =" If your account exists, you will receive an email";
                        this.loading=false;
                        this.modalActive=true;
                    })
                    .catch((err) =>{
                        this.modalMessage = err.message;
                        this.loading = false;
                        this.modalActive = true;
                    });

            },
            closeModal() {
                this.modalActive = !this.modalActive;
                this.email="";
            }
        },
    }
</script>