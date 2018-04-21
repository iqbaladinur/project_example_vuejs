import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home.vue";
import Register from "@/components/Register.vue";
import User from "@/components/User.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
    }
  ]
})
