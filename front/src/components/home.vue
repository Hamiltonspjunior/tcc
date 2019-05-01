<template>
    <div id="app">
        <form @submit.prevent="submitForm">
            <div class="d-flex">
              <div>
                <label for="">Entrada</label><br>
                <input type="checkbox" :class="[entradaExp == 'ok' ? 'disable' : '']" id="entradaExp" v-model="entradaExp"/>
              </div>
              <div>
                <label for="">Almoço</label><br>
                <input type="checkbox" class="" id="entradaAlmoco" v-model="entradaAlmoco"/>
              </div>
              <div>
                <label for="">Volta do Almoço</label><br>
                <input type="checkbox" class="" id="voltaAlmoco" v-model="voltaAlmoco"/>
              </div>
              <div>
                <label for="">Saida</label><br>
                <input type="checkbox" class="" id="SaidaExp" v-model="saidaExp"/>
              </div>
            </div>
              <button :class="[name ? activeClass : '']" type="submit">Registrar</button>
            <div>
            <h3>Response from server:</h3>
            <pre> {{ entradaExp }} || {{ entradaAlmoco }} || {{ voltaAlmoco }} || || {{ saidaExp }}</pre>
            </div>
        </form>
    </div>
</template>
<script>
  import axios from 'axios';

  export default {
    name: 'home',
    data() {
      return {
      name:'Jaiminho',
      entradaExp: '',
      entradaAlmoco: '',
      voltaAlmoco: '',
      saidaExp: '',
      response: '',
      activeClass: 'active'
      }
    },
    methods: {
      submitForm() {
        axios.defaults.baseURL ='http://localhost:443'
        axios.post('/expediente', {
            name: this.name,
            entrada_manha: this.entradaManha,
            entrada_almoco: this.entradaAlmoco,
            volta_almoco: this.voltaAlmoco,
            saida_expediente: this.saidaExp
        }).then(response => {
            this.response = JSON.stringify(response, null, 2)
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
  display: flex;
  justify-content: center;
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


