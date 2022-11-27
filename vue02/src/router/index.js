import { createRouter, createWebHistory } from "vue-router";

import home from '../views/HomeView'
import index from '../views/index'
const routes = [
  {
    path: "/",
    name: "home",
    component: home,
    redirect:'/index',
    children:[
      {
        path: '/index',
        name: 'index',
        component: index,
      }, 
      // {
      //   path: '/product/:id',
      //   name: 'product',
      //   component: () => import('./pages/product.vue')
      // }, {
      //   path: '/detail/:id',
      //   name: 'detail',
      //   component: () => import('./pages/detail.vue')
      // }
    ]
  },
  {
    // path: "/about",
    // name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: About
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
