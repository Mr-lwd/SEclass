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
axios.defaults.baseURL = "/api";

const app = createApp(App)
  .use(store)
  .use(VueAxios, axios)
  .use(VueLazyload)
  .use(router)
  .use(Cell)
  .use(CellGroup)
  .use(VueCookies)
  .mount("#app");
