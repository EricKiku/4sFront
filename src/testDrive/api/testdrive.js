import request from "../../api/request";

export const gettestdrive = () => {
    return request({
        url: "/testdrive/get",
        method: "GET",
    })
}

// 预约试驾
export const addtestdrive = (data) => {
    return request({
        url: "/testdrive/add",
        method: "POST",
        data
    })
}

// 删除试驾
export const deletetestdrive = (tdid) => {
    return request({
        url: "/testdrive/del",
        method: "DELETE",
        data: {
            tdid
        }
    })
}