<template>
    <div class="tip heiti">
        <span v-show="getHours() >= 0 && getHours() < 6"><img src="../../assets/ico/lingchen.png"
                alt="">已经凌晨了,昵称,熬夜对身体不好</span>
        <span v-show="getHours() >= 6 && getHours() < 11"><img src="../../assets/ico/richu.png" alt="">早上好,{{ adminName
        }}</span>
        <span v-show="getHours() >= 11 && getHours() < 14"><img src="../../assets/ico/zhongwu.png" alt="">中午好,{{ adminName
        }}</span>
        <span v-show="getHours() >= 14 && getHours() < 18"><img src="../../assets/ico/riluo.png" alt="">下午好,{{ adminName
        }}</span>
        <span v-show="getHours() >= 18"><img src="../../assets/ico/wanshang.png" alt="">晚上好,{{ adminName
        }},时间不早了,早点休息吧</span>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { getHours } from "../../tools/global.js"
import { useGStore } from "../../store/gStore.js"
const gStore = useGStore()
let adminName = ref("")
onMounted(() => {
    adminName.value = gStore.admin ? gStore.admin['a_name'] : "昵称异常"
})
</script>

<style lang="less" scoped>
.tip {
    font-size: 18px;
    color: var(--main-color);
}
</style>