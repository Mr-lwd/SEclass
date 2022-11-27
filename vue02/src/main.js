import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入jQuery、bootstrap
import 'bootstrap'
import $ from "jquery";
// 引入bootstrap样式
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import VueLazyload from 'vue-lazyload'

import axios from 'axios';
import VueAxios from 'vue-axios';
axios.defaults.baseURL = '/api'

const app = createApp(App).use(store).use(VueAxios,axios).use(VueLazyload).use(router).mount('#app')
