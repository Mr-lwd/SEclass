import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入jQuery、bootstrap
import "bootstrap";
import $ from "jquery";
// 引入bootstrap样式
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import VueLazyload from "vue-lazyload";
import { Cell, CellGroup } from "vant";
import 'vant/lib/index.css';
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookies from 'vue-cookies'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
axios.defaults.baseURL = "/api";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { Swiper, SwiperSlide } from 'swiper/vue'
// 引入swiper样式（按需导入）



const app = createApp(App)
  .use(store)
  .use(ElementPlus)
  .use(VueAxios, axios)
  .use(router)
  .use(Cell)
  .use(CellGroup)
  .use(VueCookies);

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  app.mount("#app");
