import { createRouter, createWebHistory } from "vue-router";

import home from "../views/HomeView";
import index from "../views/index";
import LoginPage from "../views/Login";
import RegisterPage from "../views/Register";
import UserInfoPage from "../views/userInfoPage";
const routes = [
  {
    path: "/",
    name: "home",
    component: home,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "index",
        component: index,
      },
      {
        path: "/login",
        name: "login",
        component: LoginPage,
      },
      {
        path: "/register",
        name: "register",
        component: RegisterPage,
      },
      {
        path: "/userInfo",
        name: "userInfo",
        component:UserInfoPage,
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
