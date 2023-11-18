<template>
    <el-dialog v-model="dialogTableVisible" width="25%">
        <div class="tip">提示</div>
        <div class="text">确定删除吗？</div>
        <div class="options">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmDel">确 定</el-button>
        </div>
    </el-dialog>
    <AddAdmin v-if="showAdmin" @refresh="getAdmins"></AddAdmin>
    <div class="admin">
        <div class="card" v-for="(admin, index) in admins" :key="index">
            <div class="img">
                <img src="../assets/ico/adminCard.png" alt="">
            </div>
            <div class="item number"><span>管理员编号:</span>{{ admin['aId'] }}</div>
            <div class="item name"><span>管理员姓名:</span>{{ admin['aName'] }}</div>
            <div class="item email"><span>管理员邮箱:</span>{{ admin['aEmail'] }}</div>
            <div class="item pwd"><span>管理员密码:</span>{{ admin['aPwd'] }}</div>
            <button @click="del(admin['aId'])">删除管理员</button>
        </div>
        <div class="card">
            <div class="add rel-v-h-c">
                <img @click.stop="showAdmins" src="../assets/ico/addAdmin.png" alt="" title="添加管理员">
                <span>添加管理员</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getall, delAdmin } from "./api/admin.js"
import AddAdmin from "./components/AddAdmin.vue"
import { useGStore } from "../store/gStore.js"
import { message } from "../tools/global.js"
let admins = ref([])
let gStore = useGStore()
onMounted(() => {
    gStore.setLoading(true)
    setTimeout(() => {
        getAdmins()
    }, 200);
})

// 获取管理员方法
const getAdmins = () => {
    gStore.setLoading(true)
    getall().then(res => {
        if (res.data.code == 200) {
            admins.value = res.data.data
        } else {
            setTimeout(() => {
                getAdmins()
            }, 2000);
        }
    }).finally(() => {
        gStore.setLoading(false)
    })
}


// 管理员显示
let showAdmin = ref(false)
const showAdmins = () => {
    showAdmin.value = true
    document.addEventListener("click", closeShowAdmins)
}
const closeShowAdmins = () => {
    showAdmin.value = false
    document.removeEventListener("click", closeShowAdmins)
}

// 删除对话框显示
let dialogTableVisible = ref(false)
// 删除的id
let id = ref("")
// 点击删除按钮，触发删除emits
function del(value) {
    // 显示对话框
    dialogTableVisible.value = true
    // 保存id
    id.value = value
}
// 确定删除
function confirmDel() {
    delFun(id.value)
    dialogTableVisible.value = false
    // 删除id清空
    id.value = ""
}
// 删除方法
const delFun = (id) => {
    gStore.setLoading(true)
    delAdmin(id).then(res => {
        if (res.data.code == 200) {
            message(1, "删除成功")
            // 清空数据
            admins.value = []
            getAdmins()
        } else {
            message(2, "删除失败")
        }
    }).finally(() => {
        gStore.setLoading(false)
    })
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

.admin {
    display: flex;
    flex-wrap: wrap;

    .card {
        width: 300px;
        // height: 200px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin: 20px 30px;
        padding: 30px;

        .item {
            height: 40px;
            color: var(--main-color);
            font-size: 16px;

            span {
                color: var(--deepcolor);
            }
        }

        .add {
            text-align: center;

            img {
                cursor: pointer;
            }

            span {
                display: block;
            }
        }

        button {
            border: none;
            outline: none;
            padding: 5px 10px;
            background-color: red;
            color: white;
            border-radius: 5px;
            cursor: pointer;

            &:hover {
                opacity: 0.6;
            }
        }
    }
}
</style>
