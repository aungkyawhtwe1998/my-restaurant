<template>
    <div>
        <div class="container min-vh-100">
            <div class="row my-5">

                <div class="col-12 col-md-5 col-lg-5 mt-5 mx-auto">
                    <div>
                        <h1>Login</h1>
                        <button class="btn btn-primary" @click="googleSignIn"><BIconGoogle/>Signin with google</button>
                        <p class="mt-3">Don't you have an account?</p>
                        <router-link class="nav-link" :to="{name:'Register'}">Register here</router-link>
                    </div>
                    <div class="card rounded shadow-sm">
                        <div class="card-body">
                            <form>

                                <input type="email" v-model="email" class="form-control mt-3 form-control-lg"  placeholder="Enter your email" name="email">

                                <input type="password" v-model="password " class="form-control mt-3 form-control-lg"  placeholder="Enter your password" name="password">

                                <p v-show="error" class=" text-danger rounded m-3">{{this.errorMsg}}</p>
                                <button @click.prevent="signIn" class="btn btn-primary my-3" type="submit">Login</button>
                                <br>
                                <router-link class="nav-link" :to="{name:'ForgotPassword'}">Forgot Password?</router-link>

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
    import "firebase/compat/auth";
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import db, {timestamp} from "../../config/firebaseInit";

    export default {
        name:"Login",
        data(){
            return{
                email:"",
                password:"",
                error:null,
                errorMsg:""
            }
        },
        methods:{
            signIn(){
                firebase.auth().signInWithEmailAndPassword(this.email,this.password).
                then(()=>{
                    this.$router.push({name:"Register"});
                    this.error = false;
                    this.errorMsg = "";
                    // console.log(firebase.auth().currentUser.uid);

                }).catch((err)=>{
                    this.error = true;
                    this.errorMsg = err.message;
                });
            },
            googleSignIn(){
                const provider = new GoogleAuthProvider();
                const auth = getAuth();
                signInWithPopup(auth, provider)
                    .then((result) => {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        // const credential = GoogleAuthProvider.credentialFromResult(result);
                        // const token = credential.accessToken;
                        // The signed-in user info.
                        const dataBase = db.collection('users').doc(result.user.uid);
                        dataBase.set({
                            name:result.user.displayName,
                            email:result.user.email,
                            address:null,
                            date:timestamp
                        });
                        this.$router.push({name:"Home"});
                        window.loading.reload();
                        // ...
                    }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                    console.log(errorCode+":"+errorMessage+":"+email+":"+credential)
                });

            }
        },
    }
</script>