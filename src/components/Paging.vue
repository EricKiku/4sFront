<template>
    <div class="paging">
        <div class="currentpage rel-v-c">
            <!-- 回车触发 -->
            <input @keydown.enter="changePage" type="number" v-model="currentpage">
        </div>
        <div class="fenge rel-v-c">
            /
        </div>
        <div class="totalpage rel-v-c">
            {{ totalpage }}
        </div>
        <div @click="pgup" class="pgup rel-v-c" @mouseenter="leftHover = true" @mouseleave="leftHover = false">
            <img v-show="!leftHover" class="rel-v-c" src="../assets/ico/left.png" alt="">
            <img v-show="leftHover" class="rel-v-c" src="../assets/ico/left-a.png" alt="">
        </div>
        <div @click="pgdown" class="pgdown rel-v-c" @mouseenter="rightHover = true" @mouseleave="rightHover = false">
            <img v-show="!rightHover" class="rel-v-c" src="../assets/ico/right.png" alt="">
            <img v-show="rightHover" class="rel-v-c" src="../assets/ico/right-a.png" alt="">
        </div>
        <div class="count">
            <!-- 回车重新计算页数 -->   
            每页<input @keydown.enter="handleValue" type="number" v-model="count">条
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { message } from "../tools/global.js"
let props = defineProps(["total"])
let emits = defineEmits(["changePage", "changeCount"])
// 当前是第几页
let currentpage = ref(1)
// 总共多少页
let totalpage = ref(1)
// 一页几条
let count = ref(10)
// 总共多少条，由props提供
let total = ref(0)
onMounted(() => {
    total.value = props.total
    handleValue()
})
// 重新计算总页数
function handleValue() {
    totalpage.value = Math.ceil(total.value / count.value) || 1
    // 触发emits，修改表格每个条数
    emits("changeCount", count.value)
    // 强制使当前页置为1
    currentpage.value = 1
    changePage()
}
// 切换分页，触发emits
function changePage() {
    // 判断边界值，如果页数小于1或者大于总页，则处理
    if (currentpage.value < 1) {
        message(2, "已经是第一页")
        currentpage.value = 1;
    }
    if (currentpage.value > totalpage.value) {
        message(2, "已经是最后一页")
        currentpage.value = totalpage.value
    }
    emits("changePage", currentpage.value)
}
// 向左
function pgup() {
    // 先把当前页-1，再触发换页方法
    currentpage.value -= 1
    changePage()
}
// 向右
function pgdown() {
    // 先把当前页-1，再触发换页方法
    currentpage.value += 1
    changePage()
}
// 悬浮左翻页
let leftHover = ref(false)
// 悬浮右翻页
let rightHover = ref(false)


</script>

<style lang="less" scoped>
.paging {
    height: 40px;
    display: flex;
    justify-content: left;
    margin: 10px 0px;

    >div {
        height: 30px;
        line-height: 30px;
        margin: 0px 5px 0px 0px;
    }

    .currentpage {
        input {
            box-sizing: border-box;
            height: 30px;
            width: 30px;
            text-align: center;
            font-size: 16px;
            color: var(--main-color);
            border: 2px solid var(--lowercolor);
            outline: none;
            border-radius: 3px;
            transition: all 0.2s;

            &:focus {
                border: 2px solid var(--main-color);
            }

        }
    }

    .fenge {
        font-size: 16px;
        line-height: 30px;
    }

    img {
        height: 20px;
        width: 20px;
    }

    .pgup,
    .pgdown {
        border: 1px solid var(--lowercolor);
        height: 20px;
        width: 20px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            border: 1px solid #ccc;
            background-color: #ccc;
        }
    }

    .count {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        margin-left: 20px;

        input {
            padding: 1px 5px;
            margin: 0px 5px;
            border: 1px solid var(--main-color);
            outline: none;
            height: 20px;
            width: 20px;
            text-align: center;
        }
    }
}
</style>