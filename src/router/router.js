import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "/",
        component: () => import("@/views/Structure.vue"),
        redirect: "/home",
        children: [
            {
                path: "/home",
                name: "home",
                component: () => import("@/home/Home.vue")
            },
            {
                path: "/user",
                name: "user",
                component: () => import("@/userManagement/UserManagement.vue")
            },
            {
                path: "/car",
                name: "car",
                component: () => import("@/carManagement/CarManagement.vue")
            },
            {
                path: "/upkeep",
                name: "upkeep",
                component: () => import("@/upKeepReservation/UpKeepReservation.vue")
            },
            {
                path: "/testdrive",
                name: "testdrive",
                component: () => import("@/testDrive/TestDrive.vue")
            },
            {
                path: "/employee",
                name: "employee",
                component: () => import("@/employeeManagement/EmployeeManagement.vue")
            },
            {
                path: "/eval",
                name: "eval",
                component: () => import("@/evalManagement/EvalManagement.vue")
            },
            {
                path: "/admin",
                name: "admin",
                component: () => import("@/adminManagement/AdminManagement.vue")
            },
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/Login/Login.vue")
    },
    {
        path: "/upkeepReservation",
        name: "upkeepReservation",
        component: () => import("@/upKeepReservation/views/Upkeep.vue")
    },
    {
        path: "/testDriveCustom",
        name: "testDriveCustom",
        component: () => import("@/testDrive/views/TestDriveCustom.vue")
    },
    {
        path: '/add',
        name: 'add',
        component: () => import("../evalManagement/components/AddEval.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router