<template>
    <div class="row1">
        <div class="item">
            <img class="rel-v-c" src="@/assets/ico/renshu.png" alt="">
            <div>
                <div class="title heiti">用户人数</div>
                <div class="value">{{ userCount }}</div>
            </div>
        </div>
        <div class="item">
            <img class="rel-v-c" src="@/assets/ico/carCount.png" alt="">
            <div>
                <div class="title">车型数量</div>
                <div class="value">{{ carCount }}</div>
            </div>
        </div>
        <div class="item">
            <img class="rel-v-c" src="@/assets/ico/yycount.png" alt="">
            <div>
                <div class="title">预约保养/试驾次数</div>
                <div class="value">{{ yuyueCount }}</div>
            </div>
        </div>
        <div class="item">
            <img class="rel-v-c" src="@/assets/ico/employeeCount.png" alt="">
            <div>
                <div class="title">员工人数</div>
                <div class="value">{{ employeeCount }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { getUser } from "../../userManagement/api/user.js"
import { getCar } from "../../carManagement/api/car.js"
import { getAllUpkeep } from "../../upkeepReservation/api/upkeep.js"
import { gettestdrive } from "../../testDrive/api/testDrive.js"
import { getEmployeeList } from "../../employeeManagement/api/employee.js"
import { useGStore } from "../../store/gStore.js"
const gStore = useGStore()
let userCount = ref<any>(0)
let carCount = ref<any>(0)
let yuyueCount = ref<any>(0)
let employeeCount = ref<any>(0)
onMounted(() => {
    gStore.setLoading(true)
    setTimeout(() => {
        getUses()
        getCars()
        getUpkeep()
        getTestDrive()
        getEmployee()
    }, 200);

})
// 获取用户
function getUses() {
    gStore.setLoading(true)
    getUser().then(res => {
        if (res.data.code == 200) {
            if (res.data.data.length) {
                userCount.value = res.data.data.length
            }
        }
    }).finally(() => {
        gStore.setLoading(false)
    })
}
// 获取车型
function getCars() {
    gStore.setLoading(true)
    getCar().then(res => {
        if (res.data.code == 200) {
            if (res.data.data.length) {
                carCount.value = res.data.data.length
            }
        }
    }).finally(() => {
        gStore.setLoading(false)
    })
}
// 获取保养数量
function getUpkeep() {
    gStore.setLoading(true)
    getAllUpkeep().then(res => {
        if (res.data.code == 200) {
            if (res.data.data.length) {
                yuyueCount.value += res.data.data.length
            }
        }
    }).finally(() => {
        gStore.setLoading(false)
    })
}
// 获取试驾数量
function getTestDrive() {
    gStore.setLoading(true)
    gettestdrive().then(res => {
        if (res.data.code == 200) {
            if (res.data.data.length) {
                yuyueCount.value += res.data.data.length
            }
        }
    }).finally(() => {
        gStore.setLoading(false)
    })
}
// 获取员工数量
function getEmployee() {
    gStore.setLoading(true)
    getEmployeeList().then(res => {
        if (res.data.code == 200) {
            if (res.data.data.length) {
                employeeCount.value = res.data.data.length
            }
        }
    }).finally(() => {
        gStore.setLoading(false)
    })
}
</script>

<style lang="less" scoped>
.row1 {
    display: flex;
    // justify-content: space-around;
    justify-content: center;
    margin-bottom: 30px;

    .item {
        flex: 1;
        height: 100px;
        background-color: var(--main-color);
        margin: 0px 15px;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 20px;
        display: flex;

        >img {
            width: 25px;
            height: 25px;
        }

        >div {
            flex: 1;
            padding-left: 25px;
            height: 60px;
            color: white;

            .title {
                height: 30px;
                line-height: 30px;
                font-size: 16px;
            }

            .value {
                height: 30px;
                line-height: 30px;
                font-size: 20px;
                font-weight: bold;
                letter-spacing: 3px;
                font-family: "Rubik, sans-serif";
            }
        }
    }
}
</style>