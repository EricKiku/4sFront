<template>
    <div class="row3">
        <div class="left">
            <div class="title heiti">
                试驾选择车型
            </div>
            <div ref="chart1" class="chart"></div>
        </div>
        <div class="right">
            <div class="title heiti">
                试驾所选经销商省份分布
            </div>
            <div ref="chart2" class="chart"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue"
import { gettestdrive } from "../../testDrive/api/testDrive.js"
import * as echarts from 'echarts';
let chart1 = ref()
let chart2 = ref()
onMounted(async () => {
    await nextTick()
    getTestDrive()
})

// 试驾车型统计
let testDriveModel = ref([])
// 获取试驾信息方法
async function getTestDrive() {
    let res = await gettestdrive().then(res => {
        // 以tdModel分组，统计每个车型的数量
        let obj = {}
        res.data.data.forEach((item: any) => {
            if (obj[item.tdModel]) {
                obj[item.tdModel]++
            } else {
                obj[item.tdModel] = 1
            }
        })
        // 将对象转为数组，元素是对象，有两个键名，分别是value和name，value对应obj中的键值，name对应obj中的键名
        let arr = <any>[]
        for (let key in obj) {
            arr.push({
                value: obj[key],
                name: key
            })
        }
        initChart1(arr)

        // 统计res.data.data的数据，以tdProvince分组，统计每个省份的数量
        let obj2 = {}
        res.data.data.forEach((item: any) => {
            if (obj2[item.tdProvince]) {
                obj2[item.tdProvince]++
            } else {
                obj2[item.tdProvince] = 1
            }
        })

        // 将obj2中的数据拆成两个数组，一个省份，一个数量，顺序对应
        let dataAxis = <any>[]
        let data = <any>[]
        for (let key in obj2) {
            dataAxis.push(key)
            data.push(obj2[key])
        }
        initChat2(dataAxis, data)

    })
}
// 初始化图表1
function initChart1(data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(chart1.value);
    let option1 = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data
            }
        ]
    };
    // 绘制图表
    myChart1.setOption(option1);



}

// 初始化图表2
function initChat2(dataAxis, data) {

    // 第二个
    var myChart2 = echarts.init(chart2.value);
    // prettier-ignore
    // let dataAxis = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十",];
    // prettier-ignore
    // let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321];
    let yMax = 500;
    let dataShadow = <any>[];
    for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }
    let option2 = {
        xAxis: {
            data: dataAxis,
            axisLabel: {
                inside: true,
                color: '#fff'
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#999'
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            {
                type: 'bar',
                showBackground: true,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ])
                    }
                },
                data: data
            }
        ]
    };
    // Enable data zoom when user click bar.
    const zoomSize = 6;
    myChart2.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        myChart2.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue:
                dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
    });
    // 绘制图表
    myChart2.setOption(option2);
}
</script>

<style lang="less" scoped>
.row3 {
    height: 400px;
    // padding: 15px;
    display: flex;

    >div {
        flex: 1;
        box-sizing: border-box;
        margin: 15px;
        background-color: white;
        border-radius: 10px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    .title {
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        padding: 15px;
        font-weight: bold;
        color: var(--deepcolor);
        border-bottom: 1px solid var(--bordercolor);
    }

    .chart {
        height: 339px;
    }
}
</style>