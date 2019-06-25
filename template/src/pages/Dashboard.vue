<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <a @click="getPoint(stats.name)" class="card-button">
          <stats-card>
            <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
              <i :class="stats.icon"></i>
            </div>
            <div class="numbers" slot="content">
              <p>{{stats.title}}</p>
            </div>
            <div class="stats" slot="footer">
              <i :class="stats.footerIcon"></i> {{stats.value}}
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
      ],
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      minutes: new Date().getMinutes(),
      hour:new Date().getHours(),
      ponto: {}
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

        default:
          break;
      }
    },
    getEnter: function(){
      let fullHour= this.hour + ':' + this.minutes
      this.ponto = {
        'entrada': fullHour,
      }
      this.$http.post('/mark/', {
          dia: this.day,
          mes: this.month,
          ano: this.year,
          pontos: this.ponto
      }).then(response => {
          this.response = response;
          alert("Sua Hora foi marcada com sucesso !");
      }).catch(error => {
          this.response = 'Error: ' + error.response;
      })
    },
    getMark: function(point){
      let fullHour= this.hour + ':' + this.minutes
      this.ponto = { point: fullHour }
      this.$http.patch('/mark/', {
          pontos: this.ponto
      }).then(response => {
          this.response = response;
          alert("Sua Hora foi marcada com sucesso !");
      }).catch(error => {
          this.response = 'Error: ' + error.response;
      })
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
