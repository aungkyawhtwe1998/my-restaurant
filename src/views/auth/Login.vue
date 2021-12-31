<template>
    <div>
        <div class="container min-vh-100">
            <div class="row my-5">
                <h1>Login</h1>
                <span class="mt-3">Don't you have an account?</span>
                <router-link class="nav-link" :to="{name:'Register'}">Register here</router-link>
                <div class="col-12 col-md-5 col-lg-5 mt-5 mx-auto">
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
                firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(()=>{
                    this.$router.push({name:"Home"});
                    this.error = false;
                    this.errorMsg = "";
                    // console.log(firebase.auth().currentUser.uid);
                    this.$router.push({name:"Home"})

                }).catch((err)=>{
                    this.error = true;
                    this.errorMsg = err.message;
                })
            }
        }
    }
</script>