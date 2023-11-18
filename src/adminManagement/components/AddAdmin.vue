<template>
    <div @click.stop class="add-admin abs-v-h-c">
        <h2>添加管理员</h2>
        <form>
            <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" id="name" v-model="name" />
            </div>
            <div class="form-group">
                <label for="email">邮箱</label>
                <input type="email" id="email" v-model="email" />
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" v-model="password" />
            </div>
            <button type="submit" @click.prevent="addAdmin">添加</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { add } from "../api/admin.js"
import { message } from "../../tools/global.js"
let emits = defineEmits(['refresh'])
let name = ref("")
let email = ref("")
let password = ref("")
const addAdmin = () => {
    // 验证
    if (name.value == "" || email.value == "" || password.value == "") {
        message(2, "数据不完整")
        return
    }
    // private String aName;
    // private String aEmail;
    // private String aPwd;
    add(
        {
            aName: name.value,
            aEmail: email.value,
            aPwd: password.value
        }
    ).then(res => {
        if (res.data.code == 200) {
            message(1, "添加成功")
            emits("refresh")
        } else {
            message(2, "添加失败")
        }
    })

}
</script>

<style lang="less">
.add-admin {
    width: 400px;
    height: fit-content;
    padding: 20px;
    border-radius: 5px;
    // 阴影
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
    background-color: white;

    h2 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    form {
        display: flex;
        flex-direction: column;

        .form-group {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;

            label {
                font-size: 16px;
                margin-bottom: 10px;
            }

            input {
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 16px;
            }
        }

        button[type='submit'] {
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
        }
    }
}
</style>
