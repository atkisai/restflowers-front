<template>
  <div style="max-width: 1200px;margin: 0 auto;text-align: center" class="main">
    <Dropdown :options="data" v-model="selected_data" optionLabel="name" class="filter-items-dialog my-filter"/>
    <Chart type="bar" :data="selected_data" :options="multiAxisOptions "/>
  </div>
</template>

<script>
import Chart from 'primevue/chart';
import axios from "axios";
import {_} from 'vue-underscore';
export default {
  name: "StatisticsCrm",
  components:{Chart},
  data(){
    return{
      api:localStorage.getItem('api'),
      data:'',
      selected_data:'',
      multiAxisOptions: {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          },
          tooltips: {
            mode: 'index',
            intersect: true
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          },
        }
      },
    }
  },
  mounted() {
    axios.get(this.api+'api/crm_orders_stats/').then((res)=>{
      const data=res.data
      // console.log(data)
      // const dataGroups = _.chain(data).groupBy(function(obj) { return obj.date.getFullYear(); }).sortBy(function(v, k) { return k; }).value();
      // const dataGroups = _.chain(data).groupBy(function(obj) { return obj.date }).sortBy(function(v, k) { return k; }).value();
      // console.log(dataGroups)
      this.data=data
      this.selected_data=data[0]
    })
  }
}
</script>

<style scoped>

</style>