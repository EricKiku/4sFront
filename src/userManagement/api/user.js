import request from "../../api/request.js"

export const getUser = () => {
    return request({
        url: "/user/get",
        method: "GET"
    })
}

// 登录
export const login = (email, pwd) => {
    return request({
        url: "/user/login",
        method: "GET",
        params: {
            email, pwd
        }
    })
}
// 注册
export const register = (email, pwd) => {
    return request({
        url: "/user/reg",
        method: "POST",
        data: {
            email, pwd
        }
    })
}