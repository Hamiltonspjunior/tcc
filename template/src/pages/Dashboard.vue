<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <a @click="getPoint(stats.name)" class="card-button">
          <stats-card>
            <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
              <i :class="stats.icon"></i>
              <p>{{ (getHorario()) }}</p>
            </div>
            <div class="numbers" slot="content">
              <p>{{stats.title}}</p>
            </div>
            <div class="stats" slot="footer">
              <i :class="stats.footerIcon"></i> {{ getData() }}
            </div>
          </stats-card>
        </a>
      </div>
    </div>

    <!--Charts-->


  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from 'chartist';
export default {
  components: {
    StatsCard,
    ChartCard
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      ponto: {},
      statsCards: [
        {
          type: "success",
          icon: "ti-timer",
          title: "Entrada",
          name: "Entrada",
          value: "",
          disabled: "",
          footerIcon: "ti-calendar"
        },
        {
          type: "info",
          icon: "ti-timer",
          title: "Almoço",
          name: "Almoco",
          value: "",
          disabled: "",
          footerIcon: "ti-calendar"
        },
        {
          type: "warning",
          icon: "ti-timer",
          title: "Volta do almoço",
          name: "VtAlmoco",
          value: "",
          disabled: "",
          footerIcon: "ti-calendar"
        },
        {
          type: "danger",
          icon: "ti-timer",
          title: "Saída",
          name: "Saida",
          value: "",
          disabled: "",
          footerIcon: "ti-calendar"
        }
      ]
    };
  },
  methods: {
    getPoint: function(point){
      switch (point) {
        case 'Entrada':
          this.getEnter();
        break;
        case 'Almoco':
          this.getMark('almoco');
        break;
        case 'VtAlmoco':
          this.getMark('volta');
        break;
        case 'Saida':
          this.getMark('saida');
        break;
      }
    },
    getEnter: function(){
      let fullHour = this.getHorario();
      let fullDate = this.getData();

      this.$http.post('/mark/', {
        date: fullDate,
        marks: fullHour
      }).then(response => {
          this.response = response;
          alert("Sua Hora foi marcada com sucesso !");
      }).catch(error => {
          this.response = 'Error: ' + error.response;
      })
    },
    getMark: function(point){
      let fullHour= this.getHorario();

      this.$http.patch('/mark/', {
        marks: fullHour
      }).then(response => {
          this.response = response;
          alert("Sua Hora foi marcada com sucesso !");
      }).catch(error => {
          this.response = 'Error: ' + error.response;
      })
    },

    getHorario: function (){
      let date = new Date();
      return date.toLocaleString('pt-BR',{ hour12: false,hour: "numeric",minute: "numeric"});
    },

    getData: function (){
      let date = new Date().toISOString().slice(0,10);
      return date;
    }
  },
  mounted: function(){

  }
};
</script>
<style lang="scss" scoped>
  .card-button{
    cursor: pointer;
  }
</style>
