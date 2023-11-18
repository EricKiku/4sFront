<template>
    <div class="container">
        <div class="back" @click="$router.go(-1)">
            <svg style="cursor: pointer;" t="1622210840849" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="1116" width="32" height="32">
                <path
                    d="M512 0C229.230769 0 0 229.230769 0 512s229.230769 512 512 512 512-229.230769 512-512S794.769231 0 512 0zM512 960C264.615385 960 64 759.384615 64 512S264.615385 64 512 64s448 200.615385 448 448-200.615385 448-448 448z m-96-448l192-192-64-64-256 256 256 256 64-64-192-192z"
                    p-id="1117" fill="#ffffff"></path>
            </svg>
        </div>
        <div class="test-drive-booking abs-v-h-c">
            <h1>预约试驾</h1>
            <form>
                <div class="form-group">
                    <label for="name">姓名</label>
                    <input type="text" id="name" v-model="name">
                </div>
                <!-- 性别 -->
                <div class="form-group">
                    <label>性别</label>
                    <div>
                        <label>
                            <input type="radio" value="男" v-model="gender">
                            男
                        </label>
                        <label>
                            <input type="radio" value="女" v-model="gender">
                            女
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="phone">手机号<span style="color: red;">*</span></label>
                    <input type="tel" id="phone" v-model="phone" required>
                </div>
                <div class="form-group">
                    <label for="province">省<span style="color: red;">*</span></label>
                    <select id="province" v-model="province" required>
                        <option value="">请选择省份</option>
                        <option v-for="(provice, index) in dedler" :key="index" :value="provice['provice']">
                            {{ provice['provice'] }}
                        </option>
                    </select>
                </div>
                <!-- 市 -->
                <div class="form-group">
                    <label for="province">市<span style="color: red;">*</span></label>
                    <select id="province" v-model="city" required>
                        <option value="">请选择市</option>
                        <option v-for="(city, index) in citys" :key="index" :value="city['name']">
                            {{ city['name'] }}
                        </option>
                    </select>
                </div>
                <!-- 选择经销商 -->
                <div class="form-group">
                    <label for="province">经销商</label>
                    <select id="province" v-model="dedlerName">
                        <option value="">请选择经销商</option>
                        <option v-for="(deler, index) in dedlers" :key="index" :value="deler['name']">
                            {{ deler['name'] }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="date">试驾日期<span style="color: red;">*</span></label>
                    <input type="date" id="date" v-model="date" required>
                </div>
                <div class="form-group">
                    <label for="model">试驾车型</label>
                    <select id="model" v-model="model">
                        <option value="">请选择车型</option>
                        <option v-for="(model, index) in car" :key="index" :value="model">
                            {{ model }}
                        </option>
                    </select>
                </div>
                <button @click.prevent.stop="submit">提交</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCar } from "../../carManagement/api/car.js";
import { addtestdrive } from "../api/testdrive.js"
import { message } from "../../tools/global.js"
const router = useRouter();

// onmounted
onMounted(() => {
    getCar().then(res => {
        if (res.data.code == 200) {
            // 把每一项的c_model追加给car
            res.data.data.forEach(item => {
                car.value.push(item.c_model);
            });
        }
    })
})

