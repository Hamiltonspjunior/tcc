<template>
    <div class="row">
      <div class="col-md-6" v-show="!userId">
        <fg-input
          type="text"
          label="Valor/Hora"
          placeholder="Informe seu valor/Hora"
          v-model="valorHora"
        ></fg-input>
      </div>
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
              <td v-for="mark in item.marks" :key="mark">{{ mark }}</td>
              <td> {{calcHora(item.marks)}} </td>
              <td> {{ diffHour( calcHora(item.marks) ) }} </td>
              <td> {{ calcSal( calcHora(item.marks), index) }} </td>
              <td>{{ item.occurrence }}</td>
            </tr>
            <tr>
              <td align="center" colspan="8" v-if="userId" class="valorTotalLabel">TOTAL:</td>
              <td align="center" class="valorTotal">{{ calcSalTotal(salarioTotal) }}</td>
            </tr>
            </tbody>
          </table>
          </div>
        </card>
      </div>
      <p class="text-center export">
        <a id="btn-export" class="hidden-sm hidden-xs btn-export" @click="exportData" role="button" data-toggle="tooltip" data-placement="left" title="Exportar os dados exibidos na tabela"> Export </a>
      </p>
    </div>
    
</template>
<script>
import { PaperTable } from "@/components";
import XLSX            from 'xlsx';
import FileSaver       from 'file-saver';
import moment          from 'moment';

export default {
  name: 'table-list',
  components: {
    PaperTable
  },
  data() {
    return {
      title: "Relatório",
      subTitle: "Veja suas marcações mensais",
    columns: ["Data", "Entrada", "Início Almoço", "Fim almoço", "Saída", "Horas trabalhadas", "Diferença", "Sal", "Ocorrência"],
      tableData: [],
      valorHora: "",
      salarioTotal: [],
      userId: this.$route.params.userId
    };
  },
  methods: {
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
        let relatorio = JSON.parse(JSON.stringify(this.tableData));

        relatorio.forEach((obj, i) => {
            obj.data = new Date(obj.date).toLocaleString('pt-BR', { year: '2-digit', month: '2-digit', day: '2-digit', timeZone: "GMT" });
            obj.entrada = obj.marks[0] || null;
            obj.almoço = obj.marks[1] || null;
            obj.voltaAlmoco = obj.marks[2] || null;
            obj.saida = obj.marks[3] || null;
            obj.ocorrencia = obj.occurrence;

            const calc =  this.calcHora(obj.marks);
            obj.horasTrablahadas = calc;
            obj.diferenca = this.diffHour( calc );
            obj.salario =this.calcSal( calc, i);

            delete obj.marks;
            delete obj.date;
            delete obj.createdAt;
            delete obj._id;
            delete obj.__v;
            delete obj.user;
            delete obj.occurrence;
        });
        

        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(relatorio);

        //larguras das colunas
        ws['!cols'] = [{wch : 25}];
        var index = Object.keys(relatorio[0]).length;
        for (var i = 1; i <= index; i++) {
            ws['!cols'].push({wch : 15});
        }

        // Altera a formatação dos campos CTR, CPC e Custo para tipo numerico
        // excel entende "#,##0" como tipo numerico e usa o delimitador configurado localmente
        // https://docs.sheetjs.com/#cell-object
        var size = relatorio.length+1;

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
      let result = '00:00';
      if( hours[0] != null && hours[1] != null && hours[2] != null && hours[3] != null){
        let morning = moment(hours[1],"HH:mm:ss").diff(moment(hours[0],"HH:mm:ss"));
        let aftermoon = moment(hours[3],"HH:mm:ss").diff(moment(hours[2],"HH:mm:ss"));
        let result = moment.utc(moment(morning).add(aftermoon, 'ms')).format("HH:mm");

        return result;
      }else if( hours[0] != null && hours[1] ){
        let result = moment.utc(moment(hours[1],"HH:mm:ss").diff(moment(hours[0],"HH:mm:ss"))).format("HH:mm");
        return result;
      }else{
        return result ;
      }
    },
    
    diffHour:function(hour){
    
      let result = 0;
      if(hour == '00:00') return '00:00';
      if(hour === undefined) return;
      if( parseFloat(hour) >= 8 ){
        result = moment.utc(moment(hour, 'HH:mm:ss').diff(moment('08:00',"HH:mm:ss"))).format("HH:mm");
        return '+ '+ result;
      }else {
        result = moment.utc(moment('08:00', 'HH:mm:ss').diff(moment(hour,"HH:mm:ss"))).format("HH:mm");

        return '- '+ result;
      }
      console.log( result );
    },

    calcSal:function(hour, i){
      let def = 0;
      if(hour == 0) return def.toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
      if(hour === undefined) return;
      let h = parseFloat(hour.split(':')[0]);
      let m = parseFloat(hour.split(':')[1]);
      let horaCent = parseFloat( (h + (m / 60) ) * this.valorHora );

      this.salarioTotal[i] = horaCent;

      return horaCent.toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
    },

    calcSalTotal:function(sal){
      return sal.reduce((total, numero) => total + numero, 0).toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
    }
  },
  created() {
    if(this.userId != undefined) {
      this.$http.get('/lists/range/'+ this.userId +'/?dateStart=2019-10-01&dateEnd=2020-01-01').then(response => {
        response.data.marks.forEach(function(item){
            item.marks[0] = item.marks[0] || null;
            item.marks[1] = item.marks[1] || null;
            item.marks[2] = item.marks[2] || null;
            item.marks[3] = item.marks[3] || null;
        })
        response.data.marks.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a>b ? -1 : a<b ? 1 : 0;
        });
        this.tableData = response.data.marks;
        
      }).catch(error => {
        this.response = 'Error: ' + error.response;
      })
    }else{
      this.$http.get('/lists/range?dateStart=2019-10-01&dateEnd=2020-01-01').then(response => {
        response.data.marks.forEach(function(item){
            item.marks[0] = item.marks[0] || null;
            item.marks[1] = item.marks[1] || null;
            item.marks[2] = item.marks[2] || null;
            item.marks[3] = item.marks[3] || null;
        })
        response.data.marks.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a>b ? -1 : a<b ? 1 : 0;
        });
        this.tableData = response.data.marks;
        console.log(this.tableData);
      }).catch(error => {
        this.response = 'Error: ' + error.response;
      })
    }
  },
};
</script>
<style>
  .export { width: 100%; }
  .btn-export { cursor: pointer; font-size: 22px; }
  .valorTotalLabel, 
  .valorTotal{ font-size: 16px; font-weight: bolder; }
</style>
