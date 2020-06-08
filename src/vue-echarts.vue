<template>
  <div ref="container">
    vue echarts
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    props: ['option', 'loading'],
    //注意时机，在挂载之后
    mounted() {
      //  用ref拿到dom元素
      const container = this.$refs.container
      const width = document.documentElement.clientWidth
      container.style.width = `${width * 0.8}px`
      container.style.height = `${width * 0.8 * 1.2}px`

      //挂到实例上
      this.chart = echarts.init(container)
      this.chart.setOption(this.option)

    },
    //主要是监听变化 option 和 loading
    watch: {
      option(){
        if(this.loading){return}
        this.chart.setOption(this.option)
      },
      loading(){
        if(this.loading) {
          this.chart.showLoading()
        } else {
          this.chart.hideLoading()
        }
      }

    }
  }
</script>