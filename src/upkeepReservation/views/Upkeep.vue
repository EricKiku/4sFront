<template>
    <div class="container">
        <!-- 一个漂亮的返回按钮 -->
        <div class="back" @click="$router.go(-1)">
            <svg style="cursor: pointer;" t="1622210840849" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="1116" width="32" height="32">
                <path
                    d="M512 0C229.230769 0 0 229.230769 0 512s229.230769 512 512 512 512-229.230769 512-512S794.769231 0 512 0zM512 960C264.615385 960 64 759.384615 64 512S264.615385 64 512 64s448 200.615385 448 448-200.615385 448-448 448z m-96-448l192-192-64-64-256 256 256 256 64-64-192-192z"
                    p-id="1117" fill="#ffffff"></path>
            </svg>
        </div>
        <Login v-show="!isLogin" @loginSuccess="loginSuccess"></Login>
        <div v-if="isLogin" class="upkeep abs-v-h-c">
            <!-- 用户信息 -->
            <div class="userinfo">
                <span>用户：</span>
                <span>{{ userInfo['u_email'] }}</span>
            </div>
            <h1>4S汽车预约保养</h1>
            <form>
                <div class="form-group">
                    <label for="car-model">车型：</label>
                    <select id="car-model" v-model="selectedCarModel">
                        <option v-for="(model, index) in models" :value="model['c_id']" :key="index">{{
                            model['c_brand'] + '-' + model['c_model'] }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="date">预约日期：</label>
                    <input type="date" id="date" v-model="selectedDate">
                </div>
                <div class="form-group">
                    <label for="time">预约时间：</label>
                    <input type="time" id="time" v-model="selectedTime">
                </div>
                <!-- 里程数 -->
                <div class="form-group">
                    <label for="time">车辆里程数：</label>
                    <input type="text" v-model="mileage">
                </div>
                <!-- 预约类型：保养还是维修 -->
                <div class="form-group">
                    <label>预约类型：</label>
                    <div>
                        <label>
                            <input type="radio" value="保养" v-model="appointmentType">
                            保养
                        </label>
                        <label>
                            <input type="radio" value="维修" v-model="appointmentType">
                            维修
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="time">车牌号：</label>
                    <input type="text" v-model="carnumber">
                </div>
                <div class="form-group">
                    <label for="time">车辆描述：</label>
                    <input type="text" v-model="description">
                </div>
                <button class="submit" @click.prevent="submitForm">提交</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCar } from "../../carManagement/api/car.js"
import { addUpkeep } from "../api/upkeep.js"
import { message } from "../../tools/global.js"
// 导入登录组件
import Login from '../../upkeepReservation/components/Login.vue'

// 是否登录，登录的话，用户信息
let isLogin = ref(false)
let userInfo = ref(null)
// 登录成功触发方法
const loginSuccess = (user) => {
    isLogin.value = true
    userInfo.value = user
}



// 所有可选车型
let models = ref([])
// 选择的车型
let selectedCarModel = ref('')
onMounted(() => {
    getCar().then(res => {
        if (res.data.code === 200) {
            // 把返回结果的所有元素追加到models中
            models.value = res.data.data;
        }
    })
})

// 预约日期和时间变量
let selectedDate = ref('')
let selectedTime = ref('')
// 车辆以行驶里程数
let mileage = ref('')
// 预约类型
let appointmentType = ref('')
// 车牌号
let carnumber = ref('')
// 车辆描述
let description = ref('')

// 提交方法
const submitForm = () => {
    // 验证
    if (!selectedCarModel.value) {
        message(2, '请选择车型')
        return
    }
    if (!selectedDate.value) {
        message(2, '请选择预约日期')
        return
    }
    if (!selectedTime.value) {
        message(2, '请选择预约时间')
        return
    }
    if (!mileage.value) {
        message(2, '请输入车辆行驶里程数')
        return
    }
    if (!appointmentType.value) {
        message(2, '请选择预约类型')
        return
    }
    if (!carnumber.value) {
        message(2, '请输入车牌号')
        return
    }
    if (!description.value) {
        message(2, '请输入车辆描述')
        return
    }

    // 提交
    addUpkeep({
        uid: userInfo.value['u_id'],
        cid: selectedCarModel.value,
        mileage: mileage.value,
        type: appointmentType.value,
        number: carnumber.value,
        date: selectedDate.value + ' ' + selectedTime.value,
        description: description.value,
    }).then(res => {
        if (res.data.code === 200) {
            message(1, "预约成功")
        }
    })
}
</script>

<style lang="less" scoped>
.container {
    width: 100vw;
    height: 100vh;
    background-image: url("../../assets/img/upkeep.jpg");
    /* 背景图垂直、水平均居中 */
    background-position: center center;
    /* 背景图不平铺 */
    background-repeat: no-repeat;
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    background-attachment: fixed;
    /* 让背景图基于容器大小伸缩 */
    background-size: cover;
}

.upkeep {
    width: 500px;
    height: fit-content;
    padding: 20px;
    border-radius: 5px;
    background-color: white;
    opacity: 0.8;
    // 阴影
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    .userinfo {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;

        span {
            margin-right: 10px;
        }
    }

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    form {
        display: flex;
        flex-direction: column;

        .form-group {
            display: flex;
            margin-bottom: 10px;

            label {
                width: 120px;
                text-align: right;
                line-height: 30px;
                margin-right: 10px;
            }

            input[type="text"],
            input[type="date"],
            input[type="time"],
            select {
                flex: 1;
                padding: 5px;
                border-radius: 3px;
                border: 1px solid #ccc;
            }


        }

        .submit {
            margin-top: 10px;
            padding: 5px 10px;
            border-radius: 3px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }
    }
}
</style>
