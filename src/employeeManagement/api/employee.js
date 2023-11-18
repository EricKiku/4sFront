import request from "../../api/request"

export const getEmployeeList = () => {
    return request({
        url: "/employee/get",
        method: "GET"
    })
}

// 添加员工
export const addEmployee = (data) => {
    return request({
        url: "/employee/add",
        method: "POST",
        data
    })
}

// 删除员工
export const deleteEmployee = (eid) => {
    return request({
        url: "/employee/del",
        method: "DELETE",
        data: {
            eid
        }
    })
}