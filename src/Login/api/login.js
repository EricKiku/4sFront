import request from "@/api/request"

export const login = (email, pwd, rememberpwd) => {
    return request({
        url: "/login/",
        mathod: "GET",
        params: {
            email,
            pwd,
            rememberpwd
        }
    })
}