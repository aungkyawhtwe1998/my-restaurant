<template>
    <div class="loading">
        <span></span>
    </div>
</template>

<script>
    export default {
        name:"loading",
    }
</script>

<style scoped>
    .loading {
        top: 0;
        z-index: 1000;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    span {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #6767c4;
        border-bottom: 16px solid #6767c4;
        width: 60px;
        height: 60px;
        -webkit-animation: spin 2s linear infinite;
        animation: spin ease 1000ms  infinite;
    }


    /* Safari */
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>