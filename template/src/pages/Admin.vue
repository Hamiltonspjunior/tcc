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
            <tr v-for="(item, index) in tableData" :key="index">
                <td>{{ item.name }}</td>
                <td><a class="btn btn-round btn-info" :href="'table-list/'+item.user_id">Relatorios</a></td>
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
            title: "Funcionarios",
            subTitle: "Veja todos seus funcionarios",
            columns: ["Nome", "Relatorio"],
            tableData: [{name:"Zezinho",user_id:"54545454"}]
        };
    },
    methods: {
        
    }
}
</script>

<style>

</style>