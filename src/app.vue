<template>
  <div>
    用vue封装echarts组件
    <hr/>
    <button @click="loadMore">加载更多</button>
    <VueEcharts :option="option" :loading="loading"/>
  </div>
</template>

<script>
  import VueEcharts from './vue-echarts'
  console.log('fuck')

  export default {
    components: {VueEcharts},
    data(){
      return {
        loading: false,
        option: {
          title: {
            text: '标题',
          },
          tooltip: {
            show:true
          },
          legend: {
            data:['bug数']
          },
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: 'bug数',
            data: [820, 932, 901, 934, 1290, 1330],
            type: 'line'
          }]
        }
      }
    },
    methods: {
      loadMore(){
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.option = {
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            }]
          }

        }, 2000)
      }
    }
  }
</script>