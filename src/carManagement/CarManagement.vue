<template>
    <div class="carManage">
        <AddCar v-show="addDiaVis" @close="closeAddDia"></AddCar>
        <div class="head heiti"> 车辆管理</div>
        <div class="secondHead">
            所有注册的用户
        </div>
        <div class="table">
            <div class="ops">
                <div @click="get" class="refresh item"><img class="rel-v-c" src="../assets/ico/refresh.png" alt="">刷新</div>
                <div @click.stop="openAddDia" class="add item"><img class="rel-v-c" src="../assets/ico/add.png" alt="">新增
                </div>
                <input @keydown.enter="searchFun" v-model="search" type="text" placeholder="输入搜索关键字,回车搜索">
                <el-tag style="line-height: 30px;" class="ml-2" type="warning">*多次查询结果会叠加，刷新即可清空</el-tag>
            </div>
            <Table v-if="cars.length" :keys="keys" :keysnick="keysnick" :values="cars" :id="'u_id'" :sort-index="[0, 6, 7]"
                :del="true" @del-fun="del">
            </Table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import Table from "../components/Table.vue";
import AddCar from "./components/AddCar.vue"
import { getCar, deleteCar } from "./api/car.js";
import { useGStore } from "../store/gStore.js"
import { message } from "../tools/global.js"
const gStore = useGStore()
onMounted(() => {
    get()
})
// 获取所有车型
let cars = ref<any>([])
let keys = ref<any>([])
let keysnick = ref<any>([])
function get() {
    // 进入加载
    gStore.setLoading(true)
    setTimeout(() => {
        getCar().then(res => {
            if (res.data.code == 200) {
                // 给users赋值
                cars.value = res.data.data;
                // 字段具体名
                keys.value = Object.keys(cars.value[0])
                // 字段昵称
                keysnick.value = ['编号', '品牌', '型号', '配置', '颜色', '档位', '数量', '价格(万元)']
            }
        }).finally(() => {
            gStore.setLoading(false)
        })
    }, 200);
}


// 增加车型是否显示
let addDiaVis = ref(false)
// 打开
function openAddDia() {
    addDiaVis.value = true
    document.addEventListener("click", closeAddDia)
}
// 关闭
function closeAddDia() {
    addDiaVis.value = false
    get()
    document.removeEventListener("click", closeAddDia)
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
            resoult = cars.value.filter((item: any) => {
                for (let key in item) {
                    if (item[key].toString().includes(search.value)) {
                        return true
                    }
                }
                return false
            })
        }
        gStore.setLoading(false)
        cars.value = []
        cars.value = resoult
    }, 200);

}

// 删除数据回调
function del(cid) {
    gStore.setLoading(true)
    deleteCar(cid).then(res => {
        if (res.data.code == 200) {
            message(1, "删除成功")
            // 先清空car
            cars.value = []
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
.carManage {

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
    }
}
</style>