<template>
    <div>
        <div class="container-fluid bg-choco">
            <div class="row ">
                <div class="container my-2">
                    <div class="row justify-content-center align-items-center">
                        <div class="text-center">
                            <ul class="d-flex list-unstyled align-items-start justify-content-center">
                                <li class="nav-item">
                                    <a class="nav-link" href="#"><BIconYoutube/> </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href=""><BIconFacebook/> </a>

                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href=""><BIconLinkedin/> </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href=""><BIconTwitter/> </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p class="text-white text-center">Copyright 2021, All right reserved</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'Foot'
    }
</script>

<style scoped>
.nav-link{
    transition: 0.9s;
    color:#b38370;

}

.bg-choco{
    background-color:#6b4040;

}
    .nav-link:hover{
        color: #f3f3f3 !important;
        transform: scale(1.5);
    }
</style>