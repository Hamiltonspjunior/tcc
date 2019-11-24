<template>
    <div class="register">

        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-2"></div>
                <div class="col-lg-6 col-md-8 register-box">
                    <div class="col-lg-12 register-key">
                        <i class="fa fa-key" aria-hidden="true"></i>
                    </div>
                    <div class="col-lg-12 register-title">
                       Registrar
                    </div>

                    <div class="col-lg-12 register-form">
                        <div class="col-lg-12 register-form">
                            <form @submit.prevent="setUser">
                                <div class="form-group">
                                    <label class="form-control-label">Nome</label>
                                    <input type="text" class="form-control" v-model="name">
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label">E-mail</label>
                                    <input type="text" class="form-control" v-model="email">
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label">Senha</label>
                                    <input type="password" class="form-control" v-model="password">
                                </div>
                                <div class="col-lg-12 registerbttm">
                                    <div class="col-lg-12 register-btm register-text">
                                        <!-- Error Message -->
                                    </div>
                                    <div class="col-lg-12 register-btm register-button">
                                        <button type="submit" class="btn btn-outline-primary" >REGISTRAR</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-2"></div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'register',
        data: function(){
            return{
                name: '',
                password: '',
                email: '',
                response: ''
            }
        },
        methods:{
            setUser(){
                this.$http.post('/auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(response => {
                    this.response = response
                    alert('Cadastrado com sucesso');
                    this.response = response;
                    console.log(response);
                     this.$router.push('/login');
                }).catch(error => {
                    this.response = 'Error: ' + error.response.status
                })
            }
        },
        mounted: function(){

        }
    }
</script>
<style lang="scss" scoped>
.register{
    min-height: 100vh;
    width: 100%;
    background: #222D32;
    font-family: 'Roboto', sans-serif;
}

.register-box {
    margin: 75px 0;
    height: auto;
    background: #1A2226;
    text-align: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.register-key {
    height: 100px;
    font-size: 80px;
    line-height: 100px;
    background: -webkit-linear-gradient(#27EF9F, #0DB8DE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.register-title {
    margin-top: 15px;
    text-align: center;
    font-size: 30px;
    letter-spacing: 2px;
    margin-top: 15px;
    font-weight: bold;
    color: #ECF0F5;
}

.register-form {
    margin-top: 25px;
    text-align: left;
}

input[type=text] {
    background-color: #1A2226;
    border: none;
    border-bottom: 2px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    margin-bottom: 20px;
    padding-left: 0px;
    color: #ECF0F5;
}

input[type=password] {
    background-color: #1A2226;
    border: none;
    border-bottom: 2px solid #0DB8DE;
    border-top: 0px;
    border-radius: 0px;
    font-weight: bold;
    outline: 0;
    padding-left: 0px;
    margin-bottom: 20px;
    color: #ECF0F5;
}

.form-group {
    margin-bottom: 40px;
    outline: 0px;
}

.form-control:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-bottom: 2px solid #0DB8DE;
    outline: 0;
    background-color: #1A2226;
    color: #ECF0F5;
}

input:focus {
    outline: none;
    box-shadow: 0 0 0;
}

label {
    margin-bottom: 0px;
}

.form-control-label {
    font-size: 10px;
    color: #6C6C6C;
    font-weight: bold;
    letter-spacing: 1px;
}

.btn-outline-primary {
    border-color: #0DB8DE;
    color: #0DB8DE;
    border-radius: 0px;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    &:hover {
        background-color: #0DB8DE;
        color: #ffffff;
        right: 0px;
    }
}

.register-btm {
    float: left;
}

.register-button {
    padding-right: 0px;
    text-align: right;
    margin-bottom: 25px;
}

.register-text {
    text-align: left;
    padding-left: 0px;
    color: #A2A4A4;
}

.registerbttm {
    padding: 0px;
}
</style>