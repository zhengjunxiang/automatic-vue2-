import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

import {home} from './modules/'
// import {GET_HISTORY_DATA} from './mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    home
  }
})

export default store
