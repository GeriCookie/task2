import Vue from 'vue'
import App from './App.vue'
import AmCharts from 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import AmGantt from 'amcharts3/amcharts/gantt'
export const bus = new Vue();



new Vue({
  el: '#app',
  render: h => h(App)
})
