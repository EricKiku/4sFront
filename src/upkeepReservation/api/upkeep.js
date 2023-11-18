import request from '@/api/request.js';

export const getAllUpkeep = () => {
    return request({
        url: '/uk/get',
        method: 'GET'
    });
};


// 增加保养预约
// String uId = params.get("uid");
//         String cId = params.get("cid");
//         String meileage = params.get("mileage");
//         String type = params.get("type");
//         String number = params.get("number");
//         String date = params.get("date");
//         String description = params.get("description");

export const addUpkeep = (data) => {
    return request({
        url: '/uk/add',
        method: 'POST',
        data
    });
}

// 删除
export const deleteUpkeep = (ukid) => {
    return request({
        url: '/uk/del',
        method: 'DELETE',
        data: {
            ukid
        }
    });
}
