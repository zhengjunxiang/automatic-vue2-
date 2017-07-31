// import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Iview from './components/iview'
// import Iview from 'iview'
import App from './pages/App.vue'
import router from './router'
import store from './store/store'
import {utils} from './utils/utils'

import './style/iview/index.less'

utils.useElement(
  Vue, Vuex, Iview
)

router.beforeEach((to, from, next) => {
  Iview.LoadingBar.start()
  next()
})

router.afterEach((to, from, next) => {
  Iview.LoadingBar.finish()
  window.scrollTo(0, 0)
})

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
