import React, {useEffect, useRef} from 'react'
import echarts from 'echarts'

export function ReactEcharts(props) {

  //ref标记元素
  const container = useRef(null)

  const chart = useRef(null)
  //useEffect，根据数组模拟第一次，update，指定update
  //[]  相当于 mounted，因为第一次总是触发，后面就是看数组的元素有没有变化
  useEffect(() => {
    const width = document.documentElement.clientWidth
    container.current.style.width = `${width * 0.8}px`
    container.current.style.height = `${width * 0.8 * 1.2}px`
    chart.current = echarts.init(container.current)
  }, [])
  //监听option变化
  useEffect(() => {
    chart.current.setOption(props.option)
  }, [props.option])

  // useEffect(() => {
  //   if(props.loading){
  //     chart.current.showLoading()
  //   } else {
  //     chart.current.hideLoading()
  //   }
  // },[props.loading])
  return (
    <div ref={container}/>
  )
}