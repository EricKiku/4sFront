<template>
    <div class="usermanage">
        <div class="head heiti">用户管理</div>
        <div class="secondHead">
            所有注册的用户
        </div>
        <div class="table">
            <div class="ops">
                <div @click="get" class="refresh"><img class="rel-v-c" src="../assets/ico/refresh.png" alt="">刷新</div>
                <input @keydown.enter="searchFun" v-model="search" type="text" placeholder="输入搜索关键字,回车搜索">
                <el-tag style="line-height: 30px;" class="ml-2" type="warning">*多次查询结果会叠加，刷新即可清空</el-tag>
            </div>
            <Table v-if="users.length" :keys="keys" :keysnick="keysnick" :values="users" :id="'u_id'" :sort-index="[0]">
            </Table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import Table from "../components/Table.vue";
import { getUser } from "./api/user";
import { getAllUpkeep } from "../upkeepReservation//api/upkeep.js"
import { useGStore } from "../store/gStore.js"
const gStore = useGStore()
onMounted(() => {
    get()
})

// 获取所有用户
let users = ref<any>([])
let keys = ref<any>([])
let keysnick = ref<any>([])
function get() {
    // 进入加载
    gStore.setLoading(true)
    setTimeout(() => {
        getUser().then(res => {
            if (res.data.code == 200) {
                // 给users赋值
                users.value = res.data.data;

                // 获取所有预约信息
                getUpkeep()
            }
        }).finally(() => {
            gStore.setLoading(false)
        })
    }, 200);
}

// 获取所有预约信息
let upkeeps = ref<any>([])
function getUpkeep() {
    gStore.setLoading(true)
    getAllUpkeep().then(res => {
        if (res.data.code == 200) {
            upkeeps.value = res.data.data
            // 如果预约信息数组中的元素的u_id存在users中的u_id，则给对应的users的元素添加一个属性haveuk，值为true
            for (let i = 0; i < users.value.length; i++) {
                for (let j = 0; j < upkeeps.value.length; j++) {
                    if (users.value[i].uId == upkeeps.value[j].u_id) {
                        users.value[i].haveuk = true
                    }
                }
            }
            // 字段具体名
            keys.value = Object.keys(users.value[0])
            // 字段昵称
            keysnick.value = ['ID', '邮箱', '密码', '预约',]
        }
    }).finally(() => {
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
            resoult = users.value.filter((item: any) => {
                for (let key in item) {
                    if (item[key].toString().includes(search.value)) {
                        return true
                    }
                }
                return false
            })
        }
        gStore.setLoading(false)
        users.value = []
        users.value = resoult
    }, 200);

}

</script>

<style lang="less" scoped>
.usermanage {
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

            .refresh {
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
    }
}
</style>