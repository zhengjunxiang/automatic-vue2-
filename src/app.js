import Vue from 'vue'
import axios from 'axios'
import router from './router'
import App from './views/App.vue'
import store from './store/store'
import { getToken } from './utils/auth'

import Iview from 'iview';
import 'iview/dist/styles/iview.css'

Vue.use(Iview);

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  Iview.LoadingBar.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login');
    }
  }
});

router.afterEach(() => {
  Iview.LoadingBar.finish();
  window.scrollTo(0, 0);
});

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
