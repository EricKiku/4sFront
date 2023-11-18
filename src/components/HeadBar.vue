<template>
    <div class="head">
        <div>

        </div>
        <div class="admin">
            <div class="box rel-v-c">
                <div class="name maincolor">{{ gStore.admin ? gStore.admin['a_name'] : '' }}</div>
                <div class="avatar">
                    <img src="../assets/ico/adminAvatar.png" alt="">
                </div>
                <div class="xiala">
                    <img @click.stop="switchExtend" class="rel-v-c" src="../assets/ico/xiala.png" alt="">
                </div>
                <div class="extend" :style="{ height: extend ? '75px' : '0px' }">
                    <div class="item">个人主页</div>
                    <div @click="loginout" class="item">退出登录</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useGStore } from "../store/gStore";
const router = useRouter()
const gStore = useGStore()
// 跳转到登录
function loginout() {
    router.replace({
        name: "login"
    })
}
// 是否展开扩展
let extend = ref(false)
// 展开
function switchExtend() {
    extend.value = true
    document.addEventListener("click", closeExtend)
}
// 关闭
function closeExtend() {
    extend.value = false
    document.removeEventListener("click", closeExtend)
}
</script>

<style lang="less" scoped>
.head {
    height: 100px;
    box-sizing: border-box;
    padding: 22px 30px;
    background-color: white;
    display: flex;
    justify-content: space-between;

    >div {
        flex: 1;
    }

    .admin {
        .box {
            height: 30px;
            display: flex;
            float: right;
            position: relative;

            .name {
                line-height: 30px;
                font-weight: bold;
                font-size: 16px;
            }

            .xiala {
                cursor: pointer;
            }

            .extend {
                position: absolute;
                top: 110%;
                width: 100%;
                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                border-radius: 5px;
                background-color: white;
                height: fit-content;
                overflow: hidden;
                transition: all 0.2s;

                .item {
                    margin: 10px;
                    padding: 5px;
                    text-align: center;
                    cursor: pointer;

                    &:hover {
                        background-color: var(--main-bgcolor);
                        color: var(--main-color);
                    }
                }
            }
        }
    }
}
</style>