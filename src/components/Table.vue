<template>
    <el-dialog v-model="dialogTableVisible" width="25%">
        <div class="tip">提示</div>
        <div class="text">确定删除吗？</div>
        <div class="options">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmDel">确 定</el-button>
        </div>
    </el-dialog>
    <div class="tablelist">
        <!-- 当前排序信息 -->
        <div class="sortInfo">
            <span v-show="sortField != -1">当前排序字段：<span>{{ keysnick[sortField] }}</span></span>
            <span v-show="sortField != -1">当前排序方式：<span>{{ sortType == "asc" ? "升序" : "降序" }}</span></span>
        </div>
        <!-- 字段 -->
        <div class="fields">
            <div class="field" v-for="(key, index) in keysnick" :key="index">
                {{ key }}
                <img @click="selectSortField(index)" v-show="sortIndex.indexOf(index) != -1 && sortField != index"
                    src="../assets/ico/sort.png" alt="">
                <img @click="selectSortField(index)"
                    v-show="sortIndex.indexOf(index) != -1 && sortField == index && sortType == 'asc'"
                    src="../assets/ico/sortAsc.png" alt="">
                <img @click="selectSortField(index)"
                    v-show="sortIndex.indexOf(index) != -1 && sortField == index && sortType == 'desc'"
                    src="../assets/ico/sortDesc.png" alt="">
            </div>
            <div class="field" v-show="del">
                操作
            </div>
        </div>
        <div class="messages">
            <div class="item" v-for="(value) in messages.slice((currentPage - 1) * count, currentPage * count)"
                :key="value[id]">
                <div class="value" :style="{ color: colorIndex ? colorIndex.indexOf(index) != -1 ? color[index] : '' : '' }"
                    v-for="(field, index) in keys" :key="index" :title="value[field]">
                    <span v-if="field != 'evStar' && field != 'haveuk'">
                        {{ value[field] }}
                    </span>
                    <span v-if="star && field == 'evStar'">
                        <el-rate v-model="value[field]" disabled show-score text-color="#ff9900"
                            score-template="{value} 星" />
                    </span>
                    <span class="uk" v-show="field == 'haveuk' && value['haveuk']">保养</span>
                </div>
                <div v-show="del">
                    <button @click="delFun(value[keys[0]])">删除</button>
                </div>
            </div>

        </div>
        <Paging :total="values.length" @change-page="changePage" @change-count="changeCount"></Paging>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue"
import Paging from "./Paging.vue";
import { message } from "../tools/global";
// sortIndex 为需要排序的字段的索引
// star:是否有星级评价
// del:是否有删除操作
let props = defineProps(["keys", "keysnick", "values", "id", "sortIndex", "colorIndex", "color", 'star', 'del'])
let emits = defineEmits(['delFun'])
let messages = ref<any>([])
let orignMessage = ref<any>([])
onMounted(() => {
    messages.value = [...props.values]
    orignMessage.value = [...props.values]
})
watchEffect(() => {
    messages.value = [...props.values]
    orignMessage.value = [...props.values]
})
// 分页数据
let count = ref(10)
// 当前是第几页
let currentPage = ref(1)
// 切换页数
function changePage(value) {
    currentPage.value = value
}
// 切换每页条数
function changeCount(value) {
    count.value = value
}

// 对于哪一个字段排序
let sortField = ref(-1)
// 升序还是降序
let sortType = ref("")
// 选择排序字段
function selectSortField(index) {
    let tempArr = [...messages.value]
    // 如果选择字段和上次一样，那么就切换排序方式
    if (sortField.value != index) {
        sortType.value = ""
    }
    sortField.value = index
    if (sortType.value == "") {
        sortType.value = "asc"
        tempArr.sort(sortMethod)
        messages.value = tempArr
    } else if (sortType.value == "asc") {
        sortType.value = "desc"
        tempArr.sort(sortMethod)
        messages.value = tempArr
    } else if (sortType.value == "desc") {
        sortField.value = -1
        sortType.value = ""
        messages.value = [...orignMessage.value]
    }


}
// 排序方法
function sortMethod(a, b) {
    const key = props.keys[sortField.value];
    const valueA = a[key];
    const valueB = b[key];

    if (sortType.value === "asc") {
        if (!isNaN(parseFloat(valueA)) && !isNaN(parseFloat(valueB))) {
            return parseFloat(valueA) - parseFloat(valueB);
        } else {
            return valueA - valueB;
        }
    } else if (sortType.value === "desc") {
        if (!isNaN(parseFloat(valueA)) && !isNaN(parseFloat(valueB))) {
            return parseFloat(valueB) - parseFloat(valueA);
        } else {
            return valueB - valueA;
        }
    }

    return 0;
}
// function sortMethod(a, b) {
//     if (sortType.value == "asc") {
//         return a[props.keys[sortField.value]] - b[props.keys[sortField.value]]
//     } else if (sortType.value == "desc") {
//         return b[props.keys[sortField.value]] - a[props.keys[sortField.value]]
//     }
//     return 0
// }

// 删除对话框显示
let dialogTableVisible = ref(false)
// 删除的id
let id = ref("")
// 点击删除按钮，触发删除emits
function delFun(value) {
    // 显示对话框
    dialogTableVisible.value = true
    // 保存id
    id.value = value
}
// 确定删除
function confirmDel() {
    emits("delFun", id.value)
    dialogTableVisible.value = false
    // 删除id清空
    id.value = ""
}
</script>

<style lang="less" scoped>
.tip {
    font-size: 20px;
    font-weight: 700;
    // padding: 20px 0px;
    color: var(--main-color);
}

.text {
    font-size: 16px;
    font-weight: 500;
    padding: 20px 0px;

}

.options {
    text-align: center;
    padding: 20px 0px;

}

.sortInfo {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    background-color: var(--main-bgcolor);
    padding: 10px 0px;
    height: 20px;
    line-height: 20px;

    span {
        margin-right: 10px;

        span {
            color: var(--main-color);
        }
    }

}

.fields {
    display: flex;
    margin-bottom: 15px;

    .field {
        flex: 1;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        background-color: var(--main-bgcolor);
        padding: 10px 0px;
        height: 20px;
        line-height: 20px;

        img {
            height: 20px;
            width: 20px;
            vertical-align: middle;
            margin-top: -4px;
            cursor: pointer;
        }
    }
}

.messages {
    .item {
        padding: 15px 0px;
        text-align: center;
        display: flex;
        font-size: 14px;
        border-bottom: 0.5px solid #eeeeee;
        color: var(--tablecolor);
        font-weight: 500;
        letter-spacing: 1px;

        &:hover {
            background-color: var(--tableborder);
        }

        .value {
            /* 强制不换行 */
            white-space: nowrap;
            /* 文字用省略号代替超出的部分 */
            text-overflow: ellipsis;
            /* 匀速溢出内容，隐藏 */
            overflow: hidden;
        }

        .uk {
            padding: 5px 10px;
            background-color: var(--main-color);
            color: white;
            border-radius: 5px;
        }

        >div {
            flex: 1;
            line-height: 30px;

            &::selection {
                background-color: var(--main-color);
                color: white;
            }
        }

        button {
            padding: 5px 10px;
            color: white;
            background-color: rgb(255, 82, 82);
            border: none;
            outline: none;
            border-radius: 5px;
            cursor: pointer;

            &:hover {
                opacity: 0.6;
            }
        }
    }
}
</style>