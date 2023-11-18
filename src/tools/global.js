import { ElMessage } from 'element-plus'

export const message = (value, message) => {
    ElMessage({
        message: message,
        type: value == 1 ? 'success' : 'warning',
    })
}

export const getHours = () => {
    return new Date().getHours()
}