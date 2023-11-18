<template>
    <div class="td">
        <div class="head heiti">预约试驾管理</div>
        <div class="secondHead">
            管理预约试驾的用户
        </div>
        <div class="table">
            <div class="ops">
                <div @click="get" class="refresh item"><img class="rel-v-c" src="../assets/ico/refresh.png" alt="">刷新</div>
                <div @click="toCustom" class="refresh item"><img class="rel-v-c" src="../assets/ico/go.png" alt="">前往预约
                </div>
                <input @keydown.enter="searchFun" v-model="search" type="text" placeholder="输入搜索关键字,回车搜索">
                <el-tag style="line-height: 30px;" class="ml-2" type="warning">*多次查询结果会叠加，刷新即可清空</el-tag>
            </div>
            <div class="emptyMessage" v-if="!loading && testdrives.length == 0">暂时还没有数据</div>
            <Table v-if="testdrives.length" :keys="keys" :keysnick="keysnick" :values="testdrives" :id="'td_id'"
                :sort-index="[0]" :del="true" @del-fun="del">
            </Table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import Table from "../components/Table.vue";
import { gettestdrive, deletetestdrive } from "./api/testdrive.js"
import { useRouter } from "vue-router"
import { useGStore } from "../store/gStore.js"
import { message } from "../tools/global";
const router = useRouter()
const gStore = useGStore()

// onmounted
onMounted(() => {
    gStore.setLoading(true)
    setTimeout(() => {
        get()
    }, 200);
})
// 获取所有预约试驾
let testdrives = ref<any>([])
let keys = ref<any>([])
let keysnick = ref<any>([])
let loading = ref(false)
function get() {
    loading.value = true
    gStore.setLoading(true)
    gettestdrive().then(res => {
        if (res.data.code == 200) {
            // 给upkeeps赋值
            testdrives.value = res.data.data;
            // 字段具体名
            keys.value = Object.keys(testdrives.value[0])
            // 字段昵称
            keysnick.value = ['预约编号', '姓名', '性别', '手机', '省', '市', '经销商', '预约时间', '预约车型']
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
            resoult = testdrives.value.filter((item: any) => {
                for (let key in item) {
                    if (item[key].toString().includes(search.value)) {
                        return true
                    }
                }
                return false
            })
        }
        gStore.setLoading(false)
        testdrives.value = []
        testdrives.value = resoult
    }, 200);

}

// 去预约客户端页面
function toCustom() {
    router.push({
        name: 'testDriveCustom',
    })
}


// 删除
function del(tdid) {
    gStore.setLoading(true)
    deletetestdrive(tdid).then(res => {
        if (res.data.code == 200) {
            message(1, "删除成功")
            // 清空数据
            testdrives.value = []
            get()
        } else {
            message(2, "删除失败")
        }
    }).finally(() => {
        gStore.setLoading(false)
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