<template>
    <div id="app">
        <form @submit.prevent="submitForm">
            <div>
            <label for="name">Nome:</label><br>
            <input id="name" type="text" v-model="name" required/>
            </div>
            <div>
            <label for="email">Email:</label><br>
            <input id="email" type="email" v-model="email" required/>
            </div>
            <div>
            <label for="password">Senha:</label><br>
            <input id="password" type="password" v-model="password" required/>
            </div>
            <div>
            <label for="password_confirmation">Confirmação de Senha:</label><br>
            <input id="password_confirmation" type="password" v-model="password_confirmation" required/>
            </div>
            <button :class="[name ? activeClass : '']" type="submit">Registrar</button>
            <div>
            <h3>Response from server:</h3>
            <pre>{{ response }}</pre>
            </div>
        </form>
    </div>
</template>
<script>
  import axios from 'axios';

  export default {
    name: 'registro',
    data() {
      return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      response: '',
      user_type: 'aluno',
      activeClass: 'active'
      }
    },
    methods: {
      submitForm() {
      axios.defaults.baseURL ='http://localhost:8000'
      axios.post('/api/user', {
          name: this.name,
          user_type: this.user_type,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
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
  width: 300px;
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


