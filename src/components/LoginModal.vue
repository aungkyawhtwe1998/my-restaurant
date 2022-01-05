<template>
    <div class="modal">
        <div class="row my-5">
            <div class="bg-light p-3 rounded">
                <div @click.prevent="closeModal" class="text-end"><span class="close-icon"><BIconXCircleFill /></span></div>
                <div class="text-center">
                    <h1>Login</h1>
                    <button class="btn btn-outline-dark" @click="googleSignIn"><BIconGoogle/> Signin with google</button>
                    <p class="mt-3">Don't you have an account?</p>
                    <div class="" >
                        <span class="nav-link" @click.prevent="showRegister" v-show="loginModalActive">Register Here</span>
                        <form>
                            <input type="text" v-model="name" v-show="registerModalActive" class="form-control mt-3 form-control-lg"  placeholder="Enter your name" >

                            <input type="email" v-model="email" class="form-control mt-3 form-control-lg"  placeholder="Enter your email">

                            <input type="password" v-model="password" class="form-control mt-3 form-control-lg"  placeholder="Enter your password">

                            <div v-show="error" class="alert alert-warning" role="alert">
                                <span>Error:</span>{{this.errorMsg}}
                            </div>

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
                    return;
                });
                return;
            },

            googleSignIn(){
                const provider = new GoogleAuthProvider();
                const auth = getAuth();
                signInWithPopup(auth, provider)
                    .then((result) => {
                        const dataBase = db.collection('users').doc(result.user.uid);
                        dataBase.set({
                            id:dataBase.id,
                            name:result.user.displayName,
                            email:result.user.email,
                            address:null,
                            photo:null,
                            owner:false,
                            date:timestamp
                        });
                        window.location.reload();
                        // ...
                    }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
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
                    const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
                    const result = await createUser;
                    const dataBase = db.collection('users').doc(result.user.uid);
                    await dataBase.set({
                        name:this.name,
                        email:this.email,
                        address:null,
                        photo:null,
                        owner:false,
                        date:timestamp
                    }).then(()=>{
                        this.closeModal();
                        window.location.reload();
                        return;
                    }).catch(error=>{
                        this.error= true;
                        this.errorMsg = error.message();
                    });
                }
                this.error = true;
                this.errorMsg = "Please fill out all the fields!"
                return ;
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
        background-color: rgba(0,0,0,0.2);
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