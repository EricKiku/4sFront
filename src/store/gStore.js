import { defineStore } from "pinia"

export const useGStore = defineStore("gStore", {
    state: () => {
        return {
            loadingStatus: false,
            admin: null
        }
    },
    actions: {
        // 修改加载状态
        setLoading(value) {
            this.loadingStatus = value
        },
        // 获取状态
        getLoading() {
            return this.loadingStatus
        },
        // 设置admin
        setAdmin(admin) {
            this.admin = admin
        },
        // 获取admin
        getAdmin() {
            return this.admin
        }
    }
})

