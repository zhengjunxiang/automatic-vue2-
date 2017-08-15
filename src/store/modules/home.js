import axios from 'axios'

import {GET_HISTORY_DATA} from '../mutation-types'

const home = {
  namespaced: true,
  state: {
    homeData: []
  },
  getters: {
    getHomeData: state => {
      return state.homeData
    }
  },
  mutations: {
    [GET_HISTORY_DATA] (state, payload) {
      if (payload.data && payload.data.orders.length > 0) {
        state.homeData = payload.data.orders
      }
    }
  },
  actions: {
    fetchHistory ({commit}) {
      return new Promise((resolve, reject) => {
        // axios.get('http://localhost:3001/history')
        axios.get('http://192.168.170.104:8080/history')
         .then((response) => {
           commit({
             type: GET_HISTORY_DATA,
             data: response.data
           })
           resolve(response)
         }, (error) => {
           reject(error)
         })
      })
    }
  }
}

export default home
