<template>
  <div id="chart">
    <div id="chartdiv" style="height: 500px"></div>
    <input type="text" id="comment">
  </div>
</template>

<script>
import axios from 'axios';
import {bus} from '../main.js';
export default {
  data() {
    return {
      errors: []
    };
  },
  methods: {
    drawChart(rowsUser, rowsCustomer) {
      AmCharts.addInitHandler(
        function(chart) {
          chart.rotate = true;
        },
        ["gantt"]
      );

      /**
       * Create the chart
       */
      var chart = AmCharts.makeChart("chartdiv", {
        path: "dist/amcharts/",
        type: "gantt",
        theme: "light",
        marginRight: 70,
        dataDateFormat: "ss",
        columnWidth: 0.5,
        categoryAxesSettings: {
          minPeriod: "fff", // set minimum to milliseconds
          groupToPeriods: ["fff", "ss"] // specify period grouping
        },
        valueAxis: {
          autoGridCount: false,
          minimum: 0,
          maximum: 1863.166625,
          strictMinMax: true,
          minPeriod: "fff",
          duration: "ss",
          title: "Seconds"
        },
        graph: {
          fillAlphas: 1,
          lineAlpha: 1,
          lineColor: "#fff",
          showBalloon: false
        },
        rotate: true,
        categoryAxis: {
          parseDates: false
        },
        categoryField: "category",
        segmentsField: "segments",
        colorField: "color",
        startField: "start",
        endField: "end",
        durationField: "duration",
        dataProvider: [
          {
            category: "user",
            segments: rowsUser
          },
          {
            category: "customer",
            segments: rowsCustomer
          }
        ],
        valueScrollbar: {
          autoGridCount: true
        },
        chartCursor: {
          cursorColor: "#55bb76",
          valueBalloonsEnabled: false,
          cursorAlpha: 0,
          valueLineAlpha: 0.5,
          valueLineBalloonEnabled: true,
          valueLineEnabled: true,
          zoomable: false,
          valueZoomable: true,
          categoryBalloonDateFormat: "JJ:NN:SS"
        },
        export: {
          enabled: true
        }
      });
      chart.addListener("clickGraphItem", function(event) {
        console.log(document.querySelectorAll(".amcharts-balloon-div"));

        let times = [...document.querySelectorAll(".amcharts-balloon-div")]
          .map(x => x.textContent)
          .filter(x => parseInt(x));
        let commentInput = document.getElementById("comment")
        commentInput.style.visibility = 'visible';
        let enterKey = 13;
        let time = times[0];
        commentInput.addEventListener("keypress", function(ev){
            var key = ev.which || ev.keyCode;
            if(key===enterKey){
                var comment = commentInput.value;
                bus.$emit('addComment', {comment: comment, time: time});
                commentInput.style.visibility = 'hidden'
            }
        });
      });
    }
  },
  created() {
    axios.get(`http://cookie-rocks.com/api/conversations/1/`)
    .then(response => {
      // JSON responses are automatically parsed.
      var rowsUser = response.data.user.map(u => {
        return {
          start: u[0],
          end: u[1],
          color: "#249948"
        };
      });
      var rowsCustomer = response.data.customer.map(u => {
        return {
          start: u[0],
          end: u[1],
          color: "#e10b0b"
        };
      });
      this.drawChart(rowsUser, rowsCustomer)
    })
    .catch(e => {
      this.errors.push(e)
    })
    this.drawChart()

  }
};
</script>

<style>
#comment {
    visibility: hidden;
}
</style>
