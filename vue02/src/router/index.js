import { createRouter, createWebHistory } from "vue-router";

import GoodInfo from "@/views/GoodInfo";
import FindGood from "@/components/FindGood";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/index.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
      },
      {
        path: "/userInfo",
        name: "userInfo",
        component: () => import("@/views/userInfoPage.vue"),
      },
      {
        path: "/ShopCar",
        name: "shopCar",
        component: () => import("@/views/ShopCart.vue"),
      },
      {
        path: "/myorders",
        name: "MyOrders",
        component: () => import("@/components/MyOrders.vue"),
      },
      {
        path: "/GoodInfo",
        name: "GoodInfo",
        component: GoodInfo
      },
      {
        path: "/FindGood",
        name: "FindGood",
        component: () => import("@/components/FindGood.vue")
      }
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test.vue"),
  },
  {
    path: "/pay",
    name: "pay",
    component: () => import("@/views/PayList.vue"),
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import("@/views/Manage.vue"),
    children: [
      {
        path: "/manage/addgood",
        name: "addgood",
        component: () => import("@/components/upload.vue"),
      },
      {
        path: "/manage/changegood",
        name: "changegood",
        component: () => import("@/components/ChangeGood.vue"),
      },
      {
        path: "/manage/orderlist",
        name: "orderlist",
        component: () => import("@/components/OrderList.vue"),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
