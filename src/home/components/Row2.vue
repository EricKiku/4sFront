<template>
    <div class="row2">
        <div class="title heiti">
            每日预约保养/预约试驾折线图
        </div>
        <div ref="chart" class="chart"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue"
import { getAllUpkeep } from "../../upkeepReservation/api/upkeep.js"
import { gettestdrive } from "../../testDrive/api/testDrive.js"
import * as echarts from 'echarts';
let chart = ref()
onMounted(async () => {
    await nextTick()
    getUpkeep()

})

// 获取预约保养
let upkeep = ref([])
// 获取预约试驾
let testDrive = ref([])

function getUpkeep() {
    getAllUpkeep().then(res => {
        if (res.data.code == 200) {
            upkeep.value = res.data.data
            // 统计数据中uk_date出现的次数，返回对象数组，键名为date，并且取空格前的部分，值为次数
            let obj = upkeep.value.reduce((total, item: any) => {
                let date = item['uk_date'].split(" ")[0]
                if (total[date]) {
                    total[date]++
                } else {
                    total[date] = 1
                }
                return total
            }, {})

            getTestDrive(obj)

        }

    })
}
function getTestDrive(ukdata: any) {
    gettestdrive().then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
            testDrive.value = res.data.data
            // 统计数据中tdDate出现的次数，返回对象数组，键名为date，并且取空格前的部分，值为次数
            let obj = testDrive.value.reduce((total, item: any) => {
                let date = item['tdDate'].split(" ")[0]
                if (total[date]) {
                    total[date]++
                } else {
                    total[date] = 1
                }
                return total
            }, {})

            // 取出ukdata和obj中的所有键名，去重
            let keys = Array.from(new Set([...Object.keys(ukdata), ...Object.keys(obj)]))
            // 对keys排序，按照时间顺序
            keys.sort((a, b) => {
                return new Date(a).getTime() - new Date(b).getTime()
            })
            // 处理ukdata和obj，对比keys，如果自己存在该键名，则使用自己的键值，没有则取0，返回两个数组，内容是键值
            let ukdataArr = keys.map(item => ukdata[item] || 0)
            let tddataArr = keys.map(item => obj[item] || 0)
            initChart(keys, ukdataArr, tddataArr)
        }

    })
}


// 初始化图表
function initChart(x, ukdata, tddata) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(chart.value);
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['预约保养', '预约试驾']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: x
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '预约保养',
                type: 'line',
                smooth: true,
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: ukdata
            },
            {
                name: '预约试驾',
                type: 'line',
                smooth: true,
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: tddata
            },
        ]
    };
    // 绘制图表
    myChart.setOption(option);
}
</script>

<style lang="less" scoped>
.row2 {
    height: 400px;
    margin: 15px;
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    overflow: hidden;
    border-radius: 5px;
    padding-bottom: 10px;

    .title {
        font-size: 20px;
        background-color: white;
        padding: 15px;
        height: 30px;
        font-weight: bold;

    }

    .chart {
        height: calc(100% - 60px);
    }
}
</style>