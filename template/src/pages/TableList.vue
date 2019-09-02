<template>
    <div class="row">
      <div class="col-12">
        <card class="card-plain" :title="table.title" :subTitle="table.subTitle">
          <div class="table-full-width table-responsive">
            <paper-table type="hover" class="text-center" :data="table.data" :columns="table.columns">
            </paper-table>
          </div>
        </card>
      </div>
      <a id="btn-export" class="pull-right hidden-sm hidden-xs" :class="{'disabled':(isLoading||!collection.length)}" @click="exportData" role="button" data-toggle="tooltip" data-placement="left" title="Exportar os dados exibidos na tabela"> Export </a>
    </div>
    
</template>
<script>
import { PaperTable } from "@/components";
import XLSX            from 'xlsx';
import FileSaver       from 'file-saver';
import moment          from 'moment/'

const tableColumns = ["Data", "Entrada", "Início Almoço", "Fim almoço", "Saída", "Horas trabalhadas", "Diferença"];
const tableData = [
  {
    "data": "01/09/2019",
    "entrada": "09:00",
    "início almoço": "12:00",
    "fim almoço": "13:00",
    "saída": "18:00",
    "horas trabalhadas": "08:00",
    "diferença": "00:00"
  },
  {
    "data": "02/09/2019",
    "entrada": "08:00",
    "início almoço": "13:00",
    "fim almoço": "14:00",
    "saída": "17:00",
    "horas trabalhadas": "08:00",
    "diferença": "05:00"
  }
];

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
      table: {
        title: "Relatório",
        subTitle: "Veja suas marcações mensais",
        columns: [...tableColumns],
        data: [...tableData]
      }
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
        var data = tableData;

        if (this.type == 'campaigns') {
            data = this.collection.map((item) => {
                return {
                    "Data":       item.data,
                    "Entrada":     item.entrada
                };
            });
        }

        if (this.type == 'groups') {
            data = this.collection.map((item)=>{
                return this.formatGroup(item);
            });
        }

        if (this.type == 'creatives') {
            data = this.collection.map((item)=>{
                return this.formatCreative(item);
            });
        }

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
        if (this.type == 'campaigns') {
            this.formatCellsCampaign(size, ws);
        }

        if (this.type == 'groups') {
            this.formatCellsGroup(size, ws);
        }

        if (this.type == 'creatives') {
            this.formatCellsCreative(size, ws);
        }

        XLSX.utils.book_append_sheet(wb, ws, this.datesFromFilter());

        var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary'});

        var fileName = "UOLAds";
        if(sessionStorage.sd && sessionStorage.ed){
            fileName += sessionStorage.sd+"-"+sessionStorage.ed;
        }
        fileName += ".xlsx";

        FileSaver.saveAs(new Blob([this.s2ab(wbout)], { type: 'application/vnd.ms-excel;charset=charset=utf-8' }), fileName);
    },
  },
};
</script>
<style>
</style>
