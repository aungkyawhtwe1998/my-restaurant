<template>
    <div class="modal">
        <div class="row my-5 p-5">
            <div class="col-12 p-3 rounded m-auto">
                <div class="card">
                    <div class="card-body">
                        <div @click.prevent="closeModal" class="text-end"><span class="close-icon"><BIconXCircleFill /></span></div>
                        <div class="text-center">
                            <h1>Login</h1>
                            <button class="btn btn-outline-dark" @click="googleSignIn"><BIconGoogle/> Signin with google</button>
                            <p class="mt-3">Don't you have an account?</p>
                            <span class="nav-link" @click.prevent="showRegister" v-show="loginModalActive">Register Here</span>
                            <p v-show="error" class="alert alert-warning my-2" role="alert">
                                {{this.errorMsg}}
                            </p>
                            <form>
                                <input type="text" v-model="name" v-show="registerModalActive" class="form-control mt-3 form-control-lg"  placeholder="Enter your name" >

                                <input type="email" v-model="email" class="form-control mt-3 form-control-lg"  placeholder="Enter your email">

                                <input type="password" v-model="password" class="form-control mt-3 form-control-lg"  placeholder="Enter your password">

                                <button class="btn btn-dark mt-2" @click.prevent="signIn" v-if="loginModalActive">Signin</button>
                                <button class="btn btn-dark mt-2 " @click.prevent="register"  v-if="registerModalActive">Register</button>
                            </form>
                            <p class="mt-3"> Already have an account?</p>
                            <span class="nav-link" @click.prevent="showLogin" v-show="registerModalActive">Login Here</span>
                            <router-link :to="{name:'ForgotPassword'}" class="nav-link" v-show="loginModalActive">Forgot password?</router-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase/compat/app";
    import "firebase/compat/auth";
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import db, {timestamp} from "../config/firebaseInit";

    export default {
        name:"LoginModal",
        props:["modalMessage"],
        data(){
            return{
                name:"",
                email:"",
                password:"",
                error:null,
                errorMsg:"",
                registerModalActive:false,
                loginModalActive:true,
            }
        },
        methods:{
            showRegister() {
                this.loginModalActive = false;
                this.registerModalActive = true;
            },
            showLogin() {
                this.loginModalActive = true;
                this.registerModalActive = false;
            },

            closeModal(){
                this.$emit("close-modal")
            },
            signIn(){
                firebase.auth().signInWithEmailAndPassword(this.email,this.password)
                    .then(()=>{
                        this.closeModal();
                        window.location.reload();
                        this.error = false;
                        this.errorMsg = "";
                    }).catch((err)=>{
                    this.error = true;
                    this.errorMsg = err.message;
                    setTimeout(()=>{
                        this.error = false;
                    },5000)
                    return;
                });
                return;
            },

            async googleSignIn(){
                const provider = new GoogleAuthProvider();
                const auth = getAuth();
                await signInWithPopup(auth, provider)
                    .then((result) => {
                        const dataBase = db.collection('users').doc(result.user.uid);
                        dataBase.set({
                            id:dataBase.id,
                            name:result.user.displayName,
                            email:result.user.email,
                            address:null,
                            photo:null,
                            owner:true,
                            date:timestamp
                        });
                        this.closeModal();
                        window.location.reload();
                        // ...
                    }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.error = true;
                    const email = error.email;
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                    console.log(errorCode+", "+errorMessage+", "+email+", "+credential)
                    return;
                });
                return;
            },

            async register(){
                if(this.name !== "" &&
                    this.email !=="" &&
                    this.address!=="" &&
                    this.password !== ""
                ){
                    this.loading=true;
                    this.error = false;
                    this.errorMsg="";
                    const firebaseAuth = await firebase.auth();
                    await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password).then((result)=>{
                        const dataBase = db.collection('users').doc(result.user.uid);
                        dataBase.set({
                            name:this.name,
                            email:this.email,
                            address:null,
                            photo:null,
                            owner:true,
                            date:timestamp
                        }).then(()=>{
                            this.errorMsg="";
                            this.error=false;
                            this.registerModalActive=false;
                            this.loginModalActive=true;
                            return;
                        }).catch(error=>{
                            this.error= true;
                            this.errorMsg = error.message;
                            setTimeout(()=>{
                                this.error = false;
                            },5000)
                        });
                        this.errorMsg="";
                        this.error=false;
                        window.location.reload()

                    }).catch(error=>{
                        this.error=true;
                        this.errorMsg = error.message;
                        setTimeout(()=>{
                            this.error = false;
                        },5000)
                        return;
                    });
                }else {
                    this.error = true;
                    this.errorMsg = "Please fill out all the fields!"
                    setTimeout(()=>{
                        this.error = false;
                    },5000)
                    return ;
                }

            }
        },
    }
</script>

<style scoped>
    .modal{
        width:400px;
        top:0;
        z-index: 10000;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .nav-link{
        cursor: pointer !important;
        transition: 0.8s;
    }
    .nav-link:hover{
        transform: scale(1.05);
    }
    .close-icon{
        transition: 0.9s;
    }
    .close-icon:hover{
        color: #6b4040;
    }
</style>