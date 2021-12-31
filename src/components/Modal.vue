<template>
    <div class="modal">
        <div class="card w-25 h-25 rounded shadow-lg">
            <div class="card-body">
                <p>{{this.modalMessage}}</p>
                <button @click="closeModal" class="btn btn-dark">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:["modalMessage"],
        methods:{
            closeModal(){
                this.$emit("close-modal")
            }
        }
    }
</script>

<style scoped>

.modal{
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
</style>