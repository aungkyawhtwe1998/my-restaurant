<template>
    <div class="col-12 col-md-6 col-lg-3">
        <div class="card shadow-sm rounded mb-3 ">
            <div class="card-body p-0 ">
                <div :style="{ 'background-image': 'url(' + menu.menuPhoto + ')' }" style="background-size: cover; width: 100%;height: 200px; position: center"></div>
<!--                <img :src="menu.menuPhoto" alt="">-->
                <div class="w-100 bg-choco d-flex flex-column justify-content-start text-white p-3 m-0 desc">
                    <p class="fw-bolder">{{menu.menuName}}</p>
                    <p><BIconCoin/> {{menu.menuPrice}} - MMK</p>
                    <a :href="'tel:'+menu.menuPhone" class="text-decoration-none text-warning"><BIconPhone/>09 - {{menu.menuPhone}}</a>
<!--                    <p><BIconCalendar/> {{menu.menuDate.toDate().toLocaleTimeString('en-US',{ weekday:"short", year:"numeric", month:"short"})}}</p>-->
<!--                    <router-link class="btn btn-secondary my-3" :to="{name:'ShowMenu',params:{menuId: menu.menuId}}">View Details</router-link>-->
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
.bg-choco{
    background-color: #6b4040;
}
    img{
        width: 100%;
        height: 200px;
    }
</style>