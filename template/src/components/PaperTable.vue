<template>
  <table class="table" :class="tableClass">
    <thead>
    <slot name="columns">
      <th v-for="column in columns" :key="column">{{column}}</th>
    </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <template v-for="(column, index) in columns">
          <td :key="index"
              v-if="hasValue(item, column)">
            {{itemValue(item, column)}}
          </td>
        </template>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
import Vue from "vue";
import excel from "vue-excel-export";

Vue.use(excel);
export default {
  name: 'paper-table',
  props: {
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    }
  }
};
</script>
<style>
</style>
