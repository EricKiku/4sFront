import request from "../../api/request"

export const getall = () => {
    return request({
        url: "/admin/get",
        method: "GET"
    })
}

// 添加管理员
export const add = (data) => {
    return request({
        url: "/admin/add",
        method: "POST",
        data
    })
}

// 删除管理员
export const delAdmin = (aid) => {
    return request({
        url: "/admin/del",
        method: "DELETE",
        data: {
            aid
        }
    })
}