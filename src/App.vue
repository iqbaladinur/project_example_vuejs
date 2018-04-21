<template>
  <div id="app">
     <nav id="navbar" ref="navbar" class="navbar is-fixed-top has-shadow is-warning" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <button class="button is-warning"><i class="fas fa-poo"></i></button> misuh.co
          </a>
          <button class="button navbar-burger is-warning is-no-outline" data-target="navMenu" @click="spanNavigation()">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="navbar-menu is-warning" :class="navbarSpan?'is-active':''" id="navMenu">
          <div class="navbar-end">
            <router-link class="navbar-item" tag="a" :to="'/daftar'">daftar</router-link>
          </div>
        </div>
    </nav>
    <router-view/>
    <div class="navbar is-fixed-bottom is-light" style="align-item:center">
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
  }
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
  display: flex;
  align-items:center;
  width: 100%;
  justify-content: center;
}
</style>
