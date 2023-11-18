<template>
    <div class="eval">
        <div class="head heiti">员工评价管理</div>
        <div class="secondHead">
            管理客户对员工的服务评价
        </div>
        <Rank></Rank>
        <div class="table">
            <div class="ops">
                <div @click="get" class="refresh item"><img class="rel-v-c" src="../assets/ico/refresh.png" alt="">刷新</div>
                <div @click="toAdd" class="refresh item"><img class="rel-v-c" src="../assets/ico/go.png" alt="">前往评价
                </div>
                <input @keydown.enter="searchFun" v-model="search" type="text" placeholder="输入搜索关键字,回车搜索">
                <el-tag style="line-height: 30px;" class="ml-2" type="warning">*多次查询结果会叠加，刷新即可清空</el-tag>
            </div>
            <div class="emptyMessage" v-if="!loading && evals.length == 0">暂时还没有数据</div>
            <Table v-if="evals.length" :keys="keys" :keysnick="keysnick" :values="evals" :id="'uk_id'"
                :sort-index="[0, 1, 5]" :star="true">
            </Table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { getAll } from "./api/eval.js"
import { useGStore } from "../store/gStore.js"
import Table from "../components/Table.vue";
import Rank from "./components/Rank.vue";
// 导入useRouter
import { useRouter } from "vue-router"
const router = useRouter()
const gStore = useGStore()

onMounted(() => {
    gStore.setLoading(true)
    setTimeout(() => {
        get()
    }, 200);
})

// 获取所有评价
let evals = ref<any>([])
let keys = ref<any>([])
let keysnick = ref<any>([])
let loading = ref(false)
function get() {
    loading.value = true
    gStore.setLoading(true)
    getAll().then(res => {
        if (res.data.code == 200) {
            // 给evals赋值
            evals.value = res.data.data;
            // 字段具体名
            keys.value = Object.keys(evals.value[0])
            // 字段昵称
            keysnick.value = ['评价编号', '员工编号', '员工姓名', '服务类型', '评价时间', '评价星级', '评价内容']
        }
    }).finally(() => {
        loading.value = false
        gStore.setLoading(false)
    })
}

// 搜索
let search = ref("")
// 从cars中的所有元素中的所有键值对的值进行模糊搜索，并返回一个数组
function searchFun() {
    gStore.setLoading(true)
    setTimeout(() => {
        let resoult = []
        if (search.value == "") {
            get()
        } else {
            resoult = evals.value.filter((item: any) => {
                for (let key in item) {
                    if (item[key].toString().includes(search.value)) {
                        return true
                    }
                }
                return false
            })
        }
        gStore.setLoading(false)
        evals.value = []
        evals.value = resoult
    }, 200);

}


// 跳转到add页面
function toAdd() {
    router.push({
        name: 'add',
    })
}
</script>

<style lang="less" scoped>
.head {
    font-size: 20px;
    font-weight: bold;
    color: var(--deepcolor);
    margin-bottom: 10px;
}

.secondHead {
    color: var(--lowercolor);
}

.table {
    margin-top: 30px;
    background-color: white;
    border-radius: 10px;
    padding: 20px;

    input {
        outline: none;
        transition: all 0.2s;
        border: 2px solid var(--lowercolor);
        width: 200px;
        border-radius: 5px;
        padding: 5px 10px;

        &:focus {
            border: 2px solid var(--main-color);
        }
    }

    .ops {
        // height: 50px;
        display: flex;
        margin-bottom: 15px;

        .item {
            padding: 5px 20px;
            background-color: var(--main-color);
            text-align: center;
            border-radius: 5px;
            margin-right: 15px;
            font-size: 16px;
            color: white;
            letter-spacing: 4px;
            user-select: none;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
                opacity: 0.8;
            }
        }
    }

    .emptyMessage {
        text-align: center;
        color: var(--lowercolor);
        font-size: 16px;
        margin-top: 20px;
    }
}
</style>