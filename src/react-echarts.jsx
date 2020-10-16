import React, {useEffect, useRef} from 'react'
import echarts from 'echarts'

export function ReactEcharts(props) {

  //ref标记元素
  const container = useRef(null)

  const chart = useRef(null)
  //useEffect，根据数组模拟第一次，update，指定update
  //[]  相当于 mounted，因为第一次总是触发，后面就是看数组的元素有没有变化
  //useEffect第二个参数的数组，当中元素变化的时候，useEffect会再次执行
  // 有点类似于 vue 的 watch，监听了该值的变化
  useEffect(() => {
    const width = document.documentElement.clientWidth

    //标记DOM之后，要使用 current 获取改DOM
    container.current.style.width = `${width * 0.8}px`
    container.current.style.height = `${width * 0.8}px`

    chart.current = echarts.init(container.current)
  }, [])

  //监听option变化
  //useEffect可以多次使用
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