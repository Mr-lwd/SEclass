import { createRouter, createWebHistory } from "vue-router";

import home from "../views/HomeView";
import index from "../views/index";
import LoginPage from "../views/Login";
import RegisterPage from "../views/Register";
import UserInfoPage from "../views/userInfoPage";
import shopCart from "@/views/ShopCart";
import GoodInfo from "@/views/GoodInfo";
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
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
      },
      {
        path: "/upload",
        name: "upload",
        component: () => import("@/components/upload.vue"),
      },
      {
        path: "/userInfo",
        name: "userInfo",
        component:  () => import("@/views/userInfoPage.vue"),
      },
      {
        path: "/ShopCar",
        name:"shopCar",
        component: () => import("@/views/ShopCart.vue"),
      },
      {
        path: "/GoodInfo",
        name: "GoodInfo",
        component: GoodInfo
      }
    ],
  },
  {
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
