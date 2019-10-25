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
              <td>{{ new Date(item.date).toLocaleString('pt-BR', { year: '2-digit', month: '2-digit', day: '2-digit', timeZone: "GMT" }) }}</td>
              <td v-for="mark in item.marks" :key="mark">{{ (mark != null || mark != undefined)? mark : '00:00' }}</td>
              <td> {{calcHora(item.marks)}} </td>
              <td> {{ diffHour( calcHora(item.marks) ) }} </td>
              <td> {{ calcSal( calcHora(item.marks )) }} </td>
            </tr>
            </tbody>
          </table>
          </div>
        </card>
      </div>
      <p class="text-center export">
        <a id="btn-export" class="hidden-sm hidden-xs btn-export" :class="{'disabled':(isLoading||!collection.length)}" @click="exportData" role="button" data-toggle="tooltip" data-placement="left" title="Exportar os dados exibidos na tabela"> Export </a>
      </p>
    </div>
    
</template>
<script>
import { PaperTable } from "@/components";
import XLSX            from 'xlsx';
import FileSaver       from 'file-saver';
import moment          from 'moment';

export default {
  name: 'export-data',
  props: {
      isLoading: false,
      collection: {
          type: Array,
          default: function () {
              return [];
          }
      },
      type: String,
      chargingType: String
  },
  components: {
    PaperTable
  },
  data() {
    return {
      title: "Relatório",
      subTitle: "Veja suas marcações mensais",
      columns: ["Data", "Entrada", "Início Almoço", "Fim almoço", "Saída", "Horas trabalhadas", "Diferença", "Sal"],
      tableData: []
    };
  },
  methods: {
    getRange: function(){
      
    },

    s2ab: function(s) {
        if(typeof ArrayBuffer !== 'undefined') {
            let buf = new ArrayBuffer(s.length);
            let view = new Uint8Array(buf);
            for (let i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        } else {
            let buf = new Array(s.length);
            for (let i=0; i!=s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
    },

    // Se tem datas no filtro, coloca na planilha pra sinalizar
    datesFromFilter: function(){
        var startDate = sessionStorage.sd;
        var endDate = sessionStorage.ed;
        if(!!startDate && !!endDate && !isNaN(startDate) && !isNaN(endDate) && startDate <= endDate){
            moment.locale('pt-BR');
            var sd  = moment(startDate, 'YYYYMMDD').format('DD-MM-YYYY');
            var ed  = moment(endDate, 'YYYYMMDD').format('DD-MM-YYYY');
            return sd+"_"+ed;
        }
        return "Todo o período";
    },

    exportData: function() {

        // Exportação direto da tabela (esse método inclui campos desnecessários)
        // var wb = XLSX.utils.table_to_book(document.getElementById('all-campaigns'));

        // Exportação a partir de um array de objetos customizado gerado com dados do filteredCampaigns
        // (Melhor flexibilidade para adicionar ou remover o que vai pra planilha)
        var data = this.tableData;

        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(data);

        //larguras das colunas
        ws['!cols'] = [{wch : 25}];
        var index = Object.keys(data[0]).length;
        for (var i = 1; i <= index; i++) {
            ws['!cols'].push({wch : 15});
        }

        // Altera a formatação dos campos CTR, CPC e Custo para tipo numerico
        // excel entende "#,##0" como tipo numerico e usa o delimitador configurado localmente
        // https://docs.sheetjs.com/#cell-object
        var size = data.length+1;

        XLSX.utils.book_append_sheet(wb, ws, this.datesFromFilter());

        var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary'});

        var fileName = "relatorio";
        if(sessionStorage.sd && sessionStorage.ed){
            fileName += sessionStorage.sd+"-"+sessionStorage.ed;
        }
        fileName += ".xlsx";

        FileSaver.saveAs(new Blob([this.s2ab(wbout)], { type: 'application/vnd.ms-excel;charset=charset=utf-8' }), fileName);
    },
    
    calcHora:function(hours){
      let result = 0;
      if( hours.length == 4 ){
        let morning = moment(hours[1],"HH:mm:ss").diff(moment(hours[0],"HH:mm:ss"));
        let aftermoon = moment(hours[3],"HH:mm:ss").diff(moment(hours[2],"HH:mm:ss"));
        let result = moment.utc(moment(morning).add(aftermoon, 'ms')).format("HH:mm");

       return result;
      }else if( hours.length >= 2 && hours.length <= 3 ){
        let result = moment.utc(moment(hours[1],"HH:mm:ss").diff(moment(hours[0],"HH:mm:ss"))).format("HH:mm");
        return result;
      }else{
        return result ;
      }
    },
    
    diffHour:function(hour){
      if(hour == 0) return '00:00';
      if(hour === undefined) return;
      return moment(hour, 'HH:mm:ss').subtract(8, 'h').format("HH:mm");
    },

    calcSal:function(hour){
      let def = 0;
      if(hour == 0) return def.toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
      if(hour === undefined) return;
      let h = parseFloat(hour.split(':')[0]);
      let m = parseFloat(hour.split(':')[1]);
      let horaCent = parseFloat( (h + (m / 60) ) * 29 );

      return horaCent.toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
    }
  },
  mounted() {
    this.$http.get('/lists/range/5dab6e7ab2d51f2aee4285d4/?dateStart=2019-01-01&dateEnd=2019-12-30').then(response => {
      this.tableData = response.data.marks;
    }).catch(error => {
      this.response = 'Error: ' + error.response;
    })
  },
};
</script>
<style>
  .export { width: 100%; }
  .btn-export { cursor: pointer; font-size: 22px; }
</style>
