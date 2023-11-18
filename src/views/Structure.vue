<template>
    <div class="baseStructure">
        <SiderBar :extend="extend" @switchExtend="switchExtend"></SiderBar>
        <div class="right">
            <HeadBar></HeadBar>
            <div class="main scrollbar">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import SiderBar from "../components/SiderBar.vue"
import HeadBar from "../components/HeadBar.vue"

// 是否打开侧边栏
let extend = ref(true)
// 切换侧边栏展开
function switchExtend() {
    extend.value = !extend.value
}
</script>

<style lang="less" scoped>
.baseStructure {
    height: 100vh;
    display: flex;

    .right {
        flex: 1;
        background-color: var(--main-bgcolor);
        display: flex;
        flex-direction: column;

        .main {
            flex: 1;
            height: calc(100% - 100px);
            box-sizing: border-box;
            padding: 20px;
            overflow: auto;
        }
    }
}
</style>