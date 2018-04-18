<template>
  <div id="app">
    <img src="./assets/logo.png">
    <waveform></waveform>
  </div>
</template>

<script>
import Chart from './components/Chart.vue';
export default {
  components: {
    'waveform': Chart
  }  
  
}
</script>

<style>

</style>
