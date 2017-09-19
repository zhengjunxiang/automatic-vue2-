import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

import Layout from '@/views/layout/Layout'
const Login = _import('login/index')
const Home = _import('home/index')
const Order = _import('order/index')
const Configuration = _import('configuration/index')
const User = _import('user/index')
const NotFoundComponent = _import('NotFoundComponent')

// import Login from '@/views/login/'
// import Home from '@/views/home/'
// import Order from '@/views/order/'
// import Configuration from '@/views/configuration/'
// import User from '@/views/user/'
// import NotFoundComponent from '@/views/NotFoundComponent'

Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/',
      name: 'Home',
      redirect: '/home',
      component: Layout,
      children: [{ path: 'home', component: Home }]
    }, {
      path: '/order',
      name: 'Order',
      redirect: '/order/index',
      component: Layout,
      children: [{ path: 'index', component: Order }]
    }, {
      path: '/configuration',
      name: 'Configuration',
      redirect: '/configuration/index',
      component: Layout,
      children: [{ path: 'index', component: Configuration }]
    }, {
      path: '/user',
      name: 'User',
      redirect: '/user/index',
      component: Layout,
      children: [{ path: 'index', component: User }]
    }, {
      path: '/404',
      redirect: '/404/index',
      name: '404',
      component: Layout,
      children: [{ path: 'index', component: NotFoundComponent }]
    }, {
      path: '*',
      redirect: '/404'
    }
  ]
})
