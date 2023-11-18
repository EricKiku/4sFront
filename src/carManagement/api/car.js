import request from "../../api/request"

export const getCar = () => {
    return request({
        url: "/car/get",
        method: "GET"
    })
}

export const addCar = (brand, model, config, color, gear, count, price) => {
    return request({
        url: "/car/add",
        method: "POST",
        data: {
            brand,
            model,
            config,
            color,
            gear,
            count,
            price
        }
    })
}

// 删除车型
export const deleteCar = (cid) => {
    return request({
        url: "/car/del",
        method: "DELETE",
        data: {
            cid
        }
    })
}