// 可选车型
let car = ref([]);
// 经销商网点地址
let dedler = ref(
    [
        {
            provice: "河北省",
            city: [
                {
                    name: "石家庄市",
                    dedler: [
                        {
                            name: "石家庄市经销商1",
                        },
                        {
                            name: "石家庄市经销商2",
                        }
                    ]
                },
                {
                    name: "保定市",
                    dedler: [
                        {
                            name: "保定市经销商1",
                        },
                        {
                            name: "保定市经销商2",
                        }
                    ]
                },
                {
                    name: "邯郸市",
                    dedler: [
                        {
                            name: "邯郸市经销商1",
                        },
                        {
                            name: "邯郸市经销商2",
                        }
                    ]
                }
            ]
        },
        {
            provice: "山西省",
            city: [
                {
                    name: "太原市",
                    dedler: [
                        {
                            name: "太原市经销商1",
                        },
                        {
                            name: "太原市经销商2",
                        }
                    ]
                },
                {
                    name: "大同市",
                    dedler: [
                        {
                            name: "大同市经销商1",
                        },
                        {
                            name: "大同市经销商2",
                        }
                    ]
                },
                {
                    name: "阳泉市",
                    dedler: [
                        {
                            name: "阳泉市经销商1",
                        },
                        {
                            name: "阳泉市经销商2",
                        }
                    ]
                }
            ]
        },
        {
            provice: "山东省",
            city: [
                {
                    name: "济南市",
                    dedler: [
                        {
                            name: "济南市经销商1"
                        },
                        {
                            name: "济南市经销商2"
                        }
                    ]
                },
                {
                    name: "青岛市",
                    dedler: [
                        {
                            name: "青岛市经销商1"
                        },
                        {
                            name: "青岛市经销商2"
                        }
                    ]
                },
                {
                    name: "烟台市",
                    dedler: [
                        {
                            name: "烟台市经销商1"
                        },
                        {
                            name: "烟台市经销商2"
                        }
                    ]
                }
            ]
        },
        {
            provice: "河南省",
            city: [
                {
                    name: "郑州市",
                    dedler: [
                        {
                            name: "郑州市经销商1"
                        },
                        {
                            name: "郑州市经销商2"
                        }
                    ]
                },
                {
                    name: "洛阳市",
                    dedler: [
                        {
                            name: "洛阳市经销商1"
                        },
                        {
                            name: "洛阳市经销商2"
                        }
                    ]
                },
                {
                    name: "开封市",
                    dedler: [
                        {
                            name: "开封市经销商1"
                        },
                        {
                            name: "开封市经销商2"
                        }
                    ]
                }
            ]
        },
        {
            provice: "湖北省",
            city: [
                {
                    name: "武汉市",
                    dedler: [
                        {
                            name: "武汉市经销商1"
                        },
                        {
                            name: "武汉市经销商2"
                        }
                    ]
                },
                {
                    name: "黄石市",
                    dedler: [
                        {
                            name: "黄石市经销商1"
                        },
                        {
                            name: "黄石市经销商2"
                        }
                    ]
                },
                {
                    name: "十堰市",
                    dedler: [
                        {
                            name: "十堰市经销商1"
                        },
                        {
                            name: "十堰市经销商2"
                        }
                    ]
                }
            ]
        },
        {
            provice: "湖南省",
            city: [
                {
                    name: "长沙市",
                    dedler: [
                        {
                            name: "长沙市经销商1"
                        },
                        {
                            name: "长沙市经销商2"
                        }
                    ]
                },
                {
                    name: "株洲市",
                    dedler: [
                        {
                            name: "株洲市经销商1"
                        },
                        {
                            name: "株洲市经销商2"
                        }
                    ]
                },
                {
                    name: "湘潭市",
                    dedler: [
                        {
                            name: "湘潭市经销商1"
                        },
                        {
                            name: "湘潭市经销商2"
                        }
                    ]
                }
            ]
        },
        {
            provice: "江苏省",
            city: [
                {
                    name: "南京市",
                    dedler: [
                        {
                            name: "南京市经销商1"
                        },
                        {
                            name: "南京市经销商2"
                        }
                    ]
                },
                {
                    name: "苏州市",
                    dedler: [
                        {
                            name: "苏州市经销商1"
                        },
                        {
                            name: "苏州市经销商2"
                        }
                    ]
                },
                {
                    name: "无锡市",
                    dedler: [
                        {
                            name: "无锡市经销商1"
                        },
                        {
                            name: "无锡市经销商2"
                        }
                    ]
                }
            ]
        },
        {
            provice: "安徽省",
            city: [
                {
                    name: "合肥市",
                    dedler: [
                        {
                            name: "合肥市经销商1"
                        },
                        {
                            name: "合肥市经销商2"
                        }
                    ]
                },
                {
                    name: "芜湖市",
                    dedler: [
                        {
                            name: "芜湖市经销商1"
                        },
                        {
                            name: "芜湖市经销商2"
                        }
                    ]
                },
                {
                    name: "蚌埠市",
                    dedler: [
                        {
                            name: "蚌埠市经销商1"
                        },
                        {
                            name: "蚌埠市经销商2"
                        }
                    ]
                }
            ]
        },
        {
            provice: "浙江省",
            city: [
                {
                    name: "杭州市",
                    dedler: [
                        {
                            name: "杭州市经销商1"
                        },
                        {
                            name: "杭州市经销商2"
                        }
                    ]
                },
                {
                    name: "宁波市",
                    dedler: [
                        {
                            name: "宁波市经销商1"
                        },
                        {
                            name: "宁波市经销商2"
                        }
                    ]
                },
                {
                    name: "温州市",
                    dedler: [
                        {
                            name: "温州市经销商1"
                        },
                        {
                            name: "温州市经销商2"
                        }
                    ]
                }
            ]
        },
        {
            provice: "江西省",
            city: [
                {
                    name: "南昌市",
                    dedler: [
                        {
                            name: "南昌市经销商1"
                        },
                        {
                            name: "南昌市经销商2"
                        }
                    ]
                },
                {
                    name: "九江市",
                    dedler: [
                        {
                            name: "九江市经销商1"
                        },
                        {
                            name: "九江市经销商2"
                        }
                    ]
                },
                {
                    name: "赣州市",
                    dedler: [
                        {
                            name: "赣州市经销商1"
                        },
                        {
                            name: "赣州市经销商2"
                        }
                    ]
                }
            ]
        },
        {
            provice: "福建省",
            city: [
                {
                    name: "福州市",
                    dedler: [
                        {
                            name: "福州市经销商1"
                        },
                        {
                            name: "福州市经销商2"
                        }
                    ]
                },
                {
                    name: "厦门市",
                    dedler: [
                        {
                            name: "厦门市经销商1"
                        },
                        {
                            name: "厦门市经销商2"
                        }
                    ]
                },
                {
                    name: "泉州市",
                    dedler: [
                        {
                            name: "泉州市经销商1"
                        },
                        {
                            name: "泉州市经销商2"
                        }
                    ]
                }
            ]
        },
        {
            provice: "广东省",
            city: [
                {
                    name: "广州市",
                    dedler: [
                        {
                            name: "广州市经销商1"
                        },
                        {
                            name: "广州市经销商2"
                        }
                    ]
                },
                {
                    name: "深圳市",
                    dedler: [
                        {
                            name: "深圳市经销商1"
                        },
                        {
                            name: "深圳市经销商2"
                        }
                    ]
                },
                {
                    name: "珠海市",
                    dedler: [
                        {
                            name: "珠海市经销商1"
                        },
                        {
                            name: "珠海市经销商2"
                        }
                    ]
                }
            ]
        }
    ]
);
// 选择的省
let province = ref("");
// 选择的市
let city = ref("");
// 选择的经销商
let dedlerName = ref("");
// 选择省份后，获取该省份下的所有市
let citys = computed(() => {
    let citys = [];
    dedler.value.forEach(item => {
        if (item.provice == province.value) {
            citys = item.city;
        }
    });
    return citys;
});
// 选择市后，获取该市下的所有经销商
let dedlers = computed(() => {
    let dedlers = [];
    citys.value.forEach(item => {
        if (item.name == city.value) {
            dedlers = item.dedler;
        }
    });
    return dedlers;
});

