import axios from 'axios'

import { GET_HISTORY_DATA1, GET_HISTORY_DATA0, GET_HISTORY_DATA_1 } from '../mutation-types'
import config from '@/config.js'

const home = {
  namespaced: true,
  state: {
    homeData1: [],
    homeData0: [],
    homeData_1: []
  },
  getters: {
    getHomeData1: state => state.homeData1,
    getHomeData0: state => state.homeData0,
    getHomeData_1: state => state.homeData_1
  },
  mutations: {
    [GET_HISTORY_DATA1](state, payload) {
      if (payload.data && payload.data.orders.length > 0) {
        state.homeData1 = payload.data.orders
      }
    },
    [GET_HISTORY_DATA0](state, payload) {
      if (payload.data && payload.data.orders.length > 0) {
        state.homeData0 = payload.data.orders
      }
    },
    [GET_HISTORY_DATA_1](state, payload) {
      if (payload.data && payload.data.orders.length > 0) {
        state.homeData_1 = payload.data.orders
      }
    }
  },
  actions: {
    fetchHistory1({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`${config.apiHost}/history?isFinish=1`)
         .then(response => {
           commit({
             type: GET_HISTORY_DATA1,
             data: response.data
           })
           resolve(response)
         }, error => {
           reject(error)
         })
      })
    },
    fetchHistory0({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`${config.apiHost}/history?isFinish=0`)
         .then(response => {
           commit({
             type: GET_HISTORY_DATA0,
             data: response.data
           })
           resolve(response)
         }, error => {
           reject(error)
         })
      })
    },
    fetchHistory_1({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`${config.apiHost}/history?isFinish=-1`)
         .then(response => {
           commit({
             type: GET_HISTORY_DATA_1,
             data: response.data
           })
           resolve(response)
         }, error => {
           reject(error)
         })
      })
    }
  }
}

export default home
