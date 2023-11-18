<template>
    <div class="home scrollbar">
        <!-- 小提示 -->
        <Tip></Tip>
        <div class="main_container">
            <Row1></Row1>
            <Row2></Row2>
            <Row3></Row3>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import Tip from "./components/Tip.vue"
import Row1 from "./components/Row1.vue"
import Row2 from "./components/Row2.vue"
import Row3 from "./components/Row3.vue"
import { useGStore } from "../store/gStore.js"
const gStore = useGStore()
</script>

<style lang="less" scoped>
.home {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;

    .main_container {
        margin-top: 30px;
    }
}
</style>