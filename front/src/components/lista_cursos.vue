<template>
    <div id="app">
        <button @click="getListCourse">List</button>
        <div>
          <table>
            <tr>
              <th><pre>ID</pre></th>
              <th><pre>   Professor</pre></th>
              <th><pre> Nome do Curso</pre></th>
            </tr>
            <tr v-for="item in data" :key="item.id">
              <td><pre>{{ item.id }}</pre></td>
              <td><pre>{{ item.professor_id }}</pre></td>
              <td><pre>{{ item.name }}</pre></td>
            </tr>
          </table>
        </div>
    </div>
</template>
<script>
  import axios from 'axios';

  export default {
    name: 'registro',
    data() {
      return {
      idprofessor: '',
      name: '',
      password: '',
      response: '',
      data:'',
      activeClass: 'active'
      }
    },
    methods: {
      getListCourse: function(){
        axios.defaults.baseURL ='http://localhost:8000'
        axios.get('/api/course').then(response => {
            this.response = JSON.parse(JSON.stringify(response))
            this.data = response.data;
        }).catch(error => {
            this.response = 'Error: ' + error.response.status
        })
      }
    }
  }
</script>
<style lang="scss">

</style>


