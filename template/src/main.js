import Vue from "vue";
import App from "./App";
import router from "./router/index";
import axios from "axios";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

Vue.use(PaperDashboard);
axios.defaults.baseURL = "http://localhost:8000";

Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
