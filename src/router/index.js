import Vue from 'vue'
import Router from 'vue-router'

// const Home = resolve => require(['../pages/Home'], resolve)
// const Order = resolve => require(['../pages/Order/'], resolve)
// const Configuration = resolve => require(['../pages/Configuration'], resolve)
// const User = resolve => require(['../pages/User'], resolve)
// const NotFoundComponent = resolve => require(['../pages/NotFoundComponent'], resolve)

import Home from '../pages/Home/'
import Order from '../pages/Order/'
import Configuration from '../pages/Configuration/'
import User from '../pages/User/'
import NotFoundComponent from '../pages/NotFoundComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/order',
      name: 'Order',
      component: Order
    }, {
      path: '/configuration',
      name: 'Configuration',
      component: Configuration
    }, {
      path: '/user',
      name: 'User',
      component: User
    }, {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
