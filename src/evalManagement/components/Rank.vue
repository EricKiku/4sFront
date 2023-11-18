<template>
    <div class="rank">
        <div class="second item">
            <div class="jiangpai">
                <img src="../../assets/ico/second.png" alt="">
            </div>
            <div class="name">{{ second }}</div>
            <el-rate v-model="secondStar" disabled show-score text-color="#ff9900" score-template="{value} 星" />
        </div>
        <div class="first item">
            <div class="jiangpai">
                <img src="../../assets/ico/first.png" alt="">
            </div>
            <div class="name">{{ first }}</div>
            <el-rate v-model="firstStar" disabled show-score text-color="#ff9900" score-template="{value} 星" />
        </div>
        <div class="third item">
            <div class="jiangpai">
                <img src="../../assets/ico/third.png" alt="">
            </div>
            <div class="name">{{ third }}</div>
            <el-rate v-model="thirdStar" disabled show-score text-color="#ff9900" score-template="{value} 星" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getAll } from "../api/eval.js"

let evals = ref([])
// 平均星数最高的三个人
let first = ref({})
let second = ref({})
let third = ref({})
// 星数最高的三个人的平均星数
let firstStar = ref(0)
let secondStar = ref(0)
let thirdStar = ref(0)

onMounted(() => {
    getAll().then(res => {
        if (res.data.code == 200) {
            evals.value = res.data.data;
            const result = getAverageStarByEName(evals.value);
            // 将result对象的键值对转换为数组
            const entries = Object.entries(result);

            // 按照值的大小进行排序
            entries.sort((a, b) => b[1] - a[1]);
            console.log("星数：", entries);
            // 取出前三个键名
            [first.value, second.value, third.value] = entries.slice(0, 3).map(entry => entry[0]);

            // 取出前三个键值
            [firstStar.value, secondStar.value, thirdStar.value] = entries.slice(0, 3).map(entry => entry[1].toFixed(1));
            // 取出前三个键名
            [first.value, second.value, third.value] = entries.slice(0, 3).map(entry => entry[0]);


        }
    })
})

function getAverageStarByEName(evals) {
    const eNameMap = new Map();

    // 遍历evals，将evStar按eName分类
    evals.forEach(evaL => {
        const { eName, evStar } = evaL;
        if (!eNameMap.has(eName)) {
            eNameMap.set(eName, { sum: evStar, count: 1 });
        } else {
            const value = eNameMap.get(eName);
            value.sum += evStar;
            value.count += 1;
        }
    });

    // 计算每个eName的evStar的平均值
    const result = {};
    for (const [eName, value] of eNameMap.entries()) {
        result[eName] = value.sum / value.count;
    }

    return result;
}

</script>

<style lang="less" scoped>
.rank {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    position: relative;

    .item {
        width: fit-content;
        margin: 0 20px;

        .jiangpai {
            text-align: center;

            img {
                margin: 0 auto;
            }
        }

        .name {
            text-align: center;
        }
    }

    .first {
        font-size: 20px;
        color: var(--main-color);
    }

    .second {
        font-size: 18px;
        color: var(--deepcolor);
    }

    .thidr {
        font-size: 16px;
        color: var(--lowercolor);
    }
}
</style>
