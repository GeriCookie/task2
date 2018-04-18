<template>
  <div id="app">
    <waveform></waveform>
    <comments></comments>
  </div>
</template>

<script>
import Chart from './components/Chart.vue';
import Comments from './components/Comments.vue'
export default {
  props: ['comments'],
  components: {
    'waveform': Chart,
    'comments': Comments
  }  
  
}
</script>

<style>

</style>
