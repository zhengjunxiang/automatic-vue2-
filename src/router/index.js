import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../pages/Home')
const Order = () => import('../pages/Order/')
const Configuration = () => import('../pages/Configuration')
const User = () => import('../pages/User')
const NotFoundComponent = () => import('../pages/NotFoundComponent')

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
