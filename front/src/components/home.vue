<template>
  <div class="d-flex-column center">
    <div class="d-flex-column buttons-containers">
      <label for="nameUsr">Nome Usurio:</label>
      <input type="text" id="nameUsr" v-model="nameUsr">
    </div>  

    <div class="d-flex buttons-containers">
      <a class="btn-ponto" @click="setEntrada"><img src="../assets/images/entrada.svg" alt="" height="100%"></a>

      <a class="btn-ponto" @click="setEntradaAlm"><img src="../assets/images/almoco.svg" alt="" height="100%" ></a>

      <a class="btn-ponto" @click="setVoltaAlm"><img src="../assets/images/volta.svg" alt="" height="100%" ></a>

      <a class="btn-ponto" @click="setSaida"><img src="../assets/images/saida.svg" alt="" height="100%" ></a>
    </div>

    <div>
      <button @click="getUsuario">Pegar Dados</button>
      <h3>Response from server:</h3>
      <pre> {{ dadosUsr }}</pre>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';

  export default {
    name: 'home',
    data() {
      return {
      nameUsr:'',
      dateHour: '',
      entradaExp: '',
      entradaAlmoco: '',
      voltaAlmoco: '',
      saidaExp: '',
      response: '',
      dadosUsr: '',
      activeClass: 'active'
      }
    },
    methods: {
      getHour:function(){
        return this.dateHour = new Date().getHours() + ':' + new Date().getMinutes();
      },
      setEntrada: function(){
        this.entradaManha = this.getHour();
        axios.defaults.baseURL ='http://localhost:8000'
        axios.post('/expediente', {
            name: this.nameUsr,
            entrada_manha: this.entradaManha,
            entrada_almoco: this.entradaAlmoco,
            volta_almoco: this.voltaAlmoco,
            saida_expediente: this.saidaExp
        }).then(response => {
            this.response = JSON.stringify(response, null, 2)
        }).catch(error => {
            this.response = 'Error: ' + error.response.status
        })
      },
      setEntradaAlm: function(){
        this.entradaAlmoco = this.getHour();
        axios.defaults.baseURL ='http://localhost:8000'
        axios.post('/expediente/'+ this.nameUsr, {
            entrada_almoco: this.entradaAlmoco
        }).then(response => {
            this.response = JSON.stringify(response, null, 2)
        }).catch(error => {
            this.response = 'Error: ' + error.response.status
        })
      },
      setVoltaAlm: function(){
        this.voltaAlmoco = this.getHour();
        axios.defaults.baseURL ='http://localhost:8000'
        axios.post('/expediente/'+ this.nameUsr, {
            volta_almoco: this.voltaAlmoco
        }).then(response => {
            this.response = JSON.stringify(response, null, 2)
        }).catch(error => {
            this.response = 'Error: ' + error.response.status
        })
      },
      setSaida: function(){
        this.saidaExp = this.getHour();
        axios.defaults.baseURL ='http://localhost:8000'
        axios.post('/expediente/'+ this.nameUsr, {
            saida_expediente: this.saidaExp
        }).then(response => {
            this.response = JSON.stringify(response, null, 2)
        }).catch(error => {
            this.response = 'Error: ' + error.response.status
        })
      },
      getUsuario: function(){
        axios.defaults.baseURL ='http://localhost:8000'
        axios.get('/expediente/'+ this.nameUsr).then((response) => {
            this.dadosUsr = response.data
        }).catch(error => {
            this.response = 'Error: ' + error.response.status
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
$primary: #5968d7;

form {
  width: 500px;
  padding: 10px 40px;
  label{
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 0.03em;
    font-weight: bold;
  }
  input, textarea {
    border: 1px solid #ccc;
    color: #333;
    width: calc(100% - 30px);
  }
  input, textarea, button {
    border-radius: 4px;
    padding: 8px 15px;
    font-family: 'Work Sans', sans-serif;
    font-weight: 300;
  }
  div {
    margin: 20px 0;
  }
}

.d-flex{
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.d-flex-column{
  display: flex;
  flex-direction: column;
  width: 100%;
  &.center{
    align-items: center;
  }
  .buttons-containers{
    align-items:center;
    justify-content: space-between;
    width: 50%;
    
    button{
      margin: 5px 0;
    }
  }
}

.btn-ponto{
    padding: 20px 0;
    height: 90px;
    width: 20%;
    cursor: pointer;
}

pre-content {
  width: 300px;
}
</style>


