<template>
    <div class="employee">
        <addEmployee v-if="showAddEmployee" @success="success" @fail="fail"></addEmployee>
        <div class="head heiti">员工管理</div>
        <div class="secondHead">
            管理所有员工
        </div>
        <div class="table">
            <div class="ops">
                <div @click="get" class="refresh item"><img class="rel-v-c" src="../assets/ico/refresh.png" alt="">刷新</div>
                <div @click.stop="add" class="refresh item"><img class="rel-v-c" src="../assets/ico/addEmployee.png"
                        alt="">添加员工
                </div>
                <input @keydown.enter="searchFun" v-model="search" type="text" placeholder="输入搜索关键字,回车搜索">
                <el-tag style="line-height: 30px;" class="ml-2" type="warning">*多次查询结果会叠加，刷新即可清空</el-tag>
            </div>
            <div class="emptyMessage" v-if="!loading && employees.length == 0">暂时还没有数据</div>
            <Table v-if="employees.length" :keys="keys" :keysnick="keysnick" :values="employees" :id="'uk_id'"
                :sort-index="[0, 1, 4, 8, 9, 10]" :color-index="[1, 5]" :color="{ 1: '#7366FF', 5: '#4f4f4f' }" :del="true"
                @del-fun="del">
            </Table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { getEmployeeList, deleteEmployee } from "./api/employee.js"
import addEmployee from "./components/addEmployee.vue"
import Table from "../components/Table.vue";
import { getAll } from "../evalManagement/api/eval.js"
import { message } from "../tools/global.js"
// 导入useRouter
import { useRouter } from "vue-router"
import { useGStore } from "../store/gStore.js"
const router = useRouter()
const gStore = useGStore()
onMounted(() => {
    gStore.setLoading(true)
    setTimeout(() => {
        get()
    }, 200);
})

// 获取所有员工
let employees = ref<any>([])
let keys = ref<any>([])
let keysnick = ref<any>([])
let loading = ref(false)
function get() {
    loading.value = true
    // 重置数据
    employees.value = []
    gStore.setLoading(true)
    getEmployeeList().then(res => {
        if (res.data.code == 200) {
            // 给employees赋值
            employees.value = res.data.data;

            // 获取所有评价
            getAllEval()
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
            resoult = employees.value.filter((item: any) => {
                for (let key in item) {
                    if (item[key].toString().includes(search.value)) {
                        return true
                    }
                }
                return false
            })
        }
        gStore.setLoading(false)
        employees.value = []
        employees.value = resoult
    }, 200);

}

// 所有评价
let allEval = ref<any>([])
function getAllEval() {
    getAll().then(res => {
        if (res.data.code == 200) {
            allEval.value = res.data.data
            // 统计每个人出现几次，以eId分组
            let obj: any = {}
            allEval.value.forEach((item: any) => {
                if (obj[item.eId]) {
                    obj[item.eId]++
                } else {
                    obj[item.eId] = 1
                }
            })

            // 统计每个eId的平均evStar
            let obj2: any = {}
            allEval.value.forEach((item: any) => {
                if (obj2[item.eId]) {
                    obj2[item.eId] += item.evStar
                } else {
                    obj2[item.eId] = item.evStar
                }
            })
            // 遍历obj2，计算平均值
            for (let key in obj2) {
                obj2[key] = (obj2[key] / obj[key]).toFixed(1)
            }
            // 把employees中eId的eServed字段替换成obj中对应键名的值
            employees.value.forEach((item: any) => {
                item.eServed = obj[item.eId]
                item.eEval = obj2[item.eId]
            })

            // 字段具体名
            keys.value = Object.keys(employees.value[0])
            // 字段昵称
            keysnick.value = ['员工编号', '员工工号', '员工姓名', '员工性别', '员工年龄', '员工电话', '员工图片', '员工地址', '服务人数', '平均评价', '工资', '员工入职时间']
        }
    })
}







// 是否显示添加员工
let showAddEmployee = ref(false)
// 添加员工
function add() {
    showAddEmployee.value = true
    document.addEventListener('click', closeAddEmployee)
}
// 关闭添加员工
function closeAddEmployee() {
    showAddEmployee.value = false
    document.removeEventListener('click', closeAddEmployee)

    // 刷新
    get()
}
// 成功
function success() {
    message(1, "添加成功")
    closeAddEmployee()
    // 刷新
    get()
}
// 失败
function fail() {
    message(0, "添加失败")
}



// 删除员工方法
function del(eid) {
    gStore.setLoading(true)
    deleteEmployee(eid).then(res => {
        if (res.data.code == 200) {
            message(1, "删除成功")
            // 清空employees
            employees.value = []
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