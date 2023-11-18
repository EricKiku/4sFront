<script setup>
import { ref, onMounted } from "vue"
import { useGStore } from "@/store/gStore"
import { useRouter, useRoute } from "vue-router"
import { login } from "@/Login/api/login"
const router = useRouter()
const gStore = useGStore()
onMounted(() => {
  // 从localstorage中获取admin，如果有，则登录，如果没有，则跳到登录页
  let adminStr = localStorage.getItem("admin")
  if (adminStr) {
    let admin = JSON.parse(adminStr)
    login(admin.email, admin.pwd).then(res => {
      if (res.data.code == 200) {
        gStore.setAdmin(res.data.data[0])
      } else {
        router.replace({
          name: "login"
        })
      }
    })
  } else {
    router.replace({
      name: "login"
    })
  }
})
</script>

<template>
  <div v-loading="gStore.getLoading()" element-loading-text="Loading...">
    <!-- 这里的路由，不是登录，就是框架结构页面 -->
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
