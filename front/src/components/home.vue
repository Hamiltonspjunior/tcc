<template>
    <div id="app">
      <div class="d-flex-column center">
        <div class="d-flex-column buttons-containers">
          <label for="nameUsr">Nome Usurio:</label>
          <input type="text" id="nameUsr" v-model="nameUsr">
        </div>  

        <div class="d-flex-column buttons-containers">
          <div><button @click="setEntrada">Entrada</button></div>
          
          <div><button @click="setEntradaAlm">Almoço</button></div>

          <div><button @click="setVoltaAlm">Volta Almoço</button></div>
          
          <div><button @click="setSaida">Saída</button></div>
        </div>

        <div>
          <button @click="getUsuario">Pegar Dados</button>
          <h3>Response from server:</h3>
          <pre> {{ dadosUsr }}</pre>
        </div>
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

#app {
  font-family: 'Work Sans', sans-serif;
}

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
  &.center{
    align-items: center;
  }
  .buttons-containers{
    width: 300px;
    button{
      margin: 5px 0;
    }
  }
}

button {
  color: white;
  border: none;
  width: 100%;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: #ccc;
  cursor: pointer;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition: 0.25s all ease;
  &:hover {
    transform: translateY(2px);
  }
}

.active {
  background: $primary;
}

pre-content {
  width: 300px;
}
</style>


