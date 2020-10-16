import echarts from 'echarts'

const barChartDOM = document.getElementById('bar-chart')
const lineChartDOM = document.getElementById('line-chart')
let width = document.documentElement.clientWidth   //常用获取屏幕宽度
const btn = document.getElementById('add-btn')
const autoAdd = document.querySelector("#autoAdd")

const setChartSize = () => {
    barChartDOM.style.width = width / 2 + "px"
    barChartDOM.style.height = width / 2 * 1.2 + 'px'
    lineChartDOM.style.width = width / 2 + "px"
    lineChartDOM.style.height = width / 3 + 'px'
}
setChartSize()


//动态添加数据
let n = 0
let m = 2

function createKey() {
    n += 1
    return `2020-5-${n}`
}

function createValue() {
    m *= 2
    return m
}

let xData = [createKey()]
let values = [createValue()]


// 指定图表的配置项和数据
let barChartOption = {
    title: {
        text: '表格的标题'
    },
    tooltip: {},

    //每项图例
    legend: {
        data: ['bug数', "bug数2"]
    },
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},

    //每项数据，根据图例
    series: [
        //这里的name要跟图例legend对应
        {
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
let lineChartBaseOption = {
    title: {
        text: '我是一个折线图',
        //距容器右侧的距离
        right: 100
    },
    tooltip: {
        show: true
    },
    legend: {
        data: ['动态添加数据']
    },
    toolbox: {
        show: true
    },
    // x轴和y轴的字段
    xAxis: {
        type: 'category',
        data: xData
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            lineStyle: {
                color: 'orange'
            },
            itemStyle: {
                borderWidth: 2
            },
            //这里的name要跟图例legend对应
            name: '动态添加数据',
            data: values,
            type: 'line'
        }
    ]
}

// 基于准备好的dom，初始化echarts实例
let myBarChart = echarts.init(barChartDOM)
let myLineChart = echarts.init(lineChartDOM, 'light')


// echarts提供的媒体查询，
// 在setOption的时候添加media字段，决定使用哪个option
const setChartOption = () => {
    myBarChart.setOption(barChartOption)
    myLineChart.setOption({
        baseOption: lineChartBaseOption,
        media: [
            {
                query: {
                    maxWidth: 500
                },
                option: {
                    series: [{
                        itemStyle: {
                            borderWidth: 20
                        }
                    }]
                }
            }
        ]
    })

}
setChartOption()


//防止一直点,节流
let loading = false
btn.addEventListener("click", () => {
    if (loading) {
        console.log("loading")
        return
    }
    myLineChart.showLoading()
    loading = true

    //更新，只需要把改动的字段传进去
    //对于数据，要把原数组析构下来
    xData = [...xData, createKey()]
    values = [...values, createValue()]

    //模拟延迟
    setTimeout(() => {
        myLineChart.setOption({
            xAxis: {
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
autoAdd.addEventListener('click', () => {
    setInterval(() => {
        if (loading) {return}
        myLineChart.showLoading()
        loading = true
        xData = [...xData, createKey()]
        values = [...values, createValue()]

        setTimeout( () => {
            myLineChart.setOption({
                xAxis: {
                    data: xData
                },
                series: [{
                    data: values
                }]
            })
            myLineChart.hideLoading()
            loading = false

        }, 500)
    }, 1000)




})
//数据点 的点击事件
myLineChart.on("click", (e) => {
    console.log(e)
    console.log(e.name)
    console.log(e.dataIndex)
    console.log(e.data)
    window.open(`https://www.baidu.com/s?wd=${e.name}`)
})

window.onresize = () => {
    console.log("resize")
    width = document.documentElement.clientWidth
    setChartSize()
    setChartOption()
}



