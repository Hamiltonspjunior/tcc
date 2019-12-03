<template>
  <div class="row">
      <div class="col-12">
        <card class="card-plain" :title="title" :subTitle="subTitle">
            <form @submit.prevent="setOccurrence">
            <div class="col-md-6">
                    <fg-input
                    type="text"
                    label="Ocorrência"
                    placeholder="Digite sua a data de ocorrência"
                    v-model="dateOc"
                    ></fg-input>
                    
                    <fg-input
                    type="text"
                    label="Ocorrência"
                    placeholder="Digite sua Ocorrência"
                    v-model="occurrence"
                    ></fg-input>
                    <div class="col-lg-12 login-btm login-button">
                        <button type="submit" class="btn btn-outline-primary">Adicionar</button>
                    </div>
                </div>
            </form>
        </card>
      </div>
    </div>
    
</template>

<script>
export default {
    name: 'Occurrence',
    data() {
        return {
            users: '',
            title: "Ocorrência",
            subTitle: "Escreva a ocorrência",
            occurrence: "",
            dateOc: ""
        };
    },
    methods: {     
        setOccurrence: function(){
            this.$http
                .patch("/mark/occurrence", {
                    date: new Date(this.dateOc),
                    occurrence: this.occurrence
                })
                .then(response => {
                    this.response = response;
                
                })
                    .catch(error => {
                    this.response = "Error: " + error.response;
                });
        }
    },
    mounted: function() {
    }
}
</script>

<style>

</style>