<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="(stats , index) in statsCards" :key="stats.title">
        <a
          @click="(index != 0)?setMark():setEnter()"
          class="card-button"
          :class="{ 'disabled': stats.disabled }"
        >
          <stats-card>
            <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
              <i :class="stats.icon"></i>
              <p>{{ stats.marks }}</p>
            </div>
            <div class="numbers" slot="content">
              <p>{{stats.title}}</p>
            </div>
            <div class="stats" slot="footer">
              <i :class="stats.footerIcon"></i>
              {{ getData('Br') }}
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
import Chartist from "chartist";
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
          marks: "",
          disabled: "",
          footerIcon: "ti-calendar"
        },
        {
          type: "info",
          icon: "ti-timer",
          title: "Almoço",
          name: "Almoco",
          marks: "",
          disabled: "",
          footerIcon: "ti-calendar"
        },
        {
          type: "warning",
          icon: "ti-timer",
          title: "Volta do almoço",
          name: "VtAlmoco",
          marks: "",
          disabled: "",
          footerIcon: "ti-calendar"
        },
        {
          type: "danger",
          icon: "ti-timer",
          title: "Saída",
          name: "Saida",
          marks: "",
          disabled: "",
          footerIcon: "ti-calendar"
        }
      ]
    };
  },
  methods: {
    setEnter: function() {
      this.$http
        .post("/mark/", {
          date: this.getData(),
          marks: this.getHorario()
        })
        .then(response => {
          this.response = response;
          alert("Sua Hora foi marcada com sucesso!");
          this.getMarks();
        })
        .catch(error => {
          this.response = "Error: " + error.response;
        });
    },

    setMark: function() {
      this.$http
        .patch("/mark/", {
          date: this.getData(),
          marks: this.getHorario()
        })
        .then(response => {
          this.response = response;
          alert("Sua Hora foi marcada com sucesso !");
          this.getMarks();
        })
        .catch(error => {
          this.response = "Error: " + error.response;
        });
    },

    getHorario: function() {
      let date = new Date();
      return date.toLocaleString("pt-BR", {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
      });
    },

    getData: function(type = "Us") {
      if (type == "Br") {
        return new Date().toLocaleDateString("pt-BR", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          timeZone: "GMT"
        });
      } else {
        let data = new Date().toISOString().slice(0, 10);
        return data;
      }
    },
    getMarks: function() {
      this.$http.get("/lists/date?date=" + this.getData())
        .then(response => {
          let data = response.data.marks[0].marks;
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            this.statsCards[i].marks = data[i];
            this.statsCards[i].disabled = true;
          }
        })
        .catch(error => {
          this.response = "Error: " + error.response;
          console.log("Deu ruim:", error);
        });
    }
  },
  mounted: function() {
    this.getMarks();
  },
  created(){
    if (window.sessionStorage.tokenUser != "undefined") {
      this.$http.defaults.headers.common["Authorization"] =
      "Bearer " + window.sessionStorage.tokenUser;
      console.log("token save");
    }
  }
};
</script>
<style lang="scss" scoped>
.card-button {
  cursor: pointer;
}
.card-button {
  &.disabled {
    pointer-events: none;
    cursor: default;
    /deep/.card {
      opacity: 0.7;
    }
  }
}
</style>
