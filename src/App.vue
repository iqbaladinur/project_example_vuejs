<template>
  <div id="app">
     <vue-progress-bar></vue-progress-bar>
     <nav id="navbar" ref="navbar" class="navbar is-fixed-top has-shadow is-danger" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link class="navbar-item" tag="a" :to="'/'">
            <button class="button is-danger"><i class="fab fa-freebsd"></i></button> misuh.platform
          </router-link>
          <button class="button navbar-burger is-danger is-no-outline" data-target="navMenu" @click="spanNavigation()" :class="navbarSpan?'is-active':''">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="navbar-menu is-danger" :class="navbarSpan?'is-active':''" id="navMenu">
          <div class="navbar-end" @click="spanNavigation()">
            <router-link class="navbar-item" tag="a" :to="'/privacy-policy'">kebijakan privasi</router-link>
            <router-link class="navbar-item" tag="a" :to="'/daftar'">{{isRegistered()?'profile':'daftar'}}</router-link>
          </div>
        </div>
    </nav>
    <router-view/>
    <div class="navbar is-fixed-bottom is-light">
      <div class="is-footer-content">&copy;misuh 2018</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      navbarSpan:false,
    }
  },
  methods:{
    spanNavigation(){
      this.navbarSpan = !this.navbarSpan;
    },
    isRegistered(){
      return localStorage.getItem('profile');
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300');
#app {
  font-family: 'Roboto', sans-serif;
  margin-top: 60px;
}
.is-footer-content{
  font-size: 10pt;
  display: -webkit-flex;
  align-items:center;
  width: 100%;
  height: 50px;
  justify-content: center;
}
</style>
