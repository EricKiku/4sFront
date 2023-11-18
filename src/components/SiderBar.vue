<template>
    <div class="siderbar" :style="{ width: extend ? '300px' : '80px' }">
        <div class="head">
            <div v-show="extend" class="text heiti rel-v-h-c">
                4S店预约管理系统
                <div class="second">
                    4S ReservationManagementSystem
                </div>
            </div>
            <!-- logo -->
            <img @click="switchMenuExtend" src="../assets/img/siderbar_extend.png" alt="">
        </div>

        <div class="menu">
            <div @click="menuRouter('home')" class="item" :class="{ item_selected: route.name == 'home' }" title="首页">
                <img v-show="route.name != 'home'" src="../assets/ico/home.png" alt="">
                <img v-show="route.name == 'home'" src="../assets/ico/home-a.png" alt="">
                <div class="text" v-show="extend">首页</div>
            </div>
            <div @click="menuRouter('user')" class="item" :class="{ item_selected: route.name == 'user' }" title="用户管理">
                <img v-show="route.name != 'user'" src="../assets/ico/userManagement.png" alt="">
                <img v-show="route.name == 'user'" src="../assets/ico/userManagement-a.png" alt="">
                <div class="text" v-show="extend">用户管理</div>
            </div>
            <div @click="menuRouter('car')" class="item" :class="{ item_selected: route.name == 'car' }" title="车型管理">
                <img v-show="route.name != 'car'" src="../assets/ico/carManagement.png" alt="">
                <img v-show="route.name == 'car'" src="../assets/ico/carManagement-a.png" alt="">
                <div class="text" v-show="extend">车型管理</div>
            </div>
            <div @click="menuRouter('upkeep')" class="item" :class="{ item_selected: route.name == 'upkeep' }"
                title="预约保养管理">
                <img v-show="route.name != 'upkeep'" src="../assets/ico/upkeep.png" alt="">
                <img v-show="route.name == 'upkeep'" src="../assets/ico/upkeep-a.png" alt="">
                <div class="text" v-show="extend">预约保养管理</div>
            </div>
            <div @click="menuRouter('testdrive')" class="item" :class="{ item_selected: route.name == 'testdrive' }"
                title="预约试驾管理">
                <img v-show="route.name != 'testdrive'" src="../assets/ico/testDrive.png" alt="">
                <img v-show="route.name == 'testdrive'" src="../assets/ico/testDrive-a.png" alt="">
                <div class="text" v-show="extend">预约试驾管理</div>
            </div>
            <div @click="menuRouter('employee')" class="item" :class="{ item_selected: route.name == 'employee' }"
                title="员工管理">
                <img v-show="route.name != 'employee'" src="../assets/ico/employee.png" alt="">
                <img v-show="route.name == 'employee'" src="../assets/ico/employee-a.png" alt="">
                <div class="text" v-show="extend">员工管理</div>
            </div>
            <div @click="menuRouter('eval')" class="item" :class="{ item_selected: route.name == 'eval' }" title="评价管理">
                <img v-show="route.name != 'eval'" src="../assets/ico/eval.png" alt="">
                <img v-show="route.name == 'eval'" src="../assets/ico/eval-a.png" alt="">
                <div class="text" v-show="extend">评价管理</div>
            </div>
            <div @click="menuRouter('admin')" class="item" :class="{ item_selected: route.name == 'admin' }" title="管理员管理">
                <img v-show="route.name != 'admin'" src="../assets/ico/admin.png" alt="">
                <img v-show="route.name == 'admin'" src="../assets/ico/admin-a.png" alt="">
                <div class="text" v-show="extend">管理员管理</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()
let props = defineProps(['extend'])
let emits = defineEmits(['switchExtend'])
// 切换菜单路由
function menuRouter(name) {
    router.push({
        name
    })
}
// 缩小或展开菜单
function switchMenuExtend() {
    emits('switchExtend')
}
</script>

<style lang="less" scoped>
.siderbar {
    // width: 300px;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    // overflow: hidden;
    transition: all 0.2s;

    .head {
        height: 100px;
        box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
        position: relative;

        .text {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            color: var(--main-color);

            .second {
                font-size: 14px;
                color: var(--lowercolor);
                margin-top: 5px;
            }
        }

        img {
            height: 25px;
            width: 25px;
            position: absolute;
            left: 110%;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            z-index: 1;
        }
    }

    .menu {
        // width: 100%;
        flex: 1;
        box-sizing: border-box;
        padding: 15px 20px;

        .item_selected {
            background-color: var(--main-bgcolor);
            color: var(--main-color) !important;
        }

        .item {
            width: 90%;
            margin: 0 auto;
            padding: 15px;
            display: flex;
            height: 20px;
            border-radius: 5px;
            cursor: pointer;
            color: var(--deepcolor);
            margin: 15px 0px;

            &:hover {
                background-color: var(--main-bgcolor);
                color: var(--main-color) !important;
            }

            img {
                height: 20px;
                margin-right: 15px;
            }

            .text {
                font-size: 16px;
                line-height: 20px;
                letter-spacing: 5px;
            }
        }
    }
}</style>