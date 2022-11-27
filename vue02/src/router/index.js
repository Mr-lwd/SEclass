import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/HomeView'
import About from '../views/AboutView'


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,

  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
