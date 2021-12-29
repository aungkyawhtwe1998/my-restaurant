<template>
    <div>
        <div class="container">
            <div class="row my-5">
                <h1>Login</h1>
                <div class="col-12 col-lg-6 m-auto">
                    <div class="card rounded shadow-sm">
                        <div class="card-body">
                            <form>
                                <div class="d-flex flex-column flex-lg-row">
                                    <span>Enter your email</span>
                                    <input type="text" class="form-control" name="email">
                                </div>
                                <div class="d-flex mt-2 flex-column flex-lg-row">
                                    <span>Enter your password</span>
                                    <input type="password" class="form-control" name="password">
                                </div>
                                <div class="d-flex mt-2 flex-column flex-lg-row">
                                    <span>Enter your email</span>
                                    <input type="email" class="form-control" name="email">
                                </div>
                                <button class="btn btn-primary mt-2" type="submit">Login</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"Login"
    }
</script>