// String name = params.get("name");
//         String gender = params.get("gender");
//         String phone = params.get("phone");
//         String province = params.get("province");
//         String city = params.get("city");
//         String dealer = params.get("dealer");
//         String date = params.get("date");
//         String model = params.get("model");

let name = ref("")
let gender = ref("")
let phone = ref("")
let date = ref("")
let model = ref("")

// 提交表单
function submit() {
    // 电话，省，市，日期是必填项
    if (phone.value == "" || province.value == "" || city.value == "" || date.value == "") {
        message(2, "请填写完整信息")
        return;
    }

    addtestdrive(
        {
            name: name.value,
            gender: gender.value,
            phone: phone.value,
            province: province.value,
            city: city.value,
            dealer: dedlerName.value,
            date: date.value,
            model: model.value
        }
    ).then(res => {
        if (res.data.code == 200) {
            message(1, "预约成功")
        } else {
            message(2, "预约失败")
        }
    })
}
</script>

<style lang="less" scoped>
.container {
    width: 100vw;
    height: 100vh;
    background-image: url("../../assets/img/testdrive.jpg");
    /* 背景图垂直、水平均居中 */
    background-position: center center;
    /* 背景图不平铺 */
    background-repeat: no-repeat;
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    background-attachment: fixed;
    /* 让背景图基于容器大小伸缩 */
    background-size: cover;
}

.test-drive-booking {
    min-width: 400px;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: white;

    h1 {
        margin-top: 0;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;

        .form-group {
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;

            label {
                margin-bottom: 5px;
            }

            input,
            select {
                padding: 5px;
                border: 1px solid #ccc;
                border-radius: 3px;
            }
        }

        button[type="submit"] {
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }
    }

    div {
        color: #7366FF;
    }
}
</style>
