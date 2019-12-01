<template>
  <div class="row">
      <div class="col-12">
        <card class="card-plain" :title="title" :subTitle="subTitle">
          <div class="table-full-width table-responsive">
          <table class="table">
            <thead>
              <th v-for="column in columns" :key="column">{{column}}</th>
            </thead>
            <tbody>
            <tr v-for="(user, index) in  users" :key="index">
                <td>{{ user.first_name }}</td>
                <td>{{ user.email }}</td>
                <td><a class="btn btn-round btn-info" :href="'table-list/'+user._id">Relatorios</a></td>
            </tr>
            </tbody>
          </table>
          </div>
        </card>
      </div>
    </div>
    
</template>

<script>
export default {
    name: 'admin',
    data() {
        return {
            users: '',
            title: "Funcionarios",
            subTitle: "Veja todos seus funcionarios",
            columns: ["Nome","Email","Relatorio"]
        };
    },
    methods: {     
      getUsers: function() {
        this.$http.get('/users').then(response => {
            this.users = response.data.user;
          })
          .catch(error => {
            this.response = "Error: " + error.response;
            console.log("Deu ruim:", error);
          });
      }
    },
    mounted: function() {
      this.getUsers();
    }
}
</script>

<style>

</style>