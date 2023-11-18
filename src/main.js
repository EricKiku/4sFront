import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router/router"
import { createPinia } from 'pinia'
import "amfe-flexible/index.js";
// 创建 Pinia 实例
const pinia = createPinia()
createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app')
