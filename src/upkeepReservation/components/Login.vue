<template>
    <div class="login-container">
        <form class="login-form" @submit.prevent="loginfun">
            <h2 class="form-title">登录</h2>
            <div class="form-group">
                <label for="email">邮箱</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" v-model="pwd" required>
            </div>
            <button type="submit" class="btn btn-primary">登录</button>
            <button type="button" class="btn btn-secondary" @click="registerfun">注册</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login, register } from '../../userManagement/api/user.js'
import { message } from "../../tools/global.js"
let email = ref('')
let pwd = ref('')
let emits = defineEmits(['loginSuccess'])

// 登录方法
const loginfun = () => {
    // 验证表单
    if (email.value.trim() === '' || pwd.value.trim() === '') {
        alert('邮箱或密码不能为空')
        return
    }
    login(email.value, pwd.value).then(res => {
        if (res.data.code === 200) {
            // 登录成功
            // 调用emits方法，传回去用户对象
            emits('loginSuccess', res.data.data)
            message(1, "登录成功")
        } else {
            message(2, "信息错误或无该账号")
        }
    })
}
// 注册
const registerfun = () => {
    // 验证数据
    if (email.value.trim() === '' || pwd.value.trim() === '') {
        alert('邮箱或密码不能为空')
        return
    }
    register(email.value, pwd.value).then(res => {
        if (res.data.code === 200) {
            message(1, "注册成功，请登录")
        } else {
            message(2, "注册失败")
        }
    })
}
</script>

<style>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    z-index: 10;
}

.login-form {
    width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
}

.form-title {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.btn {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;
}

.btn-secondary {
    background-color: #ccc;
    color: #fff;
    border: none;
    margin-left: 10px;
}
</style>
