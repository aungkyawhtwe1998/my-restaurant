<template>
  <div >
    <div class="container min-vh-100">
      <div class="row my-3">
        <h1>Home</h1>
          <div class="col-md-4">
            <input type="text" class="form-control" v-model="name" placeholder="Name" aria-label="Enter your name" autocomplete="off">

          </div>
          <div class="col-md-4">
            <input type="number" class="form-control" v-model="phone" placeholder="Phone" aria-label="Enter your phone number" autocomplete="off">
          </div>
        <div class="col-md-1 mt-2">
          <button class="btn btn-primary" v-on:click="saveData">Save</button>
        </div>

      </div>
      <div class="row my-3">
        <div class="col-md-12">
          <table class="table border border-1 ">
            <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(contact, index) in contacts" :key="index">
              <td>{{contact.name}}</td>
              <td>{{contact.phone}}</td>
              <td>
                <button class="btn btn-danger" type="button" v-on:click="deleteData(contact.docid)">Delete</button>
              </td>
            </tr>
            </tbody>



          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import firebase from '../config/firebase'
  export default {
    name:'CreateContact',
    components:{

    },
    data:()=>({
      name:'',
      phone:'',
      contacts:[]
    }),
    mounted() {
      this.fetchData()
    },
    methods:{
      saveData(){
        /*console.log(this.name)
        console.log(this.phone)
        */
        //Creating a collection
        let obj = {
          name:this.name,
          phone:this.phone,
          timestamp:new Date()
        }
        //firebase query to contacts collection
        firebase.firestore.collection('contacts').add(obj).then(doc=>{
          alert('Data add and Doc id ' + doc.id)
          this.fetchData()
          this.name=''
          this.phone = ''
        }).catch(e=>{
          console.log(e)
        })
      },
      fetchData(){
        this.contacts= []
        firebase.firestore.collection('contacts').get().then(docs =>{
          docs.forEach(doc =>{
            this.contacts.push({...doc.data(), ...{docid:doc.id}})
          })
        })
      },
      deleteData(docid){
        if(confirm('Are you sure to delete ?')){
          firebase.firestore.collection('contacts').doc(docid).delete().then(()=>{
            alert("Doc Removed")
            this.fetchData()
          }).catch(e=>{
            console.log(e)
          })
        }

      }
    }
  }
</script>