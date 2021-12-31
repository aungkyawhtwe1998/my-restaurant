<template>
    <div class="col-12 col-md-6 col-lg-3">
        <div class="card shadow-sm rounded mb-3 ">
            <div class="card-body p-0 ">
                <img :src="menu.menuPhoto" alt="">
                <div class="w-100 bg-dark text-white p-3 m-0 desc">
                    <p class="fw-bolder">{{menu.menuName}}</p>
                    <p><BIconCoin/> {{menu.menuPrice}} - MMK</p>
                    <p><BIconPhone/> {{menu.menuPhone}}</p>
                    <p><BIconCalendar/> {{menu.menuDate.toDate().toLocaleTimeString('en-US',{ weekday:"short", year:"numeric", month:"short"})}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"MenuCard",
        props:["menu"],

    }
</script>

<style scoped>
    .card{
        transition: 0.9s;
    }
.card:hover{
    background-color: #f3f3f3;
    transform: scale(1.02) ;
}
    img{
        width: 100%;
        height: 200px;
    }
</style>