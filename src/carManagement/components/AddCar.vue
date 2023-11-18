<template>
    <div @click.stop="" class="addDia abs-v-h-c">
        <div class="head heiti">新增车型</div>
        <div class="row">
            <div class="col">
                <div class="text rel-v-c">品牌</div>
                <input v-model="brand" type="text">
            </div>
            <div class="col">
                <div class="text rel-v-c">型号</div>
                <input v-model="model" type="text">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="text rel-v-c">配置</div>
                <input v-model="config" type="text">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="text rel-v-c">颜色</div>
                <input v-model="color" type="text">
            </div>
            <div class="col">
                <div class="text rel-v-c">档位</div>
                <input v-model="gear" type="text" placeholder="手动/自动">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="text rel-v-c">数量</div>
                <input v-model="count" type="text">
            </div>
            <div class="col">
                <div class="text rel-v-c">价格(万元)</div>
                <input v-model="price" type="text">
            </div>
        </div>
        <div class="row">
            <button @click="add">确定</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { addCar } from "../api/car.js"
import { message } from "../../tools/global.js"
let emits = defineEmits(['close'])
// 表单数据
let brand = ref("")
let model = ref("")
let config = ref("")
let color = ref("")
let gear = ref("")
let count = ref("")
let price = ref("")
function add() {
    addCar(brand.value, model.value, config.value, color.value, gear.value, count.value, price.value).then(res => {
        if (res.data.code == 200) {
            message(1, "新增成功")
            emits("close")
        } else {
            message(2, "新增失败")
        }
    })
}
</script>

<style lang="less" scoped>
// 新增汽车对话框
.addDia {
    height: 50%;
    width: 50%;
    background-color: white;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 10px;
    z-index: 1;
    animation-duration: 0.5s;
    animation-name: open;
    overflow: hidden;


    .head {
        font-size: 16px;
        margin-bottom: 15px;
    }

    .row {
        height: 40px;
        display: flex;
        margin: 30px 0px;

        .col {
            flex: 1;
            height: 100%;
            display: flex;

            .text {
                height: fit-content;
                font-size: 16px;
                width: 75px;
                text-align: right;
            }

            input {
                display: block;
                height: 40px;
                margin: 0px 5px;
                box-sizing: border-box;
                border: 1px solid var(--lowercolor);
                border-radius: 5px;
                padding: 5px 10px;
                outline: none;
                flex: 1;
            }
        }

        button {
            border: none;
            background-color: var(--main-color);
            color: white;
            padding: 5px 100px;
            margin: 0 auto;
            border-radius: 5px;
            letter-spacing: 3px;
            cursor: pointer;

            &:hover {
                opacity: 0.8;
            }
        }
    }
}

@keyframes open {
    from {
        width: 5%;
        height: 5%;
    }

    to {
        width: 50%;
        height: 50%;
    }
}
</style>