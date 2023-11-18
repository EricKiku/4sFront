<template>
    <div @click.stop class="add-employee abs-v-h-c">
        <div class="h1">添加员工</div>
        <form>
            <div class="form-group">
                <label for="jobnumber">工号</label>
                <input id="jobnumber" type="text" v-model="jobnumber" required>
            </div>
            <div class="form-group">
                <label for="name">姓名</label>
                <input id="name" type="text" v-model="name" required>
            </div>
            <div class="form-group">
                <label>性别</label>
                <div style="display: flex;">
                    <label>
                        <input type="radio" v-model="gender" value="男">
                        男
                    </label>
                    <label>
                        <input type="radio" v-model="gender" value="女">
                        女
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label for="age">年龄</label>
                <input id="age" type="text" v-model="age" required>
            </div>
            <div class="form-group">
                <label for="phone">电话</label>
                <input id="phone" type="text" v-model="phone" required>
            </div>
            <div class="form-group">
                <label for="address">地址</label>
                <input id="address" type="text" v-model="address" required>
            </div>
            <div class="form-group">
                <label for="hire-date">入职时间</label>
                <input id="hire-date" type="date" v-model="hireDate" required>
            </div>
            <button @click.prevent.stop="addFun">保存</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { addEmployee } from "../api/employee.js";
import { message } from "../../tools/global.js"
let emits = defineEmits(['success', 'fail'])
// 所有表单绑定的数据
let jobnumber = ref("");
let name = ref("");
let gender = ref("");
let age = ref("");
let phone = ref("");
let address = ref("");
let hireDate = ref("");

// 提交方法
function addFun() {
    // employee.seteJobnumber(params.get("jobnumber"));
    //     employee.seteName(params.get("name"));
    //     employee.seteGender(params.get("gender"));
    //     employee.seteAge("age");
    //     employee.setePhone("phone");
    //     employee.seteAddress("address");
    //     employee.seteJointime("date");
    addEmployee(
        {
            jobnumber: jobnumber.value,
            name: name.value,
            gender: gender.value,
            age: age.value,
            phone: phone.value,
            address: address.value,
            date: hireDate.value
        }
    ).then(res => {
        if (res.data.code == 200) {
            // 添加成功
            // 关闭添加员工
            emits('success')
        } else {
            emits('fail')
        }
    })
}



</script>

<style>
.add-employee {
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    min-width: 400px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    opacity: 0;
    animation: fadeIn 0.5s ease-in-out forwards;
    z-index: 2;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.h1 {
    font-size: 18px;
    font-weight: bold;
    color: var(--deepcolor);
    margin-bottom: 10px;
    text-align: center;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

input[type="date"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.success-message {
    margin-top: 20px;
    padding: 10px;
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    border-radius: 5px;
}
</style>
