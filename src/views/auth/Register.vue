<template>
    <div>
        <div class="container min-vh-100">
            <div class="row">
                <h1>Register</h1>
                <div class="col-12 col-lg-6 mt-5 mx-auto">
                    <div class="card rounded shadow-sm">
                        <div class="card-body">
                            <form>

                                <input type="text" v-model="name" class="form-control mt-3 form-control-lg"  placeholder="Enter your name" >
<!--                                <p class="bg-warning my-2 fw-bold rounded w-100" v-show="error">{{this.errorMsg}}</p>-->

                                <input type="email" v-model="email" class="form-control mt-3 form-control-lg"  placeholder="Enter your email">
<!--                                <p class="bg-warning my-2 fw-bold rounded w-100" v-show="error">{{this.errorMsg}}</p>-->

                                <input type="password" v-model="password" class="form-control mt-3 form-control-lg"  placeholder="Enter your password">

                                <div v-show="error" class="alert alert-warning" role="alert">
                                    <span>Error:</span>{{this.errorMsg}}
                                </div>
<!--                                <p class="bg-warning my-2 fw-bold rounded w-100" v-show="error">{{this.errorMsg}}</p>-->
                                <button @click.prevent="register" class="btn btn-primary mt-2" type="submit">Register</button>
                            </form>
                            <p class="mt-3"> Already have an account?</p>
                            <router-link class="nav-link" :to="{name:'Login'}">Login Here</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase/compat/app";
    import db, {timestamp} from '../../config/firebaseInit';
    import "firebase/compat/auth";
    export default {
        name:"Register",
        data(){
            return{
                name:'',
                email:'',
                password:'',
                error:null,
                errorMsg:""
            }
        },
        methods:{

            async register(){
                if(this.name !== "" && this.email !=="" && this.address!=="" && this.password !== ""){
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
                        date:timestamp
                    });
                    this.$router.push({name:"Login"});
                    return;
                }
                this.error = true;
                this.errorMsg = "Please fill out all the fields!"
                return ;
            }

        }
    }
</script>