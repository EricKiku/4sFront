<template>
    <div class="container">
        <div class="evaluation abs-v-h-c">
            <h1 class="h1">员工服务评价</h1>
            <el-form ref="form" label-width="100px">
                <el-form-item label="员工姓名" prop="name">
                    <el-select v-model="eid" placeholder="请选择员工">
                        <el-option v-for="employee in employees" :key="employee['eId']" :label="employee['eName']"
                            :value="employee['eId']"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务类型" prop="serviceType">
                    <el-radio-group v-model="serviceType">
                        <el-radio-button label="保养">保养</el-radio-button>
                        <el-radio-button label="维修">维修</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="评价等级" prop="attitude">
                    <el-rate v-model="evalstar"></el-rate>
                </el-form-item>
                <el-form-item label="评价时间" prop="time">
                    <!-- <el-date-picker format="YYYY-MM-DD" v-model="time" type="date" placeholder="选择日期"></el-date-picker> -->
                    <input type="date" v-model="time">
                </el-form-item>
                <el-form-item label="评价内容" prop="content">
                    <el-input type="textarea" v-model="content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交评价</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElForm, ElFormItem, ElInput, ElRate, ElButton, ElSelect, ElOption } from 'element-plus';
import { getAllEmployeeName, addEval } from "../api/eval.js"
import { message } from "../../tools/global.js"
let eid = ref('');
let evalstar = ref(0);
let content = ref('');
let serviceType = ref('');
let time = ref('');
let eName = ref('')

let employees = ref([]);
onMounted(() => {
    getAllEmployeeName().then(res => {
        console.log(res.data.data);
        if (res.data.code == 200) {
            employees.value = res.data.data
        }
    })
});
// private int eId;
//     private int evType;
//     private int evEvaldate;
//     private int evStar;
//     private int evContent;
function submitForm() {
    // 验证数据
    if (eid == '' || evalstar == 0 || content == '' || serviceType == '' || time == '') {
        alert("请填写完整信息");
        return;
    }
    // 通过eid获取eName
    employees.value.forEach(employee => {
        if (employee.eId == eid.value) {
            eName.value = employee.eName
        }
    });
    addEval({
        eId: eid.value,
        eName: eName.value,
        evType: serviceType.value,
        evEvaldate: time.value,
        evStar: evalstar.value,
        evContent: content.value
    }).then(res => {
        if (res.data.code == 200) {
            message(1, "评价成功")
        } else {
            message(2, "评价失败")
        }
    })
}
</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    background-image: url("../../assets/img/eval.jpg");
    /* 背景图垂直、水平均居中 */
    background-position: center center;
    /* 背景图不平铺 */
    background-repeat: no-repeat;
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    background-attachment: fixed;
    /* 让背景图基于容器大小伸缩 */
    background-size: cover;
}

.evaluation {
    max-width: 600px;
    margin: 0 auto;
    min-width: 400px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    opacity: 0.8;

    .h1 {
        font-size: 18px;
        font-weight: bold;
        color: var(--deepcolor);
        margin-bottom: 10px;
        text-align: center;
    }
}
</style>
