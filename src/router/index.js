import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

const Login = _import('Login/index')
import Layout from '@/views/Layout/Layout'
const Home = _import('Home/index')
const Order = _import('Order/index')
const Configuration = _import('Configuration/index')
const User = _import('User/index')
const NotFoundComponent = _import('NotFoundComponent')

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
