<template>
    <div class="login">
        <div class="mainbox abs-v-h-c">
            <div class="head">登录账号</div>
            <div class="sechead">输入邮箱和密码来登录</div>
            <div class="email input">
                <div class="text">邮箱地址</div>
                <input v-model="email" type="text" maxlength="25" placeholder="4sdian@email.com">
            </div>
            <div class="pwd input">
                <div class="text">密码</div>
                <input v-model="pwd" type="password" maxlength="10" placeholder="******">
            </div>
            <div class="ops">
                <div class="remeber" @click="remember">
                    <div class="tag">
                        <div class="rel-v-h-c"
                            :style="{ width: rememberPwd ? '100%' : '0px', height: rememberPwd ? '100%' : '0px' }"></div>
                    </div>
                    <div>
                        自动登录
                    </div>
                </div>
                <div class="forgot">
                    <span>忘记密码?</span>
                </div>
            </div>
            <button @click="loginFun" class="btn">Sign In</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { message } from "../tools/global"
import { login } from "./api/login"
import { useGStore } from "../store/gStore"
import { useRouter, useRoute } from "vue-router"
const gStore = useGStore()
const router = useRouter()
// 是否记住密码
let rememberPwd = ref(false)
// 记住密码
function remember() {
    rememberPwd.value = !rememberPwd.value
}

// 输入的数据
let email = ref("")
let pwd = ref("")
// 登录方法
function loginFun() {
    // 进入加载状态
    gStore.setLoading(true)
    login(email.value, pwd.value).then(res => {

        if (res.data.code == 200) {
            message(1, "登陆成功")
            // 如果勾选了记住密码，则浏览器存储邮箱和密码。没有勾选则删除之前保存的密码
            if (rememberPwd.value) {
                localStorage.setItem("admin", JSON.stringify({ email: email.value, pwd: pwd.value }))
            } else {
                localStorage.removeItem("admin")
            }
            // 把管理员数据存储到store中
            gStore.setAdmin(res.data.data[0])
            // 跳转路由到首页
            router.replace({
                name: "/"
            })
        } else {
            message(2, res.data.message)
        }
    }).finally(() => {
        gStore.setLoading(false)
    })
}
</script>

<style lang="less" scoped>
.login {
    height: 100vh;
    background-color: var(--main-bgcolor);

    .mainbox {
        width: 370px;
        // height: 400px;
        box-shadow:
            0px 0px 80px rgba(0, 0, 0, 0.07);
        padding: 40px;
        border-radius: 10px;

        .head {
            font-size: 24px;
            color: black;
            margin-bottom: 10px;
        }

        .sechead {
            color: var(--lowercolor);
            font-size: 14px;
            letter-spacing: 4px;
            height: 20px;
            margin-bottom: 25px;
        }

        .input {
            margin-bottom: 20px;

            .text {
                height: 20px;
                font-size: 14px;
                color: var(--lowercolor);
            }

            input {
                border: 1px solid var(--bordercolor);
                outline: none;
                height: 56px;
                box-sizing: border-box;
                padding: 6px 12px;
                width: 100%;
                font-size: 16px;
                color: var(--deepcolor);
                border-radius: 5px;
                transition: all 0.2s;

                &:focus {
                    border: 1px solid var(--main-color);
                }

                &::placeholder {
                    color: var(--lowercolor);
                }
            }
        }

        .ops {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            .remeber {
                display: flex;
                cursor: default;

                .tag {
                    height: 15px;
                    width: 15px;
                    border: 1px solid var(--bordercolor);
                    margin-right: 5px;

                    div {
                        transition: all 0.2s;
                        background-color: var(--main-color);
                    }
                }

                color: var(--lowercolor);
            }

            .forgot {
                color: var(--main-color);
                cursor: pointer;

                &::before {
                    content: '';
                    display: inline-block;

                }
            }
        }

        .btn {
            height: 43px;
            width: 100%;
            border: none;
            background-color: var(--main-color);
            color: white;
            border-radius: 5px;
        }
    }
}
</style>