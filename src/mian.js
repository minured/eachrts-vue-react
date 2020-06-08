import echarts from 'echarts'


//常用获取屏幕宽度
const width = document.documentElement.clientWidth

const barChart = document.getElementById('bar-chart')
const lineChart = document.getElementById('line-chart')

barChart.style.width = width + "px"
barChart.style.height = width * 1.2 + 'px'

lineChart.style.width = width + "px"
lineChart.style.height = width * 1.2 + 'px'
// 基于准备好的dom，初始化echarts实例
var myBarChart = echarts.init(barChart)
// 指定图表的配置项和数据

var option = {
  title: {
    text: '表格的标题'
  },
  tooltip: {},
  legend: {
    data: ['bug数', "bug数2"]
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [{
    name: 'bug数',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  },
    {
      name: 'bug数2',
      type: 'bar',
      data: [6, 25, 46, 120, 110, 50]
    }
  ]
}

// 使用刚指定的配置项和数据显示图表。加个媒体查询
myBarChart.setOption(option)

let xAxis_data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
let series_data = [820, 932, 901, 934, 1290, 1330, 1320]

let n = 0
let m = 2
function createKey(){
  n += 1
  return `2020-5-${n}`
}
function createValue(){
  m *= 2
  return m
}

let xData = [createKey()]
let values = [createValue()]




let myLineChart = echarts.init(lineChart, 'light')
let baseOption = {
  title: {
    text: '我是一个折线图',
    //距容器右侧的距离
    right: 100
  },
  tooltip: {
    show:true
  },
  legend: {
    data:['minu']
  },
  xAxis: {
    type: 'category',
    data: xData
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    lineStyle: {
      color: 'orange'
    },
    itemStyle: {
      borderWidth: 2
    },
    name: 'minu',
    data: values,
    type: 'line'
  }]
}

//媒体查询
myLineChart.setOption({
  baseOption,
  media: [
    {
      query: {
        maxWidth: 500
      },
      option: {
        series:[{
          itemStyle: {
            borderWidth: 20
          }
        }]
      }
    }
  ]
})

const btn = document.getElementById('add-btn')

//节流，防止一直点
let loading = false

btn.addEventListener("click", () => {

  if (loading){
    console.log("loading")
    return
  }
  myLineChart.showLoading()
  loading = true

  //更新，只需要把改动的地方传进去


  xData = [...xData, createKey()]
  values = [...values, createValue()]

  //模拟延迟
  setTimeout(() => {
    myLineChart.setOption({
      xAxis: {
        // 需要把之前的数据添加进来
        data: xData
      },
      series: [{
        data: values,
      }]
    })
    myLineChart.hideLoading()
    loading = false
  }, 500)

})

//点击事件
myLineChart.on("click", (e) => {
  console.log(e)
  console.log(e.name)
  console.log(e.dataIndex)
  console.log(e.data)
  window.open(`https://www.baidu.com/s?wd=${e.name}`)
})

//移动端适配，加个媒体查询，类似css

