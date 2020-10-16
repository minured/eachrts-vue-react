import React, {useState} from "react"
import {ReactEcharts} from './react-echarts'

// 函数组件
export function ReactApp(){
  const [loading, setLoading] = useState(false)
  const [option, setOption] = useState({
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
  })

  const loadMore = () => {
    if(loading){return}
    setLoading(true)
    setTimeout(() => {
      setOption({
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        }]
      })
      setLoading(false)
    }, 1000)

  }
  return (
    <div>
      <ReactEcharts option={option} loading={loading}/>
      <button onClick={loadMore}>加载更多</button>
    </div>
  )
}