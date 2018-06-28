import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import("@/components/Home.vue");
const Register = () => import("@/components/Register.vue");
const User = () => import("@/components/User.vue");
const Privacy = () => import("@/components/Privacy.vue");
const NotFound = () => import("@/components/Notfound.vue");

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/daftar',
      name: 'Register',
      component: Register
    },
    {
      path: '/user/:uId',
      name: 'user',
      component: User
    },
    {
      path: '/privacy-policy',
      name: 'privacy',
      component: Privacy
    },
    {
      path:'/404',
      name:'notfound',
      component: NotFound
    },
    {
      path: '*',
      name: '404',
      redirect: '/404'
    },
  ]
})
