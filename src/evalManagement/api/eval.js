import request from "../../api/request"

export const getAll = () => {
    return request({
        url: "/eval/get",
        method: "GET"
    })
}


// 添加评价
export const addEval = (data) => {
    return request({
        url: "/eval/add",
        method: "POST",
        data
    })
}

// 获取所有员工姓名
export const getAllEmployeeName = () => {
    return request({
        url: "/employee/get",
        method: "GET"
    })
}