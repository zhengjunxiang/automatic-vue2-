import Vue from 'vue'
import Vuex from 'vuex'

import { home, user } from './modules/'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    home,
    user
  }
})

export default store
