import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../pages/Login/')
const Layout = () => import('../pages/layout/Layout')
const Home = () => import('../pages/Home/')
const Order = () => import('../pages/Order/')
const Configuration = () => import('../pages/Configuration/')
const User = () => import('../pages/User/')
const NotFoundComponent = () => import('../pages/NotFoundComponent')

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
